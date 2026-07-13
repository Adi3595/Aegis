from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import status
import uuid
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.schemas.auth import Login, Token, RefreshTokenRequest
from app.core.security import verify_password, create_access_token, create_refresh_token
from app.core.exceptions import APIException
from app.models.token import RefreshToken
from sqlalchemy import select, delete
from datetime import datetime, timezone

from app.database.redis import get_redis

class AuthService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.user_repo = UserRepository(session)

    async def register(self, user_in: UserCreate):
        existing_user = await self.user_repo.get_by_email(user_in.email)
        if existing_user:
            raise APIException(
                status_code=status.HTTP_400_BAD_REQUEST,
                code="duplicate_email",
                message="A user with this email already exists."
            )
        return await self.user_repo.create(user_in)

    async def login(self, login_data: Login) -> Token:
        redis = await get_redis()
        lockout_key = f"lockout:{login_data.email}"
        attempts_key = f"login_attempts:{login_data.email}"
        
        if redis:
            is_locked = await redis.get(lockout_key)
            if is_locked:
                raise APIException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    code="account_locked",
                    message="Account locked due to too many failed login attempts. Try again in 15 minutes."
                )

        user = await self.user_repo.get_by_email(login_data.email)
        if not user or not verify_password(login_data.password, user.hashed_password):
            if redis:
                attempts = await redis.incr(attempts_key)
                if attempts == 1:
                    await redis.expire(attempts_key, 300) # 5 minutes window
                if attempts >= 5: # Lockout after 5 attempts
                    await redis.setex(lockout_key, 900, "locked") # 15 minutes lockout
                    await redis.delete(attempts_key)
                    
            raise APIException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                code="invalid_credentials",
                message="Invalid email or password."
            )
            
        if redis:
            await redis.delete(attempts_key)
            await redis.delete(lockout_key)
        
        if not user.is_active:
            raise APIException(
                status_code=status.HTTP_403_FORBIDDEN,
                code="inactive_user",
                message="Account has been deactivated."
            )

        # Update last login
        await self.user_repo.update(user, last_login_at=datetime.now(timezone.utc))

        access_token = create_access_token(subject=user.id)
        refresh_token = create_refresh_token(subject=user.id)

        # Store refresh token in DB
        db_rt = RefreshToken(token=refresh_token, user_id=user.id, expires_at=datetime.now(timezone.utc))
        self.session.add(db_rt)
        await self.session.commit()

        return Token(access_token=access_token, refresh_token=refresh_token)

    async def refresh(self, data: RefreshTokenRequest) -> Token:
        # Simplistic validation for brevity
        stmt = select(RefreshToken).where(
            RefreshToken.token == data.refresh_token, 
            RefreshToken.revoked == False
        )
        result = await self.session.execute(stmt)
        rt = result.scalars().first()

        if not rt:
            raise APIException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                code="invalid_refresh_token",
                message="Invalid or expired refresh token."
            )

        # Invalidate old refresh token (rotation)
        rt.revoked = True
        
        # Generate new tokens
        access_token = create_access_token(subject=rt.user_id)
        new_refresh_token = create_refresh_token(subject=rt.user_id)
        
        new_rt = RefreshToken(token=new_refresh_token, user_id=rt.user_id, expires_at=datetime.now(timezone.utc))
        self.session.add(new_rt)
        await self.session.commit()

        return Token(access_token=access_token, refresh_token=new_refresh_token)

    async def logout(self, refresh_token: str):
        stmt = delete(RefreshToken).where(RefreshToken.token == refresh_token)
        await self.session.execute(stmt)
        await self.session.commit()
