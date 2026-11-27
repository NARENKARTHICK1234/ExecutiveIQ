"""
ExecutiveIQ FastAPI Backend Application
Handles REST APIs, Machine Learning endpoints, and single-service static SPA serving.
"""

import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from backend.app.routes.api import router as api_router

app = FastAPI(
    title="ExecutiveIQ API",
    description="Executive Business Intelligence & Decision Analytics Platform API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Enable CORS for local dev Vite server and production domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Router
app.include_router(api_router)

# Path to built frontend static files
FRONTEND_DIST = os.path.join(os.getcwd(), "frontend", "dist")

if os.path.exists(FRONTEND_DIST):
    # Mount assets directory
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    # SPA Fallback for all 15 independent routes
    @app.get("/{full_path:path}")
    async def serve_spa(request: Request, full_path: str):
        # Strict requirement: Never return index.html for missing API endpoints!
        if full_path.startswith("api/") or full_path == "api":
            raise HTTPException(status_code=404, detail="API endpoint not found")
            
        file_path = os.path.join(FRONTEND_DIST, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
            
        index_file = os.path.join(FRONTEND_DIST, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
            
        raise HTTPException(status_code=404, detail="Frontend build index.html not found")
else:
    @app.get("/")
    def root_status():
        return {
            "service": "ExecutiveIQ Backend",
            "status": "ready",
            "message": "Frontend build not yet present. API active at /api/health and /api/docs"
        }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=port, reload=True)
