import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { useFilters } from '../context/FilterContext';
import { apiService } from '../services/api';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Percent,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { queryString } = useFilters();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService
      .getOverview(queryString)
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [queryString]);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Loading Executive Intelligence Engine...</p>
      </div>
    );
  }

  const { kpis, monthly_performance, category_distribution, department_performance, sparklines } = data;
  const PIE_COLORS = ['#7C3AED', '#22D3EE', '#A855F7', '#2563EB', '#D946EF', '#10B981'];

  return (
    <div className="space-y-6">
      {/* Page Header / Priority Notice */}
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-purple flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live BI Engine
            </span>
            <span className="text-xs text-text-muted">Consolidated Fiscal Period: 2024 - 2025</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-white mt-1">Enterprise Executive Overview</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Holistic cross-functional metrics covering revenue, margins, customer retention, and department budget adherence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Sales Target Run-Rate</p>
            <p className="text-lg font-bold font-display text-brand-cyan">{kpis.target_achievement}% Achieved</p>
          </div>
        </div>
      </div>

      {/* 8 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Recognized Revenue"
          value={kpis.total_revenue}
          prefix="₹"
          change={kpis.revenue_growth}
          subtext="vs previous fiscal cycle"
          sparklineData={sparklines?.revenue}
          color="#7C3AED"
          icon={<DollarSign size={20} />}
        />
        <KPICard
          title="Total Operating Expenses"
          value={kpis.total_expenses}
          prefix="₹"
          change={-4.8}
          subtext="Budget variance -1.2%"
          color="#A855F7"
          icon={<Percent size={20} />}
        />
        <KPICard
          title="Operating Profit"
          value={kpis.operating_profit}
          prefix="₹"
          change={18.2}
          subtext="Pre-tax recognized profit"
          sparklineData={sparklines?.profit}
          color="#10B981"
          icon={<TrendingUp size={20} />}
        />
        <KPICard
          title="Operating Profit Margin"
          value={kpis.profit_margin}
          suffix="%"
          change={2.4}
          subtext="Target benchmark: 24%"
          color="#22D3EE"
          icon={<Percent size={20} />}
        />
        <KPICard
          title="Active Customers"
          value={kpis.total_customers}
          change={14.1}
          subtext="Across 15 Indian metro hubs"
          color="#2563EB"
          icon={<Users size={20} />}
        />
        <KPICard
          title="Total Orders Fulfilled"
          value={kpis.total_orders}
          change={22.5}
          subtext="96.2% on-time dispatch"
          sparklineData={sparklines?.orders}
          color="#D946EF"
          icon={<ShoppingCart size={20} />}
        />
        <KPICard
          title="Annual Revenue Growth"
          value={kpis.revenue_growth}
          suffix="%"
          change={kpis.revenue_growth}
          subtext="YoY expansion rate"
          color="#F59E0B"
          icon={<ArrowUpRight size={20} />}
        />
        <KPICard
          title="Customer Retention Rate"
          value={kpis.retention_rate}
          suffix="%"
          change={3.2}
          subtext="Past 180-day activity window"
          color="#10B981"
          icon={<ShieldCheck size={20} />}
        />
      </div>

      {/* Row 2: Revenue vs Expenses & Monthly Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Revenue vs. Total Expenses" subtitle="Aggregated monthly Recognized Sales vs. COGS + Operating Expenses" badge="Trend Analysis">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly_performance}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 100000).toFixed(0)}L`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B1020', borderColor: '#7C3AED50', borderRadius: '8px' }}
                formatter={(val: number) => [`₹${val.toLocaleString()}`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
              <Area type="monotone" dataKey="revenue" name="Sales Revenue" stroke="#7C3AED" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" name="Total Expenses" stroke="#22D3EE" fillOpacity={1} fill="url(#colorExp)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Operating Profit by Month" subtitle="Net operational margin trajectory after all departmental outlays" badge="Profitability">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly_performance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 100000).toFixed(0)}L`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B1020', borderColor: '#10B98150', borderRadius: '8px' }}
                formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Operating Profit']}
              />
              <Bar dataKey="operating_profit" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Product Category Donut & Department Budget Adherence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Revenue by Product Category" subtitle="Contribution mix across product segments" badge="Catalog Mix" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={category_distribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="revenue"
                nameKey="category"
              >
                {category_distribution.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#080B16" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0B1020', borderColor: '#ffffff20', borderRadius: '8px' }}
                formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Revenue']}
              />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Departmental Budget vs. Actual Expenditure" subtitle="Annual approved budget vs calculated operating spend" badge="Fiscal Controls" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={department_performance} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis type="number" stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 100000).toFixed(0)}L`} />
              <YAxis type="category" dataKey="department" stroke="#64748B" fontSize={11} width={90} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B1020', borderColor: '#ffffff20', borderRadius: '8px' }}
                formatter={(val: number) => [`₹${val.toLocaleString()}`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="budget" name="Approved Budget" fill="#2563EB" radius={[0, 4, 4, 0]} />
              <Bar dataKey="actual_spend" name="Actual Spend" fill="#D946EF" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
