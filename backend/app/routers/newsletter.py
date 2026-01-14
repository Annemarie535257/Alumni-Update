from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import NewsletterSubscriber
from app.schemas import NewsletterSubscribe, NewsletterSubscriberResponse
from app.auth import get_current_admin, get_current_active_user, get_current_user
from app.models import User

router = APIRouter()

@router.post("/subscribe", status_code=status.HTTP_201_CREATED)
async def subscribe_to_newsletter(
    subscription: NewsletterSubscribe,
    db: Session = Depends(get_db)
):
    """Subscribe to newsletter (public endpoint)"""
    # Check if already subscribed
    existing = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == subscription.email
    ).first()
    
    if existing:
        if existing.is_active:
            return {"message": "Email already subscribed", "subscribed": True}
        else:
            # Reactivate subscription
            existing.is_active = True
            db.commit()
            return {"message": "Subscription reactivated", "subscribed": True}
    
    # Create new subscription
    subscriber = NewsletterSubscriber(
        email=subscription.email,
        is_active=True
    )
    db.add(subscriber)
    db.commit()
    db.refresh(subscriber)
    
    return {"message": "Successfully subscribed to newsletter", "subscribed": True}

@router.get("/subscribers", response_model=list[NewsletterSubscriberResponse])
async def get_subscribers(
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Get all newsletter subscribers (admin only)"""
    subscribers = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.is_active == True
    ).all()
    return subscribers

@router.delete("/unsubscribe/{email}")
async def unsubscribe_from_newsletter(
    email: str,
    db: Session = Depends(get_db)
):
    """Unsubscribe from newsletter (public endpoint)"""
    subscriber = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == email
    ).first()
    
    if not subscriber:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found in subscribers"
        )
    
    subscriber.is_active = False
    db.commit()
    
    return {"message": "Successfully unsubscribed from newsletter"}

