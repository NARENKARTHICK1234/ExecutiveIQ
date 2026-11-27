import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Shield, Terminal, Globe, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050509] border-t border-white/5 py-16 px-6 z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center">
              <span className="font-display font-bold text-white text-base">EQ</span>
            </div>
            <span className="font-display font-bold text-lg text-white">ExecutiveIQ</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Executive Business Intelligence & Decision Analytics Platform. Transform raw multi-departmental business data into predictive, actionable intelligence.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <Award size={14} />
            <span>Task 5 Interactive Dashboard Capstone</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">Analytics Portals</h4>
          <ul className="space-y-2.5 text-xs text-text-muted">
            <li><Link to="/dashboard" className="hover:text-brand-cyan transition-colors">Executive Dashboard</Link></li>
            <li><Link to="/sales" className="hover:text-brand-cyan transition-colors">Sales Analytics</Link></li>
            <li><Link to="/finance" className="hover:text-brand-cyan transition-colors">Financial Intelligence</Link></li>
            <li><Link to="/marketing" className="hover:text-brand-cyan transition-colors">Marketing Performance</Link></li>
            <li><Link to="/operations" className="hover:text-brand-cyan transition-colors">Operations & Logistics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">Advanced AI</h4>
          <ul className="space-y-2.5 text-xs text-text-muted">
            <li><Link to="/predictions" className="hover:text-brand-cyan transition-colors">Predictive Forecasting</Link></li>
            <li><Link to="/insights" className="hover:text-brand-cyan transition-colors">Smart Business Insights</Link></li>
            <li><Link to="/regions" className="hover:text-brand-cyan transition-colors">Regional Geospatial Map</Link></li>
            <li><Link to="/datasets" className="hover:text-brand-cyan transition-colors">Dataset Pipeline</Link></li>
            <li><Link to="/reports" className="hover:text-brand-cyan transition-colors">Executive Reports</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">Technology & Stack</h4>
          <ul className="space-y-2.5 text-xs text-text-muted">
            <li>Frontend: React 18, Vite, Tailwind CSS, Three.js</li>
            <li>Backend: FastAPI, Pandas, Scikit-learn, Uvicorn</li>
            <li>Deployment: Single Web Service Docker Architecture</li>
            <li>Datasets: 25,000+ Verified Relational Records</li>
            <li>License: MIT Academic & Portfolio Demonstration</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
        <p>© 2026 ExecutiveIQ. All rights reserved. Realistic synthetic datasets for demonstration.</p>
        <div className="flex items-center gap-6">
          <Link to="/settings" className="hover:text-text-primary transition-colors">System Preferences</Link>
          <a href="/api/docs" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">FastAPI Swagger</a>
          <a href="/api/health" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">Health Status</a>
        </div>
      </div>
    </footer>
  );
};
