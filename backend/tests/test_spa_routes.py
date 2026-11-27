"""
Verification of Multi-Page Independent Route SPA Serving
Ensures all 15 frontend routes can be refreshed and navigated directly.
"""

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

ROUTES = [
    "/",
    "/dashboard",
    "/sales",
    "/finance",
    "/marketing",
    "/customers",
    "/hr",
    "/operations",
    "/products",
    "/regions",
    "/predictions",
    "/insights",
    "/datasets",
    "/reports",
    "/settings"
]

def test_all_15_routes_serve_spa_index():
    for route in ROUTES:
        response = client.get(route)
        assert response.status_code == 200, f"Route {route} failed with status {response.status_code}"
        assert "<div id=\"root\"></div>" in response.text or "<!doctype html>" in response.text.lower(), f"Route {route} did not return SPA index.html"

def test_health_check_remains_intact():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_api_unknown_does_not_return_index():
    response = client.get("/api/unknown_route")
    assert response.status_code == 404
    assert "<!doctype html>" not in response.text.lower()
