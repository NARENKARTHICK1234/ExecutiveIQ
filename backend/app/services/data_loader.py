"""
ExecutiveIQ Data Loader Service
Efficiently loads, caches, and provides access to business intelligence datasets.
Supports custom dataset overrides and data quality evaluation.
"""

import os
import json
import pandas as pd
import numpy as np
from typing import Dict, Any, Optional

DATA_DIR = os.environ.get("DATA_DIR", "data")

class DataLoader:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DataLoader, cls).__new__(cls)
            cls._instance._datasets = {}
            cls._instance._custom_dataset = None
            cls._instance._load_default_datasets()
        return cls._instance
        
    def _load_default_datasets(self):
        """Loads all standard datasets from data directory into memory cache."""
        self._datasets = {
            "transactions": pd.read_csv(os.path.join(DATA_DIR, "sales_transactions.csv")),
            "customers": pd.read_csv(os.path.join(DATA_DIR, "customers.csv")),
            "products": pd.read_csv(os.path.join(DATA_DIR, "products.csv")),
            "finance": pd.read_csv(os.path.join(DATA_DIR, "finance.csv")),
            "marketing": pd.read_csv(os.path.join(DATA_DIR, "marketing.csv")),
            "employees": pd.read_csv(os.path.join(DATA_DIR, "employees.csv")),
            "workforce": pd.read_csv(os.path.join(DATA_DIR, "workforce_activity.csv")),
            "operations": pd.read_csv(os.path.join(DATA_DIR, "operations.csv")),
            "inventory": pd.read_csv(os.path.join(DATA_DIR, "inventory.csv")),
            "regions": pd.read_csv(os.path.join(DATA_DIR, "regions.csv")),
            "departments": pd.read_csv(os.path.join(DATA_DIR, "departments.csv")),
            "targets": pd.read_csv(os.path.join(DATA_DIR, "targets.csv")),
        }
        # Precompute datetime columns for ultra-fast filtering
        self._datasets["transactions"]["dt"] = pd.to_datetime(self._datasets["transactions"]["transaction_date"])
        self._datasets["finance"]["dt"] = pd.to_datetime(self._datasets["finance"]["date"])
        self._datasets["marketing"]["dt"] = pd.to_datetime(self._datasets["marketing"]["date"])
        self._datasets["operations"]["dt"] = pd.to_datetime(self._datasets["operations"]["order_date"])

    def get_dataset(self, name: str) -> pd.DataFrame:
        if name in self._datasets:
            return self._datasets[name].copy()
        raise ValueError(f"Unknown dataset: {name}")

    def reset_to_sample(self):
        """Resets all cached datasets to default sample files."""
        self._custom_dataset = None
        self._load_default_datasets()

    def set_custom_transactions(self, df: pd.DataFrame):
        """Allows user to override or append transaction dataset."""
        df["dt"] = pd.to_datetime(df["transaction_date"])
        self._custom_dataset = df
        self._datasets["transactions"] = df

    def filter_transactions(
        self,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None,
        department: Optional[str] = None,
        region: Optional[str] = None,
        category: Optional[str] = None,
        channel: Optional[str] = None,
        segment: Optional[str] = None
    ) -> pd.DataFrame:
        df = self._datasets["transactions"].copy()
        
        if start_date:
            df = df[df["dt"] >= pd.to_datetime(start_date)]
        if end_date:
            df = df[df["dt"] <= pd.to_datetime(end_date)]
        if region and region != "ALL":
            # Can be region_id or state name
            reg_df = self._datasets["regions"]
            if region.startswith("REG-"):
                df = df[df["region_id"] == region]
            else:
                matched_regs = reg_df[reg_df["state"].str.lower() == region.lower()]["region_id"]
                if len(matched_regs) > 0:
                    df = df[df["region_id"].isin(matched_regs)]
        if channel and channel != "ALL":
            df = df[df["sales_channel"] == channel]
        if category and category != "ALL":
            prod_df = self._datasets["products"]
            matching_prods = prod_df[prod_df["category"] == category]["product_id"]
            df = df[df["product_id"].isin(matching_prods)]
        if segment and segment != "ALL":
            cust_df = self._datasets["customers"]
            matching_custs = cust_df[cust_df["customer_segment"] == segment]["customer_id"]
            df = df[df["customer_id"].isin(matching_custs)]
            
        return df

    def get_data_quality_report(self) -> Dict[str, Any]:
        """Calculates completeness, missing values, duplicates, and data health scores."""
        summary = {}
        total_rows = 0
        total_missing = 0
        total_cells = 0
        
        for name, df in self._datasets.items():
            if name == "geojson":
                continue
            rows = len(df)
            cols = len(df.columns)
            cells = rows * cols
            missing = int(df.isnull().sum().sum())
            dups = int(df.duplicated().sum())
            
            total_rows += rows
            total_cells += cells
            total_missing += missing
            
            summary[name] = {
                "rows": rows,
                "columns": cols,
                "missing_values": missing,
                "duplicates": dups,
                "completeness_pct": round(((cells - missing) / max(1, cells)) * 100, 2),
                "column_types": {col: str(dtype) for col, dtype in df.dtypes.items()}
            }
            
        overall_health = round(((total_cells - total_missing) / max(1, total_cells)) * 100, 1)
        return {
            "overall_health_score": overall_health,
            "total_datasets": len(summary),
            "total_records": total_rows,
            "total_missing_cells": total_missing,
            "datasets": summary
        }

data_loader = DataLoader()
