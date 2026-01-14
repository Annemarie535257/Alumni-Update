from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models import UserRole, PostStatus

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    role: UserRole
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Alumni Profile Schemas
class AlumniProfileBase(BaseModel):
    graduation_year: Optional[int] = None
    major: Optional[str] = None
    current_position: Optional[str] = None
    company: Optional[str] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    profile_picture_url: Optional[str] = None

class AlumniProfileCreate(AlumniProfileBase):
    pass

class AlumniProfileUpdate(AlumniProfileBase):
    pass

class AlumniProfileResponse(AlumniProfileBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class AlumniProfileWithUser(AlumniProfileResponse):
    user: UserResponse

# Post Schemas
class PostBase(BaseModel):
    title: str
    content: str

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class PostResponse(PostBase):
    id: int
    author_id: int
    status: PostStatus
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class PostWithAuthor(PostResponse):
    author: UserResponse

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str



