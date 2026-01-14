from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, AlumniProfile
from app.schemas import (
    AlumniProfileCreate,
    AlumniProfileUpdate,
    AlumniProfileResponse,
    AlumniProfileWithUser
)
from app.auth import get_current_active_user

router = APIRouter()

@router.post("/profile", response_model=AlumniProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_alumni_profile(
    profile_data: AlumniProfileCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Check if profile already exists
    existing_profile = db.query(AlumniProfile).filter(AlumniProfile.user_id == current_user.id).first()
    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Profile already exists"
        )
    
    db_profile = AlumniProfile(user_id=current_user.id, **profile_data.model_dump())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

@router.get("/profile", response_model=AlumniProfileWithUser)
async def get_my_profile(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    profile = db.query(AlumniProfile).filter(AlumniProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    return profile

@router.put("/profile", response_model=AlumniProfileResponse)
async def update_my_profile(
    profile_data: AlumniProfileUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    profile = db.query(AlumniProfile).filter(AlumniProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    update_data = profile_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)
    
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/profiles", response_model=list[AlumniProfileWithUser])
async def get_all_profiles(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    profiles = db.query(AlumniProfile).offset(skip).limit(limit).all()
    return profiles

@router.get("/profiles/{profile_id}", response_model=AlumniProfileWithUser)
async def get_profile_by_id(
    profile_id: int,
    db: Session = Depends(get_db)
):
    profile = db.query(AlumniProfile).filter(AlumniProfile.id == profile_id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    return profile



