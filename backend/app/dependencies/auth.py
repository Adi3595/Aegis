from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from app.core.config import settings
from app.database.session import get_db
from app.schemas.auth import TokenPayload
from app.repositories.user_repository import UserRepository
from app.models.user import User
from app.core.exceptions import APIException

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"/api/v1/auth/login"
)

async def get_current_user(
    db: AsyncSession = Depends(get_db),
    token: str = Depends(oauth2_scheme)
) -> User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise APIException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            code="invalid_token",
            message="Could not validate credentials."
        )
    
    user_repo = UserRepository(db)
    user = await user_repo.get_by_id(uuid.UUID(token_data.sub))
    if not user:
        raise APIException(
            status_code=status.HTTP_404_NOT_FOUND,
            code="user_not_found",
            message="User not found."
        )
    return user

async def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if not current_user.is_active:
        raise APIException(
            status_code=status.HTTP_403_FORBIDDEN,
            code="inactive_user",
            message="Inactive user."
        )
    return current_user

class RequireRole:
    def __init__(self, allowed_roles: list[str]):
        self.allowed_roles = allowed_roles

    async def __call__(self, current_user: User = Depends(get_current_active_user)) -> User:
        if current_user.role not in self.allowed_roles:
            raise APIException(
                status_code=status.HTTP_403_FORBIDDEN,
                code="insufficient_permissions",
                message="You do not have enough privileges to access this resource."
            )
        return current_user
