from pydantic import BaseModel, EmailStr, ConfigDict, Field
from typing import Optional
import uuid
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str = Field(min_length=8, description="Must contain uppercase, lowercase, numbers, and special characters")
    role: str = "Fan"

class UserUpdate(BaseModel):
    name: Optional[str] = None
    preferences: Optional[dict] = None
    language: Optional[str] = None

class UserChangePassword(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8)

class UserResponse(UserBase):
    id: uuid.UUID
    role: str
    is_active: bool
    is_verified: bool
    preferences: dict
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
