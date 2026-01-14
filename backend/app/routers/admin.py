from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Post, PostStatus
from app.schemas import PostResponse, UserResponse
from app.auth import get_current_admin

router = APIRouter()

@router.get("/posts/pending", response_model=list[PostResponse])
async def get_pending_posts(
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    posts = db.query(Post).filter(Post.status == PostStatus.PENDING).order_by(Post.created_at.desc()).all()
    return posts

@router.put("/posts/{post_id}/approve", response_model=PostResponse)
async def approve_post(
    post_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    
    post.status = PostStatus.APPROVED
    db.commit()
    db.refresh(post)
    return post

@router.put("/posts/{post_id}/reject", response_model=PostResponse)
async def reject_post(
    post_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    
    post.status = PostStatus.REJECTED
    db.commit()
    db.refresh(post)
    return post

@router.get("/users", response_model=list[UserResponse])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.put("/users/{user_id}/toggle-active", response_model=UserResponse)
async def toggle_user_active(
    user_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot deactivate yourself"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.is_active = not user.is_active
    db.commit()
    db.refresh(user)
    return user



