"""
ExecutiveIQ - Synthetic Dataset Generator
Generates realistic enterprise business intelligence datasets for a 24-month period (2024-01-01 to 2025-12-31)
with reproducible seed, referential integrity, and business logic.
"""

import os
import json
import random
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

def generate_all_datasets():
    seed = 42
    random.seed(seed)
    np.random.seed(seed)
    
    os.makedirs("data", exist_ok=True)
    os.makedirs("data/geojson", exist_ok=True)
    
    print("1. Generating Departments...")
    departments = [
        {"department_id": "DEP-001", "department_name": "Sales", "head_of_department": "Vikram Malhotra", "annual_budget": 12500000},
        {"department_id": "DEP-002", "department_name": "Finance", "head_of_department": "Ananya Sharma", "annual_budget": 6000000},
        {"department_id": "DEP-003", "department_name": "Marketing", "head_of_department": "Rohit Verma", "annual_budget": 9500000},
        {"department_id": "DEP-004", "department_name": "Customer Support", "head_of_department": "Priya Nair", "annual_budget": 5200000},
        {"department_id": "DEP-005", "department_name": "Human Resources", "head_of_department": "Rajesh Kulkarni", "annual_budget": 4800000},
        {"department_id": "DEP-006", "department_name": "Operations", "head_of_department": "Sunita Patel", "annual_budget": 14000000},
    ]
    df_dept = pd.DataFrame(departments)
    df_dept.to_csv("data/departments.csv", index=False)
    
    print("2. Generating Regions...")
    regions = [
        {"region_id": "REG-001", "country": "India", "state": "Maharashtra", "city": "Mumbai", "latitude": 19.0760, "longitude": 72.8777, "region_category": "Metro Tier 1"},
        {"region_id": "REG-002", "country": "India", "state": "Delhi", "city": "New Delhi", "latitude": 28.6139, "longitude": 77.2090, "region_category": "Metro Tier 1"},
        {"region_id": "REG-003", "country": "India", "state": "Karnataka", "city": "Bengaluru", "latitude": 12.9716, "longitude": 77.5946, "region_category": "Metro Tier 1"},
        {"region_id": "REG-004", "country": "India", "state": "Telangana", "city": "Hyderabad", "latitude": 17.3850, "longitude": 78.4867, "region_category": "Metro Tier 1"},
        {"region_id": "REG-005", "country": "India", "state": "Tamil Nadu", "city": "Chennai", "latitude": 13.0827, "longitude": 80.2707, "region_category": "Metro Tier 1"},
        {"region_id": "REG-006", "country": "India", "state": "West Bengal", "city": "Kolkata", "latitude": 22.5726, "longitude": 88.3639, "region_category": "Metro Tier 1"},
        {"region_id": "REG-007", "country": "India", "state": "Maharashtra", "city": "Pune", "latitude": 18.5204, "longitude": 73.8567, "region_category": "Urban Tier 2"},
        {"region_id": "REG-008", "country": "India", "state": "Gujarat", "city": "Ahmedabad", "latitude": 23.0225, "longitude": 72.5714, "region_category": "Urban Tier 2"},
        {"region_id": "REG-009", "country": "India", "state": "Rajasthan", "city": "Jaipur", "latitude": 26.9124, "longitude": 75.7873, "region_category": "Urban Tier 2"},
        {"region_id": "REG-010", "country": "India", "state": "Kerala", "city": "Kochi", "latitude": 9.9312, "longitude": 76.2673, "region_category": "Urban Tier 2"},
        {"region_id": "REG-011", "country": "India", "state": "Uttar Pradesh", "city": "Lucknow", "latitude": 26.8467, "longitude": 80.9462, "region_category": "Urban Tier 2"},
        {"region_id": "REG-012", "country": "India", "state": "Punjab", "city": "Chandigarh", "latitude": 30.7333, "longitude": 76.7794, "region_category": "Urban Tier 2"},
        {"region_id": "REG-013", "country": "India", "state": "Madhya Pradesh", "city": "Indore", "latitude": 22.7196, "longitude": 75.8577, "region_category": "Emerging Hub"},
        {"region_id": "REG-014", "country": "India", "state": "Gujarat", "city": "Surat", "latitude": 21.1702, "longitude": 72.8311, "region_category": "Emerging Hub"},
        {"region_id": "REG-015", "country": "India", "state": "Odisha", "city": "Bhubaneswar", "latitude": 20.2961, "longitude": 85.8245, "region_category": "Emerging Hub"},
    ]
    df_reg = pd.DataFrame(regions)
    df_reg.to_csv("data/regions.csv", index=False)
    region_ids = [r["region_id"] for r in regions]
    
    print("3. Generating Products (300 products)...")
    categories = {
        "Enterprise Hardware": ["Server Blades", "Edge Gateway", "Network Switch", "Rack Unit", "Power Distributor"],
        "Cloud & Peripherals": ["Thunderbolt Dock", "Mesh Router", "Enterprise SSD", "Secure WebCam 4K", "Noise-Cancelling Headset"],
        "Office Tech": ["Ergonomic Monitor Arm", "Wireless Mechanical Keyboard", "Ultra-Wide Monitor", "Conference Speakerphone", "Desk Sensor Hub"],
        "Industrial IoT": ["Vibration Sensor", "Smart Temperature Probe", "RFID Pallet Tracker", "LoRa Gateway", "Air Quality Telemetry"],
        "Security Systems": ["Biometric Terminal", "Smart IP Camera 4K", "Access Control Badge", "Tamper Sensor", "Thermal Inspection Scanner"],
        "Software Subscriptions": ["Analytics Pro License", "Cloud Backup Tier 1", "Cyber Defense Suite", "API Gateway Pro", "IoT Fleet Manager"]
    }
    
    products = []
    prod_id_counter = 1
    for cat, subcats in categories.items():
        for subcat in subcats:
            for item_idx in range(1, 11): # 6 categories * 5 subcats * 10 = 300 products
                p_id = f"PRD-{prod_id_counter:04d}"
                prod_id_counter += 1
                base_cost = random.choice([450, 950, 1800, 3200, 6500, 12000, 24000, 48000]) * random.uniform(0.85, 1.25)
                base_cost = round(base_cost, 2)
                margin = random.uniform(0.22, 0.55)
                unit_price = round(base_cost / (1 - margin), 2)
                status = np.random.choice(["Active", "Active", "Active", "Active", "Active", "Discontinued", "Out of Stock"], p=[0.85, 0.05, 0.04, 0.02, 0.02, 0.01, 0.01])
                supplier_id = f"SUP-{random.randint(101, 140):03d}"
                
                products.append({
                    "product_id": p_id,
                    "product_name": f"{subcat} Model-{item_idx}X",
                    "category": cat,
                    "subcategory": subcat,
                    "unit_price": unit_price,
                    "unit_cost": base_cost,
                    "supplier_id": supplier_id,
                    "product_status": status
                })
    df_products = pd.DataFrame(products)
    df_products.to_csv("data/products.csv", index=False)
    product_dict = {p["product_id"]: p for p in products}
    product_ids = [p["product_id"] for p in products if p["product_status"] != "Discontinued"]
    
    print("4. Generating Customers (5,000 customers)...")
    segments = ["Enterprise", "Mid-Market", "SMB", "Consumer Premium", "Consumer Standard"]
    seg_weights = [0.15, 0.25, 0.35, 0.15, 0.10]
    channels = ["Organic Search", "Paid Search", "Social Media", "Email Marketing", "Direct Referral", "Events"]
    chan_weights = [0.25, 0.30, 0.15, 0.12, 0.10, 0.08]
    tiers = ["Platinum", "Gold", "Silver", "Standard"]
    
    customers = []
    start_date = datetime(2023, 1, 1)
    for c_idx in range(1, 5001):
        c_id = f"CUST-{c_idx:05d}"
        days_offset = random.randint(0, 700)
        reg_date = (start_date + timedelta(days=days_offset)).strftime("%Y-%m-%d")
        seg = np.random.choice(segments, p=seg_weights)
        c_reg = random.choice(region_ids)
        chan = np.random.choice(channels, p=chan_weights)
        sat = round(np.clip(np.random.normal(4.2, 0.6), 1.0, 5.0), 1)
        tier = np.random.choice(tiers, p=[0.10, 0.25, 0.40, 0.25])
        
        customers.append({
            "customer_id": c_id,
            "registration_date": reg_date,
            "customer_segment": seg,
            "region_id": c_reg,
            "acquisition_channel": chan,
            "satisfaction_score": sat,
            "membership_status": tier
        })
    df_customers = pd.DataFrame(customers)
    df_customers.to_csv("data/customers.csv", index=False)
    customer_ids = [c["customer_id"] for c in customers]
    customer_region_map = {c["customer_id"]: c["region_id"] for c in customers}
    customer_reg_dates = {c["customer_id"]: datetime.strptime(c["registration_date"], "%Y-%m-%d") for c in customers}

    print("5. Generating Sales Transactions (25,000 rows across 2024 & 2025)...")
    # Date range 2024-01-01 to 2025-12-31 (731 days)
    t_start = datetime(2024, 1, 1)
    t_end = datetime(2025, 12, 31)
    total_days = (t_end - t_start).days + 1
    
    sales_channels = ["Online Store", "Mobile App", "Corporate B2B", "Retail Partner"]
    channel_weights = [0.45, 0.30, 0.15, 0.10]
    payment_methods = ["UPI", "Net Banking", "Credit Card", "Debit Card", "Corporate Net30"]
    order_statuses = ["Delivered", "Shipped", "Processing", "Returned", "Cancelled"]
    status_weights = [0.86, 0.05, 0.03, 0.04, 0.02]
    
    # We will generate ~25,000 transactions with seasonal spikes in Oct/Nov (Diwali) and Mar (financial year end)
    transactions = []
    order_id_counter = 10001
    
    # Probability weights per day to reflect seasonality
    day_weights = []
    for day_idx in range(total_days):
        cur_date = t_start + timedelta(days=day_idx)
        m = cur_date.month
        # Oct & Nov festive boost (Diwali)
        festive_mult = 1.45 if m in [10, 11] else 1.0
        # Year end boost (March)
        mar_mult = 1.25 if m == 3 else 1.0
        # Year 2025 has organic business growth of 20%
        growth_mult = 1.20 if cur_date.year == 2025 else 1.0
        # Weekend slight bump for online/app
        day_mult = 1.15 if cur_date.weekday() in [5, 6] else 1.0
        day_weights.append(festive_mult * mar_mult * growth_mult * day_mult)
    
    day_weights = np.array(day_weights) / sum(day_weights)
    chosen_day_indices = np.random.choice(total_days, size=25000, p=day_weights)
    chosen_day_indices.sort()
    
    curr_order_id = f"ORD-{order_id_counter}"
    items_in_order = 0
    max_items_in_curr_order = random.choice([1, 1, 2, 2, 3, 4])
    curr_cust = random.choice(customer_ids)
    curr_chan = np.random.choice(sales_channels, p=channel_weights)
    curr_pay = random.choice(payment_methods)
    curr_stat = np.random.choice(order_statuses, p=status_weights)
    
    for t_idx, d_idx in enumerate(chosen_day_indices, 1):
        t_id = f"TXN-{t_idx:06d}"
        t_date = t_start + timedelta(days=int(d_idx))
        
        if items_in_order >= max_items_in_curr_order:
            order_id_counter += 1
            curr_order_id = f"ORD-{order_id_counter}"
            items_in_order = 0
            max_items_in_curr_order = random.choice([1, 1, 1, 2, 2, 3])
            curr_cust = random.choice(customer_ids)
            curr_chan = np.random.choice(sales_channels, p=channel_weights)
            curr_pay = random.choice(payment_methods)
            curr_stat = np.random.choice(order_statuses, p=status_weights)
            
        items_in_order += 1
        
        # Pick product
        p_id = random.choice(product_ids)
        prod_info = product_dict[p_id]
        unit_p = prod_info["unit_price"]
        unit_c = prod_info["unit_cost"]
        
        qty = random.choice([1, 1, 1, 2, 2, 3, 5, 10]) if prod_info["category"] != "Enterprise Hardware" else random.choice([1, 1, 2])
        # Discount logic
        discount_rate = np.random.choice([0.0, 0.05, 0.10, 0.15, 0.20], p=[0.45, 0.25, 0.15, 0.10, 0.05])
        gross_rev = round(qty * unit_p, 2)
        disc_amt = round(gross_rev * discount_rate, 2)
        sales_rev = round(gross_rev - disc_amt, 2)
        prod_cost = round(qty * unit_c, 2)
        gross_prof = round(sales_rev - prod_cost, 2)
        
        cust_reg = customer_region_map.get(curr_cust, random.choice(region_ids))
        
        transactions.append({
            "transaction_id": t_id,
            "order_id": curr_order_id,
            "transaction_date": t_date.strftime("%Y-%m-%d"),
            "customer_id": curr_cust,
            "product_id": p_id,
            "region_id": cust_reg,
            "sales_channel": curr_chan,
            "quantity": qty,
            "unit_price": unit_p,
            "discount_amount": disc_amt,
            "sales_revenue": sales_rev,
            "product_cost": prod_cost,
            "gross_profit": gross_prof,
            "payment_method": curr_pay,
            "order_status": curr_stat
        })
        
    df_transactions = pd.DataFrame(transactions)
    df_transactions.to_csv("data/sales_transactions.csv", index=False)
    
    print("6. Generating Operations and Deliveries...")
    # Derive operations from orders
    unique_orders = df_transactions.drop_duplicates(subset=["order_id"])[["order_id", "transaction_date", "order_status", "region_id"]].to_dict("records")
    warehouses = ["WH-MUM-01", "WH-DEL-02", "WH-BLR-03", "WH-HYD-04", "WH-KOL-05", "WH-PUN-06"]
    
    operations = []
    for o in unique_orders:
        o_date = datetime.strptime(o["transaction_date"], "%Y-%m-%d")
        expected_days = random.randint(2, 6)
        expected_delivery = o_date + timedelta(days=expected_days)
        
        stat = o["order_status"]
        if stat == "Delivered":
            actual_delay = random.choice([0, 0, 0, 0, 1, 1, 2, -1, -1])
            actual_delivery = expected_delivery + timedelta(days=actual_delay)
            actual_del_str = actual_delivery.strftime("%Y-%m-%d")
            ful_stat = "Delivered" if actual_delay <= 0 else "Delayed"
            ret_stat = "None"
            ret_reason = "None"
        elif stat == "Returned":
            actual_delivery = expected_delivery + timedelta(days=random.randint(0, 2))
            actual_del_str = actual_delivery.strftime("%Y-%m-%d")
            ful_stat = "Returned"
            ret_stat = "Returned"
            ret_reason = random.choice(["Damaged Goods", "Defective Item", "Incorrect Product", "Delayed Delivery", "Customer Change of Mind"])
        elif stat == "Shipped":
            actual_del_str = ""
            ful_stat = "In Transit"
            ret_stat = "None"
            ret_reason = "None"
        elif stat == "Processing":
            actual_del_str = ""
            ful_stat = "Processing"
            ret_stat = "None"
            ret_reason = "None"
        else: # Cancelled
            actual_del_str = ""
            ful_stat = "Cancelled"
            ret_stat = "None"
            ret_reason = "Order Cancelled Prior to Dispatch"
            
        del_cost = round(random.uniform(120, 480), 2)
        wh = random.choice(warehouses)
        
        operations.append({
            "order_id": o["order_id"],
            "warehouse_id": wh,
            "order_date": o["transaction_date"],
            "expected_delivery_date": expected_delivery.strftime("%Y-%m-%d"),
            "actual_delivery_date": actual_del_str,
            "fulfillment_status": ful_stat,
            "delivery_cost": del_cost,
            "return_status": ret_stat,
            "return_reason": ret_reason
        })
    df_ops = pd.DataFrame(operations)
    df_ops.to_csv("data/operations.csv", index=False)

    print("7. Generating Marketing Campaigns (24 months)...")
    m_channels = ["Google Ads", "Meta Ads", "LinkedIn B2B", "Email Campaign", "Influencer/Partner", "SEO Content"]
    m_campaigns = [
        "Q1 Tech Refresh Campaign", "Diwali Mega Sale Tech", "Holi Enterprise Blitz",
        "Cloud Solutions Summit Promo", "B2B Autumn Connect", "New Fiscal Year Push",
        "Summer Hardware Expo", "Black Friday Digital Deal", "Cyber Resilience Push",
        "Smart Office Upgrade Week", "Founders Club Invitation", "Startup Scale Accelerator"
    ]
    
    marketing_records = []
    camp_counter = 101
    for year in [2024, 2025]:
        for month in range(1, 13):
            # 6 channels per month
            for ch in m_channels:
                c_name = f"{random.choice(m_campaigns)} - {year} M{month:02d}"
                c_id = f"CMP-{camp_counter:04d}"
                camp_counter += 1
                
                # Impressions & spend
                spend = round(random.uniform(45000, 220000) * (1.4 if month in [10, 11] else 1.0), 2)
                cpm = random.uniform(80, 240)
                impressions = int((spend / cpm) * 1000)
                ctr = random.uniform(0.015, 0.048)
                clicks = int(impressions * ctr)
                conv_rate = random.uniform(0.02, 0.065)
                conversions = int(clicks * conv_rate)
                new_cust = max(1, int(conversions * random.uniform(0.5, 0.8)))
                roas = round(random.uniform(2.8, 6.2), 2)
                attr_rev = round(spend * roas, 2)
                c_date = f"{year}-{month:02d}-15"
                
                marketing_records.append({
                    "campaign_id": c_id,
                    "campaign_name": c_name,
                    "date": c_date,
                    "marketing_channel": ch,
                    "impressions": impressions,
                    "clicks": clicks,
                    "conversions": conversions,
                    "new_customers": new_cust,
                    "campaign_spend": spend,
                    "attributed_revenue": attr_rev
                })
    df_mkt = pd.DataFrame(marketing_records)
    df_mkt.to_csv("data/marketing.csv", index=False)

    print("8. Generating Financial Records (Operating Expenses & Cash Flows)...")
    # Derived from sales for consistency and logical coherence
    # Aggregate monthly recognized revenue & cogs
    df_transactions["month_year"] = pd.to_datetime(df_transactions["transaction_date"]).dt.to_period("M")
    monthly_sales = df_transactions[df_transactions["order_status"].isin(["Delivered", "Shipped"])].groupby("month_year").agg(
        rev=("sales_revenue", "sum"),
        cogs=("product_cost", "sum")
    ).reset_index()
    
    finance_records = []
    f_counter = 1
    exp_categories = [
        ("DEP-001", "Sales Commission & Travel", 0.12),
        ("DEP-002", "Audit & Financial Tools", 0.06),
        ("DEP-003", "Marketing & Ad Spend", 0.22),
        ("DEP-004", "Customer Care Platform", 0.08),
        ("DEP-005", "HR & Employee Benefits", 0.18),
        ("DEP-006", "Logistics & Warehousing", 0.34)
    ]
    
    for _, row in monthly_sales.iterrows():
        period_str = str(row["month_year"])
        m_rev = row["rev"]
        # Total monthly operating expenses roughly 40-55% of gross revenue
        m_opex_total = m_rev * random.uniform(0.42, 0.52)
        
        for dept_id, exp_cat, share in exp_categories:
            f_id = f"FIN-{f_counter:05d}"
            f_counter += 1
            opex = round(m_opex_total * share * random.uniform(0.92, 1.08), 2)
            budget = round(opex * random.uniform(0.95, 1.10), 2)
            inflow = round(m_rev * share, 2)
            outflow = round(opex + (row["cogs"] * share * 0.8), 2)
            
            finance_records.append({
                "finance_id": f_id,
                "date": f"{period_str}-01",
                "department_id": dept_id,
                "expense_category": exp_cat,
                "operating_expense": opex,
                "budget_amount": budget,
                "cash_inflow": inflow,
                "cash_outflow": outflow
            })
    df_fin = pd.DataFrame(finance_records)
    df_fin.to_csv("data/finance.csv", index=False)

    print("9. Generating Employees (500 records) & Workforce Activity...")
    job_roles = {
        "DEP-001": ["Sales Executive", "Account Manager", "Regional Sales Lead", "Enterprise Deal Strategist"],
        "DEP-002": ["Financial Analyst", "Accountant", "Risk Analyst", "Treasury Specialist"],
        "DEP-003": ["Growth Marketer", "SEO Content Lead", "Performance Media Buyer", "Brand Designer"],
        "DEP-004": ["Support Specialist", "Technical Support Engineer", "Escalations Lead", "Customer Success Rep"],
        "DEP-005": ["Talent Acquisition Lead", "HR Operations Partner", "Training Coordinator", "People Ops Lead"],
        "DEP-006": ["Warehouse Supervisor", "Logistics Coordinator", "Supply Chain Planner", "Inventory Controller"]
    }
    
    employees = []
    emp_ids = []
    for e_idx in range(1, 501):
        emp_id = f"EMP-{e_idx:04d}"
        emp_ids.append(emp_id)
        d_id = np.random.choice(["DEP-001", "DEP-002", "DEP-003", "DEP-004", "DEP-005", "DEP-006"], p=[0.28, 0.12, 0.16, 0.18, 0.10, 0.16])
        role = random.choice(job_roles[d_id])
        join_dt = datetime(2021, 1, 1) + timedelta(days=random.randint(0, 1100))
        is_exited = random.random() < 0.08
        exit_dt = (join_dt + timedelta(days=random.randint(180, 500))).strftime("%Y-%m-%d") if is_exited else ""
        emp_status = "Resigned" if is_exited else "Active"
        salary = round(random.choice([45000, 60000, 85000, 115000, 150000, 210000]) * random.uniform(0.9, 1.15), 2)
        
        employees.append({
            "employee_id": emp_id,
            "department_id": d_id,
            "joining_date": join_dt.strftime("%Y-%m-%d"),
            "employment_status": emp_status,
            "exit_date": exit_dt,
            "job_role": role,
            "monthly_salary": salary
        })
    df_emp = pd.DataFrame(employees)
    df_emp.to_csv("data/employees.csv", index=False)
    
    # Workforce activity per active month
    workforce_records = []
    for year in [2024, 2025]:
        for month in range(1, 13):
            period = f"{year}-{month:02d}"
            # Sample 200 random employee evaluations per month to keep dataset crisp
            sample_emps = random.sample(employees, 200)
            for emp in sample_emps:
                sched = 22
                att = random.choice([20, 21, 22, 22, 22, 19, 18])
                perf = round(np.clip(np.random.normal(4.1, 0.5), 1.0, 5.0), 1)
                t_hours = random.choice([2, 4, 8, 12, 16])
                t_comp = random.choice([75.0, 80.0, 90.0, 100.0, 100.0, 60.0])
                sat = round(np.clip(np.random.normal(4.2, 0.4), 1.0, 5.0), 1)
                
                workforce_records.append({
                    "employee_id": emp["employee_id"],
                    "period": period,
                    "scheduled_workdays": sched,
                    "attended_workdays": att,
                    "performance_score": perf,
                    "training_hours": t_hours,
                    "training_completion": t_comp,
                    "satisfaction_score": sat
                })
    df_wf = pd.DataFrame(workforce_records)
    df_wf.to_csv("data/workforce_activity.csv", index=False)

    print("10. Generating Inventory Records (Warehouses & Stock Status)...")
    inventory_records = []
    # Monthly inventory status for each product across warehouses
    for wh in warehouses:
        # Sample 50 products per warehouse per quarter
        for year in [2024, 2025]:
            for month in [3, 6, 9, 12]:
                period = f"{year}-{month:02d}"
                for p in products[:50]:
                    opening = random.randint(100, 1000)
                    rcvd = random.randint(50, 400)
                    sold = random.randint(40, min(opening + rcvd, 800))
                    ret = random.randint(0, int(sold * 0.05))
                    closing = opening + rcvd - sold + ret
                    reorder = random.randint(80, 200)
                    inv_val = round(closing * p["unit_cost"], 2)
                    
                    inventory_records.append({
                        "product_id": p["product_id"],
                        "warehouse_id": wh,
                        "period": period,
                        "opening_stock": opening,
                        "received_stock": rcvd,
                        "sold_units": sold,
                        "returned_units": ret,
                        "closing_stock": closing,
                        "reorder_level": reorder,
                        "inventory_value": inv_val
                    })
    df_inv = pd.DataFrame(inventory_records)
    df_inv.to_csv("data/inventory.csv", index=False)

    print("11. Generating Targets & Milestones (2024-2025)...")
    target_records = []
    t_id_c = 1
    for year in [2024, 2025]:
        for q in [1, 2, 3, 4]:
            period = f"{year}-Q{q}"
            # Sales targets
            target_records.append({
                "target_id": f"TGT-{t_id_c:04d}",
                "period": period,
                "department_id": "DEP-001",
                "region_id": "ALL",
                "metric_name": "Sales Revenue",
                "target_value": round(random.uniform(45000000, 65000000) * (1.2 if year == 2025 else 1.0), 2),
                "measurement_unit": "INR"
            })
            t_id_c += 1
            # Operating profit margin target
            target_records.append({
                "target_id": f"TGT-{t_id_c:04d}",
                "period": period,
                "department_id": "DEP-002",
                "region_id": "ALL",
                "metric_name": "Operating Profit Margin",
                "target_value": 24.5,
                "measurement_unit": "%"
            })
            t_id_c += 1
            # Marketing ROAS target
            target_records.append({
                "target_id": f"TGT-{t_id_c:04d}",
                "period": period,
                "department_id": "DEP-003",
                "region_id": "ALL",
                "metric_name": "Marketing ROAS",
                "target_value": 4.5,
                "measurement_unit": "Ratio"
            })
            t_id_c += 1
            # Operations on-time delivery
            target_records.append({
                "target_id": f"TGT-{t_id_c:04d}",
                "period": period,
                "department_id": "DEP-006",
                "region_id": "ALL",
                "metric_name": "On-Time Delivery Rate",
                "target_value": 94.0,
                "measurement_unit": "%"
            })
            t_id_c += 1
    df_targets = pd.DataFrame(target_records)
    df_targets.to_csv("data/targets.csv", index=False)

    print("12. Generating Local GeoJSON for India Regional Map...")
    # Generating simplified GeoJSON for major Indian States
    # Real polygon approximations around states for local map rendering without external API keys
    india_geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {"name": "Maharashtra", "state_code": "MH", "region_category": "Metro Tier 1", "capital": "Mumbai"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[72.6, 18.9], [74.5, 21.3], [78.2, 21.4], [80.5, 19.5], [77.5, 16.0], [73.5, 15.8], [72.6, 18.9]]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Delhi", "state_code": "DL", "region_category": "Metro Tier 1", "capital": "New Delhi"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[76.8, 28.4], [77.3, 28.9], [77.4, 28.5], [77.1, 28.3], [76.8, 28.4]]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Karnataka", "state_code": "KA", "region_category": "Metro Tier 1", "capital": "Bengaluru"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[74.0, 14.8], [75.5, 17.5], [77.5, 18.0], [77.8, 13.0], [76.5, 11.8], [74.8, 12.8], [74.0, 14.8]]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Telangana", "state_code": "TS", "region_category": "Metro Tier 1", "capital": "Hyderabad"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[77.5, 16.5], [78.5, 19.5], [80.5, 18.5], [81.0, 17.0], [79.0, 15.8], [77.5, 16.5]]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Tamil Nadu", "state_code": "TN", "region_category": "Metro Tier 1", "capital": "Chennai"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[76.5, 11.8], [78.0, 13.5], [80.3, 13.4], [79.8, 10.0], [77.5, 8.1], [76.8, 9.5], [76.5, 11.8]]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Gujarat", "state_code": "GJ", "region_category": "Urban Tier 2", "capital": "Gandhinagar"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[68.5, 23.5], [72.0, 24.5], [74.2, 22.5], [73.0, 20.5], [70.5, 20.8], [69.0, 22.5], [68.5, 23.5]]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "West Bengal", "state_code": "WB", "region_category": "Metro Tier 1", "capital": "Kolkata"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[86.0, 22.0], [87.5, 26.5], [89.0, 26.5], [88.5, 22.0], [87.8, 21.5], [86.0, 22.0]]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Rajasthan", "state_code": "RJ", "region_category": "Urban Tier 2", "capital": "Jaipur"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[70.0, 27.0], [73.5, 30.0], [77.5, 27.8], [76.0, 24.0], [72.5, 24.5], [70.0, 27.0]]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Kerala", "state_code": "KL", "region_category": "Urban Tier 2", "capital": "Thiruvananthapuram"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[75.0, 12.5], [76.5, 11.8], [77.2, 8.5], [76.5, 8.3], [75.8, 10.5], [75.0, 12.5]]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Uttar Pradesh", "state_code": "UP", "region_category": "Urban Tier 2", "capital": "Lucknow"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[77.5, 28.5], [80.5, 30.0], [84.5, 27.5], [83.0, 24.0], [78.5, 25.5], [77.5, 28.5]]]
                }
            },
            {
                "type": "Feature",
                "properties": {"name": "Madhya Pradesh", "state_code": "MP", "region_category": "Emerging Hub", "capital": "Bhopal"},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[[74.5, 24.5], [78.5, 26.5], [82.5, 24.0], [81.5, 21.5], [75.5, 21.5], [74.5, 24.5]]]
                }
            }
        ]
    }
    with open("data/geojson/india_states.json", "w") as f:
        json.dump(india_geojson, f, indent=2)
        
    print("Dataset generation complete! All 12 CSVs + GeoJSON generated successfully.")

if __name__ == "__main__":
    generate_all_datasets()
