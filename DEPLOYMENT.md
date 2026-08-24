# 🚀 GramSeva AI - Production Cloud Deployment Guide

This guide walks you through deploying **GramSeva AI** (Unified Frontend + Backend API + Managed PostgreSQL Database) to the cloud with zero hassle.

---

## 🌟 Method 1: Deploy on Render (Recommended - Free Tier Available)

Render allows you to host the unified fullstack web service and a managed PostgreSQL database with automatic SSL.

### Step 1: Push Code to GitHub
1. Create a new repository on [GitHub](https://github.com/new) (e.g. `gramseva-ai`).
2. In your terminal / folder, initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - GramSeva AI Fullstack"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gramseva-ai.git
   git push -u origin main
   ```

### Step 2: 1-Click Blueprint Deployment on Render
1. Sign up or log in to [Render.com](https://render.com).
2. Click **New +** → **Blueprint**.
3. Connect your GitHub repository (`gramseva-ai`).
4. Render will detect `render.yaml` automatically and configure:
   - **Web Service:** `gramseva-ai` (Node.js runtime)
   - **PostgreSQL Database:** `gramseva-db`
5. Click **Apply**.
6. Render will automatically:
   - Provision PostgreSQL
   - Run Prisma migrations & seed initial departments
   - Deploy your web app with a free `https://gramseva-ai.onrender.com` URL!

---

## 🚂 Method 2: Deploy on Railway

1. Sign up on [Railway.app](https://railway.app).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select your `gramseva-ai` repository.
4. Click **+ New** → **Database** → **Add PostgreSQL**.
5. In your web service settings, add environment variables:
   - `DATABASE_URL`: `${{Postgres.DATABASE_URL}}`
   - `JWT_SECRET`: (Click generate)
   - `NODE_ENV`: `production`
6. Set **Build Command**: `cd backend && npm install && npm run build`
7. Set **Start Command**: `cd backend && npm start`
8. Generate a public domain under **Settings → Networking → Generate Domain**.

---

## 🐳 Method 3: Deploy to Any VPS / Cloud Server using Docker Compose

If you have an AWS EC2, DigitalOcean Droplet, Linode, or GCP VM:

1. Clone your repo on the server:
   ```bash
   git clone https://github.com/YOUR_USERNAME/gramseva-ai.git
   cd gramseva-ai/GramSeva_AI_Final_Fullstack
   ```
2. Start the fullstack container stack:
   ```bash
   docker compose up -d --build
   ```
3. Your app will be live at `http://YOUR_SERVER_IP:5000` with PostgreSQL running in a persistent Docker volume!

---

## 🔑 Creating the First Super Admin in Production

After your cloud deployment is live:
1. Open the Render / Railway Shell or SSH console.
2. Run:
   ```bash
   cd backend
   node scripts/create-admin.js "Super Admin" 9876543210 "YourSecurePassword123"
   ```
3. You can now log into your live production app at `/` with this mobile and password!
