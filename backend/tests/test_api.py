"""
Unit and Integration Tests for ExecutiveIQ Backend
Tests endpoints, ML models, referential integrity, and edge cases.
"""

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "service": "ExecutiveIQ"}

def test_overview_endpoint():
    response = client.get("/api/overview")
    assert response.status_code == 200
    data = response.json()
    assert "kpis" in data
    assert data["kpis"]["total_revenue"] > 0
    assert "monthly_performance" in data
    assert len(data["monthly_performance"]) >= 12

def test_sales_endpoint():
    response = client.get("/api/sales")
    assert response.status_code == 200
    data = response.json()
    assert "top_selling_products" in data
    assert len(data["top_selling_products"]) > 0

def test_finance_endpoint():
    response = client.get("/api/finance")
    assert response.status_code == 200
    data = response.json()
    assert "waterfall_chart" in data
    assert "gross_profit" in data["kpis"]

def test_marketing_endpoint():
    response = client.get("/api/marketing")
    assert response.status_code == 200
    data = response.json()
    assert "conversion_funnel" in data

def test_customer_endpoint():
    response = client.get("/api/customers")
    assert response.status_code == 200
    data = response.json()
    assert "rfm_segmentation" in data
    assert "cohort_retention" in data

def test_hr_endpoint():
    response = client.get("/api/hr")
    assert response.status_code == 200
    data = response.json()
    assert "department_distribution" in data

def test_operations_endpoint():
    response = client.get("/api/operations")
    assert response.status_code == 200
    data = response.json()
    assert "warehouse_performance" in data

def test_products_endpoint():
    response = client.get("/api/products")
    assert response.status_code == 200
    data = response.json()
    assert "abc_classification" in data

def test_regions_endpoint():
    response = client.get("/api/regions")
    assert response.status_code == 200
    data = response.json()
    assert "city_markers" in data
    assert len(data["city_markers"]) >= 10

def test_geojson_endpoint():
    response = client.get("/api/maps/geojson")
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "FeatureCollection"
    assert len(data["features"]) > 0

def test_predictions_models_evaluation():
    response = client.get("/api/predictions/models")
    assert response.status_code == 200
    data = response.json()
    assert "best_model" in data
    assert "models_comparison" in data
    assert "Random Forest" in data["models_comparison"]
    assert "Gradient Boosting" in data["models_comparison"]

def test_predictions_forecast():
    response = client.post("/api/predictions/forecast", json={"horizon_days": 30, "model_name": "Gradient Boosting", "scenario": "base"})
    assert response.status_code == 200
    data = response.json()
    assert "forecast_points" in data
    assert len(data["forecast_points"]) == 30

def test_insights_endpoint():
    response = client.get("/api/insights")
    assert response.status_code == 200
    data = response.json()
    assert "insights" in data
    assert len(data["insights"]) >= 4

def test_missing_api_endpoint_returns_404():
    response = client.get("/api/nonexistent_endpoint")
    assert response.status_code == 404
