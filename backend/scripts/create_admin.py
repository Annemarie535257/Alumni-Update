"""
Script to create an admin user.
Usage: python -m scripts.create_admin
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User, UserRole
from app.auth import get_password_hash

def create_admin(email: str, password: str, full_name: str):
    db: Session = SessionLocal()
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            if existing_user.role == UserRole.ADMIN:
                print(f"User {email} already exists and is an admin.")
                return
            else:
                # Upgrade existing user to admin
                existing_user.role = UserRole.ADMIN
                existing_user.hashed_password = get_password_hash(password)
                db.commit()
                print(f"User {email} upgraded to admin.")
                return
        
        # Create new admin user
        hashed_password = get_password_hash(password)
        admin_user = User(
            email=email,
            hashed_password=hashed_password,
            full_name=full_name,
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin_user)
        db.commit()
        print(f"Admin user {email} created successfully!")
    except Exception as e:
        db.rollback()
        print(f"Error creating admin user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    import getpass
    
    print("Create Admin User")
    print("=" * 50)
    email = input("Email: ")
    password = getpass.getpass("Password: ")
    full_name = input("Full Name: ")
    
    create_admin(email, password, full_name)



