# Alumni Update Platform

A full-stack web application for alumni to connect, share updates, and maintain their professional profiles. Built with React + TypeScript (frontend) and FastAPI (backend).

## 🚀 Features

### Frontend (React + TypeScript + Vite + Tailwind CSS)
- **Authentication**: JWT-based login and registration
- **Alumni Profiles**: Create and manage professional profiles
- **Posts/Updates**: Share updates with the community (with admin moderation)
- **Admin Dashboard**: Moderate posts and manage users
- **Responsive Design**: Modern, polished UI with Tailwind CSS

### Backend (FastAPI)
- **RESTful API**: Clean, well-documented endpoints
- **JWT Authentication**: Secure token-based auth
- **Role-Based Access Control**: Admin vs Alumni permissions
- **Post Moderation**: Approve/reject posts workflow
- **Auto-generated API Docs**: Swagger UI at `/api/docs`

### Database
- **PostgreSQL**: Production-ready database
- **SQLAlchemy ORM**: Type-safe database operations
- **Alembic Migrations**: Version-controlled schema changes

## 📁 Project Structure

```
.
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── routers/  # API route handlers
│   │   │   ├── auth.py      # Authentication endpoints
│   │   │   ├── alumni.py    # Alumni profile endpoints
│   │   │   ├── posts.py     # Post CRUD endpoints
│   │   │   └── admin.py     # Admin moderation endpoints
│   │   ├── models.py        # SQLAlchemy models (User, AlumniProfile, Post)
│   │   ├── schemas.py       # Pydantic schemas for validation
│   │   ├── auth.py          # JWT authentication logic
│   │   ├── database.py      # Database connection & session
│   │   ├── config.py        # Configuration settings
│   │   └── main.py          # FastAPI app entry point
│   ├── alembic/             # Database migrations
│   ├── scripts/
│   │   ├── create_admin.py  # Helper script to create admin users
│   │   └── init_db.py       # Helper script to initialize database
│   └── requirements.txt
│
└── frontend/         # React frontend
    ├── src/
    │   ├── pages/           # Page components
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── Home.tsx
    │   │   ├── AlumniProfiles.tsx
    │   │   ├── MyProfile.tsx
    │   │   ├── Posts.tsx
    │   │   ├── CreatePost.tsx
    │   │   └── AdminDashboard.tsx
    │   ├── components/      # Reusable components
    │   │   ├── Layout.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   └── AdminRoute.tsx
    │   ├── contexts/        # React contexts
    │   │   └── AuthContext.tsx
    │   ├── services/        # API service layer
    │   │   └── api.ts
    │   ├── types/           # TypeScript types
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    └── package.json
```

### Key Features by File

**Backend:**
- `models.py`: Defines User, AlumniProfile, and Post models with relationships
- `auth.py`: JWT token creation/validation, password hashing, role checking
- `routers/auth.py`: Register, login, get current user
- `routers/alumni.py`: CRUD operations for alumni profiles
- `routers/posts.py`: Create, read, update, delete posts with moderation
- `routers/admin.py`: Approve/reject posts, manage users

**Frontend:**
- `AuthContext.tsx`: Global authentication state management
- `api.ts`: Centralized API calls with axios interceptors
- `Layout.tsx`: Navigation bar and page layout
- `ProtectedRoute.tsx`: Redirects unauthenticated users
- `AdminRoute.tsx`: Restricts access to admin users only

## ⚡ Quick Start

Get the Alumni Update Platform running in 5 minutes!

### Prerequisites Check
- ✅ Python 3.9+ installed
- ✅ Node.js 18+ installed  
- ✅ PostgreSQL installed and running
- ✅ Database created: `alumni_db`

### Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
# Windows: copy .env.example .env
# Mac/Linux: cp .env.example .env

# Edit .env with your database URL:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/alumni_db
# SECRET_KEY=your-secret-key-change-this
# ALGORITHM=HS256
# ACCESS_TOKEN_EXPIRE_MINUTES=30

# Create the database (if not exists)
createdb alumni_db  # PostgreSQL command

# Run migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload
```

Backend should now be running at `http://localhost:8000`  
API docs at `http://localhost:8000/api/docs`

### Step 2: Frontend Setup (2 minutes)

