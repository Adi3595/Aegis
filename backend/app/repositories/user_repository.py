from typing import Optional
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash

class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_email(self, email: str) -> Optional[User]:
        stmt = select(User).where(User.email == email, User.deleted_at.is_(None))
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        stmt = select(User).where(User.id == user_id, User.deleted_at.is_(None))
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def create(self, user_in: UserCreate) -> User:
        db_user = User(
            email=user_in.email,
            name=user_in.name,
            hashed_password=get_password_hash(user_in.password),
            role=user_in.role,
        )
        self.session.add(db_user)
        await self.session.commit()
        await self.session.refresh(db_user)
        return db_user

    async def update(self, db_user: User, **kwargs) -> User:
        for key, value in kwargs.items():
            setattr(db_user, key, value)
        await self.session.commit()
        await self.session.refresh(db_user)
        return db_user
