import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useFilters } from '../context/FilterContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Calendar, Filter, Sun, Moon, Database, Settings as SettingsIcon } from 'lucide-react';

interface HeaderProps {
  collapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ collapsed }) => {
  const location = useLocation();
  const { filters, setFilter, resetFilters } = useFilters();
  const { theme, setTheme } = useTheme();

  // Route title formatting
  const pathName = location.pathname.replace('/', '') || 'dashboard';
  const pageTitle = pathName.charAt(0).toUpperCase() + pathName.slice(1) + ' Analytics';

  return (
    <header
      className={`sticky top-0 z-30 h-16 bg-[#080B16]/80 backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between transition-all duration-300 ${
        collapsed ? 'ml-20' : 'ml-64'
      }`}
    >
      {/* Breadcrumbs & Title */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Link to="/dashboard" className="hover:text-text-primary transition-colors">ExecutiveIQ</Link>
            <span>/</span>
            <span className="text-brand-cyan font-medium capitalize">{pathName}</span>
          </div>
          <h1 className="text-base font-bold font-display text-text-primary tracking-tight">
            {pathName === 'dashboard' ? 'Executive Dashboard' : pageTitle}
          </h1>
        </div>
      </div>

      {/* Global Interactive Controls */}
      <div className="flex items-center gap-3">
        {/* Date Filter */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
          <Calendar size={14} className="text-brand-purple" />
          <select
            value={filters.startDate}
            onChange={e => setFilter('startDate', e.target.value)}
            className="bg-transparent text-text-primary focus:outline-none cursor-pointer"
          >
            <option value="2024-01-01" className="bg-[#080B16]">2024 - 2025 Full (24M)</option>
            <option value="2025-01-01" className="bg-[#080B16]">2025 Current Year (12M)</option>
            <option value="2025-07-01" className="bg-[#080B16]">Last 6 Months (H2 2025)</option>
            <option value="2025-10-01" className="bg-[#080B16]">Last Quarter (Q4 2025)</option>
          </select>
        </div>

        {/* Region Filter */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
          <Filter size={14} className="text-brand-cyan" />
          <select
            value={filters.region}
            onChange={e => setFilter('region', e.target.value)}
            className="bg-transparent text-text-primary focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-[#080B16]">All Regions (India)</option>
            <option value="Maharashtra" className="bg-[#080B16]">Maharashtra (Mumbai/Pune)</option>
            <option value="Delhi" className="bg-[#080B16]">Delhi NCR</option>
            <option value="Karnataka" className="bg-[#080B16]">Karnataka (Bengaluru)</option>
            <option value="Telangana" className="bg-[#080B16]">Telangana (Hyderabad)</option>
            <option value="Tamil Nadu" className="bg-[#080B16]">Tamil Nadu (Chennai)</option>
            <option value="Gujarat" className="bg-[#080B16]">Gujarat (Ahmedabad)</option>
            <option value="West Bengal" className="bg-[#080B16]">West Bengal (Kolkata)</option>
          </select>
        </div>

        {/* Dataset Pill */}
        <Link
          to="/datasets"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-purple/15 text-brand-violet border border-brand-purple/30 text-xs font-semibold hover:bg-brand-purple/25 transition-all"
          title="Active Dataset"
        >
          <Database size={13} />
          <span className="hidden sm:inline">Synthetic 25K</span>
        </Link>

        {/* Theme Switcher */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Settings button */}
        <Link
          to="/settings"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
          title="Settings"
        >
          <SettingsIcon size={16} />
        </Link>
      </div>
    </header>
  );
};
