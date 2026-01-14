from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, alumni, posts, admin, newsletter
from app.database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Alumni Update Platform API",
    description="Backend API for Alumni Update Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(alumni.router, prefix="/api/alumni", tags=["Alumni"])
app.include_router(posts.router, prefix="/api/posts", tags=["Posts"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(newsletter.router, prefix="/api/newsletter", tags=["Newsletter"])

@app.get("/")
async def root():
    return {"message": "Alumni Update Platform API", "docs": "/api/docs"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}



