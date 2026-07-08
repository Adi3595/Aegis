from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_db
from app.schemas.user import UserCreate, UserResponse
from app.schemas.auth import Login, Token, RefreshTokenRequest, ForgotPassword, ResetPassword
from app.services.auth_service import AuthService
from app.services.email_service import EmailService

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    auth_service = AuthService(db)
    user = await auth_service.register(user_in)
    
    # Mock sending welcome/verification email
    await EmailService.send_welcome_email(user.email, user.name)
    
    return user

@router.post("/login", response_model=Token)
async def login(login_data: Login, db: AsyncSession = Depends(get_db)):
    auth_service = AuthService(db)
    return await auth_service.login(login_data)

@router.post("/refresh", response_model=Token)
async def refresh_token(data: RefreshTokenRequest, db: AsyncSession = Depends(get_db)):
    auth_service = AuthService(db)
    return await auth_service.refresh(data)

@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(data: RefreshTokenRequest, db: AsyncSession = Depends(get_db)):
    auth_service = AuthService(db)
    await auth_service.logout(data.refresh_token)

@router.post("/forgot-password", status_code=status.HTTP_202_ACCEPTED)
async def forgot_password(data: ForgotPassword, db: AsyncSession = Depends(get_db)):
    # In a real app, generate a token and send an email
    await EmailService.send_password_reset_email(data.email, "mock_reset_token")
    return {"message": "If that email exists, a reset link has been sent."}

@router.post("/reset-password", status_code=status.HTTP_200_OK)
async def reset_password(data: ResetPassword, db: AsyncSession = Depends(get_db)):
    # In a real app, validate token and update password
    return {"message": "Password successfully reset."}
