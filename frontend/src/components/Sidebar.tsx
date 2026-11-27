import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Megaphone,
  Users,
  Briefcase,
  Layers,
  Package,
  Globe2,
  Sparkles,
  Lightbulb,
  Database,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navSections = [
    {
      group: 'OVERVIEW',
      items: [
        { name: 'Executive Dashboard', path: '/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'DEPARTMENTAL ANALYTICS',
      items: [
        { name: 'Sales Analytics', path: '/sales', icon: TrendingUp },
        { name: 'Financial Analytics', path: '/finance', icon: DollarSign },
        { name: 'Marketing Analytics', path: '/marketing', icon: Megaphone },
        { name: 'Customer Analytics', path: '/customers', icon: Users },
        { name: 'HR Analytics', path: '/hr', icon: Briefcase },
        { name: 'Operations Analytics', path: '/operations', icon: Layers },
      ],
    },
    {
      group: 'BUSINESS INTELLIGENCE',
      items: [
        { name: 'Product Analytics', path: '/products', icon: Package },
        { name: 'Regional Analytics', path: '/regions', icon: Globe2 },
        { name: 'Predictive Analytics', path: '/predictions', icon: Sparkles },
        { name: 'Smart Business Insights', path: '/insights', icon: Lightbulb },
      ],
    },
    {
      group: 'DATA MANAGEMENT',
      items: [
        { name: 'Dataset Management', path: '/datasets', icon: Database },
        { name: 'Reports and Export', path: '/reports', icon: FileSpreadsheet },
      ],
    },
    {
      group: 'PREFERENCES',
      items: [
        { name: 'Settings', path: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#080B16]/95 backdrop-blur-xl border-r border-white/5 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center shadow-glow-purple">
            <span className="font-display font-extrabold text-white text-xl">EQ</span>
          </div>
          {!collapsed && (
            <div>
              <span className="font-display font-bold text-lg text-text-primary tracking-tight">ExecutiveIQ</span>
              <p className="text-[10px] text-brand-cyan font-semibold uppercase tracking-wider">Decision AI</p>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navSections.map((sec, idx) => (
          <div key={idx}>
            {!collapsed && (
              <p className="px-3 text-[10px] font-bold text-text-muted/60 tracking-wider uppercase mb-2">
                {sec.group}
              </p>
            )}
            <div className="space-y-1">
              {sec.items.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-purple/25 to-brand-cyan/10 text-white border border-brand-purple/40 shadow-glow-purple font-semibold'
                          : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                      } ${collapsed ? 'justify-center' : ''}`
                    }
                    title={collapsed ? item.name : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          className={`transition-colors ${
                            isActive ? 'text-brand-cyan' : 'text-text-muted group-hover:text-text-primary'
                          }`}
                        />
                        {!collapsed && <span className="truncate">{item.name}</span>}
                        {isActive && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-brand-cyan rounded-l-full shadow-glow-cyan" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Home Nav Link */}
      <div className="p-3 border-t border-white/5">
        <Link
          to="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-text-muted hover:text-white hover:bg-white/5 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Back to Landing Page"
        >
          <Home size={18} />
          {!collapsed && <span>Back to Home</span>}
        </Link>
      </div>
    </aside>
  );
};
