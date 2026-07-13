from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.schemas.user import UserResponse, UserUpdate, UserChangePassword
from app.models.user import User
from app.dependencies.auth import get_current_active_user, RequireRole
from app.repositories.user_repository import UserRepository
from app.core.security import verify_password, get_password_hash
from app.core.exceptions import APIException
from fastapi import status

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@router.patch("/profile", response_model=UserResponse)
async def update_user_profile(
    user_in: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    user_repo = UserRepository(db)
    update_data = user_in.model_dump(exclude_unset=True)
    user = await user_repo.update(current_user, **update_data)
    return user

@router.post("/change-password", status_code=status.HTTP_200_OK)
async def change_password(
    data: UserChangePassword,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    if not verify_password(data.current_password, current_user.hashed_password):
        raise APIException(
            status_code=status.HTTP_400_BAD_REQUEST,
            code="invalid_password",
            message="Current password is incorrect."
        )
        
    user_repo = UserRepository(db)
    await user_repo.update(current_user, hashed_password=get_password_hash(data.new_password))
    return {"message": "Password updated successfully."}

@router.get("/admin-only", response_model=dict)
async def admin_only_route(current_user: User = Depends(RequireRole(["Administrator"]))):
    return {"message": f"Welcome Admin {current_user.name}"}
