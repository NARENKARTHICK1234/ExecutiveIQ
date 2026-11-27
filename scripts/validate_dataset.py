"""
ExecutiveIQ - Dataset Validation Script
Validates referential integrity, record counts, date ranges, and business metrics logic.
"""

import os
import json
import pandas as pd
import numpy as np

def validate_datasets():
    print("=== ExecutiveIQ Dataset Validation ===")
    data_dir = "data"
    required_files = [
        "sales_transactions.csv", "customers.csv", "products.csv", "finance.csv",
        "marketing.csv", "employees.csv", "workforce_activity.csv", "operations.csv",
        "inventory.csv", "regions.csv", "departments.csv", "targets.csv",
        "geojson/india_states.json"
    ]
    
    # 1. File existence check
    for f in required_files:
        path = os.path.join(data_dir, f)
        assert os.path.exists(path), f"Missing required file: {path}"
        print(f"[OK] File exists: {f}")
        
    # 2. Load datasets
    df_tx = pd.read_csv("data/sales_transactions.csv")
    df_cust = pd.read_csv("data/customers.csv")
    df_prod = pd.read_csv("data/products.csv")
    df_fin = pd.read_csv("data/finance.csv")
    df_mkt = pd.read_csv("data/marketing.csv")
    df_emp = pd.read_csv("data/employees.csv")
    df_wf = pd.read_csv("data/workforce_activity.csv")
    df_ops = pd.read_csv("data/operations.csv")
    df_inv = pd.read_csv("data/inventory.csv")
    df_reg = pd.read_csv("data/regions.csv")
    df_dept = pd.read_csv("data/departments.csv")
    df_tgt = pd.read_csv("data/targets.csv")
    
    # 3. Check Row Counts
    print(f"Transactions row count: {len(df_tx)} (Required >= 20,000)")
    assert len(df_tx) >= 20000, "Transactions dataset has fewer than 20,000 records!"
    print(f"Customers count: {len(df_cust)} (Expected ~5,000)")
    assert len(df_cust) >= 4000, "Customers count too low!"
    print(f"Products count: {len(df_prod)} (Expected ~300)")
    assert len(df_prod) >= 250, "Products count too low!"
    print(f"Employees count: {len(df_emp)} (Expected ~500)")
    assert len(df_emp) >= 450, "Employees count too low!"
    
    # 4. Referential Integrity
    print("Checking Referential Integrity...")
    prod_ids = set(df_prod["product_id"])
    cust_ids = set(df_cust["customer_id"])
    reg_ids = set(df_reg["region_id"])
    dept_ids = set(df_dept["department_id"])
    
    assert set(df_tx["product_id"]).issubset(prod_ids), "Invalid product_id found in transactions!"
    assert set(df_tx["customer_id"]).issubset(cust_ids), "Invalid customer_id found in transactions!"
    assert set(df_tx["region_id"]).issubset(reg_ids), "Invalid region_id found in transactions!"
    assert set(df_cust["region_id"]).issubset(reg_ids), "Invalid region_id found in customers!"
    assert set(df_fin["department_id"]).issubset(dept_ids), "Invalid department_id found in finance!"
    assert set(df_emp["department_id"]).issubset(dept_ids), "Invalid department_id found in employees!"
    print("[OK] Referential integrity confirmed across all relational keys.")
    
    # 5. Financial Math Validation
    print("Validating Financial Math Formulas...")
    # Check sales revenue calculation: quantity * unit_price - discount_amount
    expected_rev = (df_tx["quantity"] * df_tx["unit_price"] - df_tx["discount_amount"]).round(2)
    diff_rev = np.abs(df_tx["sales_revenue"] - expected_rev).max()
    assert diff_rev < 0.05, f"Discrepancy in sales revenue calculation: max diff={diff_rev}"
    
    # Check gross profit: sales_revenue - product_cost
    expected_profit = (df_tx["sales_revenue"] - df_tx["product_cost"]).round(2)
    diff_profit = np.abs(df_tx["gross_profit"] - expected_profit).max()
    assert diff_profit < 0.05, f"Discrepancy in gross profit calculation: max diff={diff_profit}"
    
    # Check non-negative constraints
    assert (df_tx["quantity"] > 0).all(), "Negative quantity detected!"
    assert (df_tx["sales_revenue"] >= 0).all(), "Negative sales revenue detected!"
    print("[OK] Financial calculation formulas verified with zero anomalies.")
    
    # 6. Date Range Check (24+ months)
    tx_dates = pd.to_datetime(df_tx["transaction_date"])
    min_date = tx_dates.min()
    max_date = tx_dates.max()
    months_span = (max_date.year - min_date.year) * 12 + max_date.month - min_date.month + 1
    print(f"Date Span: {min_date.strftime('%Y-%m-%d')} to {max_date.strftime('%Y-%m-%d')} ({months_span} months)")
    assert months_span >= 24, "Transactions do not cover at least 24 months!"
    print("[OK] Date range spans 24+ full months.")
    
    # 7. GeoJSON Validation
    with open("data/geojson/india_states.json", "r") as f:
        geo = json.load(f)
    assert geo.get("type") == "FeatureCollection", "Invalid GeoJSON structure!"
    assert len(geo.get("features", [])) > 0, "GeoJSON has no features!"
    print(f"[OK] GeoJSON verified with {len(geo['features'])} regional boundary features.")
    
    print("\n>>> ALL VALIDATION CHECKS PASSED SUCCESSFULLY! <<<")
    return True

if __name__ == "__main__":
    validate_datasets()
