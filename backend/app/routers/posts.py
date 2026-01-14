from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models import User, Post, PostStatus, UserRole
from app.schemas import PostCreate, PostUpdate, PostResponse, PostWithAuthor
from app.auth import get_current_active_user

router = APIRouter()

@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
    post_data: PostCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Alumni posts are pending by default, admins are auto-approved
    status_value = PostStatus.APPROVED if current_user.role == UserRole.ADMIN else PostStatus.PENDING
    
    db_post = Post(
        author_id=current_user.id,
        **post_data.model_dump(),
        status=status_value
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.get("/", response_model=list[PostWithAuthor])
async def get_posts(
    skip: int = 0,
    limit: int = 100,
    status_filter: Optional[PostStatus] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Post)
    if status_filter:
        query = query.filter(Post.status == status_filter)
    else:
        # By default, only show approved posts to non-admins
        query = query.filter(Post.status == PostStatus.APPROVED)
    
    posts = query.order_by(Post.created_at.desc()).offset(skip).limit(limit).all()
    return posts

@router.get("/my-posts", response_model=list[PostWithAuthor])
async def get_my_posts(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    posts = db.query(Post).filter(Post.author_id == current_user.id).order_by(Post.created_at.desc()).all()
    return posts

@router.get("/{post_id}", response_model=PostWithAuthor)
async def get_post(
    post_id: int,
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    return post

@router.put("/{post_id}", response_model=PostResponse)
async def update_post(
    post_id: int,
    post_data: PostUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    
    # Only author or admin can update
    if post.author_id != current_user.id and current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    update_data = post_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(post, field, value)
    
    db.commit()
    db.refresh(post)
    return post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    post_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )
    
    # Only author or admin can delete
    if post.author_id != current_user.id and current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    db.delete(post)
    db.commit()
    return None

