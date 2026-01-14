# Netlify Deployment Guide

This guide will help you deploy the Alumni Update Platform frontend to Netlify.

## Prerequisites

1. A GitHub account (or GitLab/Bitbucket)
2. Your code pushed to a Git repository
3. A Netlify account (free at https://netlify.com)

## Step 1: Prepare Your Repository

1. Make sure your code is committed and pushed to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Sign up/Login to Netlify**
   - Go to https://app.netlify.com
   - Sign up with GitHub (easiest option)

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Select "Deploy with GitHub"
   - Authorize Netlify to access your GitHub repositories
   - Select your `Alumni-Update` repository

3. **Configure Build Settings**
   - **Base directory:** `frontend` (important!)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Click "Show advanced" and add environment variable:
     - **Key:** `VITE_API_URL`
     - **Value:** Your backend URL (e.g., `https://your-backend.railway.app` or `https://your-backend.fly.dev`)

4. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (usually 2-3 minutes)

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

4. **Initialize Netlify**
   ```bash
   netlify init
   ```
   - Follow the prompts
   - Select "Create & configure a new site"
   - Choose your team
   - Site name (or press Enter for auto-generated)

5. **Set Environment Variable**
   ```bash
   netlify env:set VITE_API_URL https://your-backend-url.com
   ```

6. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Step 3: Configure Environment Variables

After deployment, you need to set the backend API URL:

1. Go to your site dashboard on Netlify
2. Navigate to **Site settings** → **Environment variables**
3. Add:
   - **Key:** `VITE_API_URL`
   - **Value:** Your backend API URL (e.g., `https://your-backend.railway.app`)

4. **Redeploy** after adding environment variables:
   - Go to **Deploys** tab
   - Click "Trigger deploy" → "Clear cache and deploy site"

## Step 4: Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions

## Important Notes

### Backend Deployment
Netlify only hosts the frontend. You'll need to deploy your backend separately:

**Recommended Backend Hosting:**
- **Railway** (https://railway.app) - Easy setup, includes PostgreSQL
- **Fly.io** (https://fly.io) - Good for Python/FastAPI
- **Render** (https://render.com) - Similar to Railway

### Database Setup
For production, use a managed PostgreSQL service:
- **Supabase** (https://supabase.com) - Free tier available
- **Neon** (https://neon.tech) - Serverless PostgreSQL
- **Railway PostgreSQL** - If using Railway for backend

### CORS Configuration
Make sure your backend allows requests from your Netlify domain:
- Update `backend/app/main.py` CORS settings:
  ```python
  allow_origins=[
      "http://localhost:5173",
      "http://localhost:3000",
      "https://your-site.netlify.app",  # Add your Netlify URL
      "https://your-custom-domain.com"   # Add custom domain if used
  ]
  ```

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure `base directory` is set to `frontend`
- Verify `package.json` has correct build script

### 404 Errors on Routes
- The `_redirects` file should handle this
- If issues persist, check `netlify.toml` redirect rules

### API Calls Fail
- Verify `VITE_API_URL` environment variable is set
- Check backend CORS settings
- Ensure backend is deployed and accessible

### Environment Variables Not Working
- Redeploy after adding environment variables
- Variables starting with `VITE_` are required for Vite apps
- Check variable name matches exactly (case-sensitive)

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Netlify account created
- [ ] Site imported from GitHub
- [ ] Base directory set to `frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variable `VITE_API_URL` set
- [ ] Backend deployed separately
- [ ] Backend CORS updated with Netlify URL
- [ ] Database configured and migrations run
- [ ] Site tested and working

## Support

- Netlify Docs: https://docs.netlify.com
- Netlify Community: https://answers.netlify.com

