import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// All 15 Independent Route Components
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Sales } from './pages/Sales';
import { Finance } from './pages/Finance';
import { Marketing } from './pages/Marketing';
import { Customers } from './pages/Customers';
import { HR } from './pages/HR';
import { Operations } from './pages/Operations';
import { Products } from './pages/Products';
import { Regions } from './pages/Regions';
import { Predictions } from './pages/Predictions';
import { Insights } from './pages/Insights';
import { Datasets } from './pages/Datasets';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Route 1: Public Landing Page */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Routes 2-15: Executive Dashboard & Analytics Modules */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/hr" element={<HR />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/products" element={<Products />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