```bash
# Open a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file (optional, defaults to localhost:8000)
# Windows: copy .env.example .env
# Mac/Linux: cp .env.example .env

# Update .env if your backend is on a different URL:
# VITE_API_URL=http://localhost:8000

# Start development server
npm run dev
```

Frontend should now be running at `http://localhost:5173`

### Step 3: Create Admin User (1 minute)

```bash
# In the backend directory with venv activated
python -m scripts.create_admin
```

Enter:
- Email: admin@example.com
- Password: (your password)
- Full Name: Admin User

### Step 4: Test It Out!

1. Open `http://localhost:5173` in your browser
2. Register a new user (or login as admin)
3. Create your alumni profile
4. Create a post
5. Login as admin to approve posts

## 🛠️ Detailed Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL 12+

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file:
```bash
cp .env.example .env
```

5. Update `.env` with your database credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/alumni_db
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

6. Create the database:
```bash
createdb alumni_db  # PostgreSQL command
```

7. Run migrations:
```bash
alembic upgrade head
```

8. Start the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`  
API documentation at `http://localhost:8000/api/docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost:8000):
```env
VITE_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

5. Build for Production:
```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Usage

### Creating an Admin User

To create an admin user, use the provided script:

```bash
cd backend
python -m scripts.create_admin
```

This will prompt you for:
- Email
- Password
- Full Name

Alternatively, you can register a user normally, then update the database:
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

### User Roles

- **Alumni**: Can create profiles, post updates (pending approval), view approved posts
- **Admin**: Can approve/reject posts, manage users, all alumni permissions

### Data Flow

1. **User Registration/Login** → `AuthContext` → `api.ts` → Backend `/api/auth/*`
2. **Profile Management** → `MyProfile.tsx` → `alumniApi` → Backend `/api/alumni/*`
3. **Post Creation** → `CreatePost.tsx` → `postsApi` → Backend `/api/posts/*`
4. **Admin Moderation** → `AdminDashboard.tsx` → `adminApi` → Backend `/api/admin/*`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info

### Alumni Profiles
- `GET /api/alumni/profiles` - Get all profiles
- `GET /api/alumni/profiles/{id}` - Get profile by ID
- `GET /api/alumni/profile` - Get current user's profile
- `POST /api/alumni/profile` - Create profile
- `PUT /api/alumni/profile` - Update profile

### Posts
- `GET /api/posts/` - Get all approved posts
- `GET /api/posts/{id}` - Get post by ID
- `GET /api/posts/my-posts` - Get current user's posts
- `POST /api/posts/` - Create post
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post

### Admin
- `GET /api/admin/posts/pending` - Get pending posts
- `PUT /api/admin/posts/{id}/approve` - Approve post
- `PUT /api/admin/posts/{id}/reject` - Reject post
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{id}/toggle-active` - Toggle user active status

## 🔧 Environment Variables

### Backend (`.env`)
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: JWT signing key
- `ALGORITHM`: JWT algorithm (HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time

### Frontend (`.env`)
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL` (your backend URL)

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables from your `.env` file
6. Create a PostgreSQL database on Render and use its connection string

### Database (Render PostgreSQL)
1. Create a new PostgreSQL database on Render
2. Copy the connection string
3. Update `DATABASE_URL` in your backend environment variables
4. Run migrations: `alembic upgrade head`

## 🐛 Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is running
- Check your DATABASE_URL in `.env`
- Verify database `alumni_db` exists

### Port Already in Use
- Backend: Change port in uvicorn command: `--port 8001`
- Frontend: Vite will automatically use next available port

### CORS Errors
- Make sure backend is running before frontend
- Check that CORS origins in `backend/app/main.py` match your frontend URL

### Migration Errors
- Make sure database exists
- Check DATABASE_URL is correct
- Try: `alembic downgrade -1` then `alembic upgrade head`

## 🧪 Testing

### Backend
```bash
# Run with pytest (if tests are added)
pytest
```

### Frontend
```bash
# Run linter
npm run lint
```

## 📚 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, React Router, Axios, React Hook Form, Zod
- **Backend**: FastAPI, SQLAlchemy, Alembic, Python-JOSE, Passlib, Pydantic
- **Database**: PostgreSQL
- **Deployment**: Vercel (frontend), Render (backend + database)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
