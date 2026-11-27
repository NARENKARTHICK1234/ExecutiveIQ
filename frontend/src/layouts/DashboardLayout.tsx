import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { PageBackground, BackgroundVariant } from '../components/backgrounds/PageBackground';

export const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Extract page variant for background visualization
  const routeSegment = location.pathname.replace('/', '') as BackgroundVariant;
  const activeVariant: BackgroundVariant = routeSegment || 'dashboard';

  return (
    <div className="min-h-screen bg-[#050509] text-text-primary relative selection:bg-brand-purple selection:text-white overflow-x-hidden">
      {/* Dynamic Background Visualization matched strictly to current route */}
      <PageBackground variant={activeVariant} />

      {/* Collapsible Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Sticky Top Header */}
      <Header collapsed={collapsed} />

      {/* Main Page Content Area */}
      <main
        className={`transition-all duration-300 min-h-[calc(100vh-64px)] p-6 relative z-10 ${
          collapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
