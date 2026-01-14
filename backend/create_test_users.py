#!/usr/bin/env python3
"""Create test users for the app"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User, UserRole
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_users():
    db: Session = SessionLocal()
    try:
        # Create alumni user
        alumni_email = "alumni@test.com"
        existing = db.query(User).filter(User.email == alumni_email).first()
        if not existing:
            hashed = pwd_context.hash("password123")
            alumni = User(
                email=alumni_email,
                hashed_password=hashed,
                full_name="John Doe",
                role=UserRole.ALUMNI,
                is_active=True
            )
            db.add(alumni)
            print(f"✓ Created: {alumni_email} / password123")
        
        # Create admin user
        admin_email = "admin@test.com"
        existing_admin = db.query(User).filter(User.email == admin_email).first()
        if not existing_admin:
            hashed = pwd_context.hash("admin123")
            admin = User(
                email=admin_email,
                hashed_password=hashed,
                full_name="Admin User",
                role=UserRole.ADMIN,
                is_active=True
            )
            db.add(admin)
            print(f"✓ Created: {admin_email} / admin123")
        
        db.commit()
        print("\n✅ Test users ready!")
        print("\n📝 Login Credentials:")
        print("   Alumni: alumni@test.com / password123")
        print("   Admin:  admin@test.com / admin123")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_users()

