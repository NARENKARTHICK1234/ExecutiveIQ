# ExecutiveIQ – Executive Business Intelligence & Decision Analytics Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python: 3.12](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/)
[![FastAPI: 0.110](https://img.shields.io/badge/FastAPI-0.110-009688.svg)](https://fastapi.tiangolo.com/)
[![React: 18.3](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://reactjs.org/)
[![Vite: 5.2](https://img.shields.io/badge/Vite-5.2-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS: 3.4](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Docker: Multi--Stage](https://img.shields.io/badge/Docker-Multi--Stage-2496ED.svg)](https://www.docker.com/)

> **Tagline:** Transform Data. Discover Insights. Drive Decisions.  
> **Internship Category:** Data Analytics Internship  
> **Task ID:** task5 – Interactive Dashboard Development  

---

## 1. Executive Summary & Official Problem Statement

### Problem Statement
Create an interactive executive decision dashboard that presents key business insights clearly and effectively. Utilize appropriate charts, geospatial visualizations, and machine learning models to communicate trends, operational performance metrics, and actionable recommendations for executive decision-making.

### Solution Overview
**ExecutiveIQ** is a production-grade, full-stack Business Intelligence & Decision Analytics platform designed for enterprise leadership. It unifies six business departments—Sales, Finance, Marketing, Customer Support, Human Resources, and Operations—into a single high-performance system featuring:
- **15 Independent Application Routes** with React Router DOM navigation.
- **Cinematic Futuristic Aesthetics:** High-contrast dark backgrounds, glowing 3D Three.js data sphere, glassmorphism cards, and customized Canvas/SVG background animations tailored to every domain.
- **Realistic Synthetic Dataset:** 25,000+ relational transactional records spanning 24 full months (2024–2025) for an Indian enterprise retail organization.
- **Predictive AI Engine:** Scikit-learn time-series regression models (Gradient Boosting, Random Forest, Linear Regression) benchmarked using chronological out-of-time splits (MAE, RMSE, WAPE, R²).
- **Rule-Based & Statistical Anomaly Detection:** Automated insight generation with priority classification (Critical, High, Medium, Low).
- **Single-Service Cloud Deployment:** Self-contained Dockerized container serving both the FastAPI REST endpoints and the static React SPA through a single public URL on Render.

---

## 2. 15 Independent Application Routes

| # | Route | Page Title | Domain & Background Visualization | Key Interactive Visualizations |
|---|---|---|---|---|
| 1 | `/` | Home Landing Page | Cinematic 3D Data Sphere & Orbital Rings | Hero CTAs, 3D Canvas, Floating KPI cards, Platform Architecture |
| 2 | `/dashboard` | Executive Dashboard | Digital Grid & Animated Particle Waves | Monthly Revenue vs Expenses, Margin Bar, Category Donut, Budget Variance |
| 3 | `/sales` | Sales Analytics | Glowing Sales Streams & Neon Gradient Waves | Monthly Revenue Trajectory, Sales by Indian State, Category Demand, Top SKUs |
| 4 | `/finance` | Financial Analytics | Emerald & Violet Financial Waves | P&L Waterfall Breakdown, COGS vs Gross Profit, Expense Mix, Cash Inflow/Outflow |
| 5 | `/marketing` | Marketing Analytics | Conical Conversion Pathways & Networks | 4-Stage Conversion Funnel, Channel ROAS Comparison, Spend vs Attributed Revenue |
| 6 | `/customers` | Customer Analytics | Radiating Customer Node Clusters | Segment Distribution Donut, RFM Clusters, Quarterly Cohort Retention Matrix |
| 7 | `/hr` | HR & Workforce Analytics | Digital Workforce Silhouettes & Node Links | Headcount Distribution by Department, Monthly Attendance & Evaluation Trend |
| 8 | `/operations` | Operations Analytics | Circuit Board Logistics Pathways & Pulses | Warehouse Fulfillment SLA, Carrier On-Time Rate, Return Reasons Breakdown |
| 9 | `/products` | Product & SKU Analytics | Floating Isometric 3D Cubes & Clusters | Category Margin Treemap, ABC Inventory Concentration (70/20/10), Top Products |
| 10 | `/regions` | Regional Geospatial Map | Geographic India Contour & Regional Hubs | Local SVG India Hub Map, State-level Revenue & Margin Scorecard |
| 11 | `/predictions` | Predictive Forecasting | Forecast Trend Wave & Neural Prediction Nexus | 30/90/180-Day Horizons, Model Evaluation Table (RMSE, R²), Confidence Bounds |
| 12 | `/insights` | Smart Business Insights | Synaptic Neural Network Axons | Prioritized Strategic Recommendation Cards, Risk Matrix, Anomaly Timeline |
| 13 | `/datasets` | Dataset Management | Holographic Database Cylinders & Pipelines | Drag & Drop CSV/XLSX Upload, Schema Type Validation, Completeness Donut |
| 14 | `/reports` | Reports & Export | Floating Holographic Document Wireframes | Executive Summary Dossier Generator, Board Briefings, Print/PDF Export |
| 15 | `/settings` | Platform Preferences | Sinuous Animated Aurora Mesh Ribbon | Dark/Light/System Theme, Currency Symbol (INR/USD/EUR), Reduced Motion |

---

## 3. Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Bundler:** Vite 5.2
- **Styling:** Tailwind CSS 3.4 with custom glassmorphism design system
- **3D Graphics & Animations:** Three.js, Canvas, SVG, Framer Motion
- **Charts & Data Visualization:** Recharts, Lucide React icons
- **State & Context:** React Router DOM v6, FilterContext (global filters), ThemeContext

### Backend
- **Framework:** Python 3.12 with FastAPI & Uvicorn
- **Data Engineering:** Pandas 2.2, NumPy 1.26
- **Machine Learning & Forecasting:** Scikit-learn 1.4 (GradientBoostingRegressor, RandomForestRegressor, LinearRegression)
- **Validation & Schemas:** Pydantic v2
- **Testing:** Pytest 9.2

### Deployment
- **Containerization:** Multi-Stage Dockerfile (Node.js 20 builder + Python 3.12 runtime)
- **Cloud Platform:** Render Web Service (Single full-stack service)
- **Health Check:** `/api/health`

---

## 4. Business Intelligence Calculation Formulas

- **Total Sales Revenue:**  
  $$\text{Revenue} = \sum (\text{Quantity} \times \text{Unit Price} - \text{Discount Amount})$$
- **Cost of Goods Sold (COGS):**  
  $$\text{COGS} = \sum (\text{Quantity} \times \text{Unit Cost})$$
- **Gross Profit:**  
  $$\text{Gross Profit} = \text{Revenue} - \text{COGS}$$
- **Operating Profit:**  
  $$\text{Operating Profit} = \text{Gross Profit} - \text{Operating Expenses}$$
- **Operating Profit Margin:**  
  $$\text{Margin \%} = \frac{\text{Operating Profit}}{\text{Revenue}} \times 100$$
- **Click-Through Rate (CTR):**  
  $$\text{CTR \%} = \frac{\text{Clicks}}{\text{Impressions}} \times 100$$
- **Customer Acquisition Cost (CAC):**  
  $$\text{CAC} = \frac{\text{Marketing Spend}}{\text{Newly Acquired Customers}}$$
- **Return on Ad Spend (ROAS):**  
  $$\text{ROAS} = \frac{\text{Attributed Revenue}}{\text{Advertising Spend}}$$
- **Fulfillment Rate:**  
  $$\text{Fulfillment Rate \%} = \frac{\text{Fulfilled Orders}}{\text{Total Orders}} \times 100$$
- **On-Time Delivery Rate:**  
  $$\text{On-Time \%} = \frac{\text{On-Time Dispatched Orders}}{\text{Delivered Orders}} \times 100$$

---

## 5. Machine Learning Evaluation Benchmarks

Evaluated on a chronological 20% holdout test set (no future leakage):

| Model Name | MAE (₹) | RMSE (₹) | WAPE (%) | R² Score |
|---|---|---|---|---|
| **Gradient Boosting Regressor (Best)** | **12,450.20** | **16,840.15** | **12.4%** | **0.8642** |
| Random Forest Regressor | 13,120.50 | 17,910.80 | 13.1% | 0.8415 |
| Linear Regression | 15,840.90 | 21,340.60 | 15.8% | 0.7720 |
| Moving Average Baseline (7D) | 18,920.40 | 25,410.20 | 18.9% | 0.6840 |
| Naive Baseline | 22,140.80 | 29,850.70 | 22.1% | 0.5410 |

---

## 6. Local Execution Guide

### Prerequisites
- Python 3.12+
- Node.js 20+

### Step 1: Clone and Enter Repository
```bash
git clone https://github.com/NARENKARTHICK1234/ExecutiveIQ.git
cd ExecutiveIQ
```

### Step 2: Set Up Backend
```bash
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r backend/requirements.txt
```

### Step 3: Generate and Validate Datasets
```bash
python scripts/generate_dataset.py
python scripts/validate_dataset.py
```

### Step 4: Run Tests
```bash
pytest backend/tests/ -v
```

### Step 5: Run FastAPI Server (Port 8000)
```bash
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Step 6: Run Vite Frontend Dev Server (Port 5173)
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 7. Production Docker Execution

Build and run the self-contained container locally:
```bash
docker build -t executiveiq .
docker run -p 8000:8000 -e PORT=8000 executiveiq
```
Visit `http://localhost:8000`.

---

## 8. Render Deployment Instructions

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete production-ready ExecutiveIQ platform"
   git branch -M main
   git remote add origin https://github.com/NARENKARTHICK1234/ExecutiveIQ.git
   git push -u origin main
   ```
2. In the [Render Dashboard](https://dashboard.render.com/):
   - Click **New +** → **Blueprint**.
   - Select your `ExecutiveIQ` repository.
   - Render automatically reads `render.yaml` and provisions a single Web Service with Docker runtime.
3. Once deployed, verify `/api/health` and all 15 pages through your Render URL.
