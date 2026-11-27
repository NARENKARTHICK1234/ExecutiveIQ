# ExecutiveIQ – Deployment Manual & DevOps Guide

This guide details the single full-stack Web Service deployment on **Render** using Docker.

---

## 1. Single Web Service Architecture

ExecutiveIQ is packaged as a unified container where:
1. **React 18 Production Build:** Static assets are compiled during Stage 1 of the Dockerfile into `frontend/dist`.
2. **FastAPI Runtime:** Serves the REST API endpoints under `/api/*` and acts as the Single-Page Application (SPA) static file server for all 15 independent application routes under `/`, `/dashboard`, `/sales`, etc.
3. **No External Microservices Required:** SQLite/local relational CSV storage, zero-external-API geospatial mapping, and embedded Scikit-learn models run natively within the free-tier memory envelope (~512MB RAM).

---

## 2. GitHub Repository Configuration

Run the following commands in the project root to commit the project:

```bash
# Verify git status
git status

# Stage all files
git add .

# Create initial commit
git commit -m "feat: complete ExecutiveIQ BI and Decision Analytics platform"

# Configure main branch
git branch -M main

# Add remote (Replace with your actual GitHub repository URL when created)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/ExecutiveIQ.git

# Push to GitHub (Only run after creating the repository on GitHub)
# git push -u origin main
```

---

## 3. Docker Local Build and Run

To test the container before deploying to the cloud:

```bash
# Build multi-stage image
docker build -t executiveiq:latest .

# Run container binding to port 8000
docker run -d --name executiveiq-app -p 8000:8000 -e PORT=8000 executiveiq:latest

# Verify health status
curl http://localhost:8000/api/health
```

Expected output:
```json
{"status":"healthy","service":"ExecutiveIQ"}
```

---

## 4. Render Web Service Deployment Steps

### Method A: Blueprint Deployment (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Blueprint**.
3. Connect your GitHub account and select the **ExecutiveIQ** repository.
4. Render will detect `render.yaml` at the root and automatically configure:
   - **Service Name:** `executiveiq`
   - **Environment:** `Docker`
   - **Region:** `Singapore`
   - **Plan:** `Free`
   - **Health Check Path:** `/api/health`
5. Click **Apply**.

### Method B: Manual Web Service Creation
If not using Blueprints:
1. Click **New +** → **Web Service**.
2. Select your repository.
3. Fill in the configuration:
   - **Name:** `executiveiq`
   - **Region:** `Singapore` (or closest to your region)
   - **Branch:** `main`
   - **Runtime:** `Docker`
   - **Dockerfile Path:** `./Dockerfile`
   - **Docker Context:** `.`
   - **Health Check Path:** `/api/health`
   - **Instance Type:** `Free`
4. In Environment Variables:
   - `PORT`: `10000`
   - `ENVIRONMENT`: `production`
   - `DATA_DIR`: `data`
5. Click **Create Web Service**.

---

## 5. Post-Deployment Verification Checklist

Once Render finishes building the image, test the live deployment:

- [ ] Health check returns HTTP 200: `https://executiveiq.onrender.com/api/health`
- [ ] Landing page loads with animated 3D Data Sphere: `https://executiveiq.onrender.com/`
- [ ] Explore Dashboard navigation opens: `https://executiveiq.onrender.com/dashboard`
- [ ] Direct route access and page refresh works for all 15 routes:
  - `/sales`
  - `/finance`
  - `/marketing`
  - `/customers`
  - `/hr`
  - `/operations`
  - `/products`
  - `/regions`
  - `/predictions`
  - `/insights`
  - `/datasets`
  - `/reports`
  - `/settings`
- [ ] Missing API routes return proper 404 JSON, not HTML: `https://executiveiq.onrender.com/api/unknown`
- [ ] File download works: `https://executiveiq.onrender.com/api/datasets/download?name=transactions`
- [ ] Machine learning prediction runs on demand via `/api/predictions/forecast`

---

## 6. Live Website URL

```
Live Public URL: [Will be updated upon live deployment approval]
Target Host: https://executiveiq.onrender.com
```
