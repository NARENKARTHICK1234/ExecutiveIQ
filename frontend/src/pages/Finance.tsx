import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { useFilters } from '../context/FilterContext';
import { apiService } from '../services/api';
import { DollarSign, Percent, TrendingDown, ArrowDownRight, Wallet, PieChart as PieIcon } from 'lucide-react';
import {
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

export const Finance: React.FC = () => {
  const { queryString } = useFilters();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService
      .getFinance(queryString)
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [queryString]);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Loading Financial Intelligence Engine...</p>
      </div>
    );
  }

  const { kpis, expense_breakdown, monthly_cash_flows, waterfall_chart } = data;
  const PIE_COLORS = ['#7C3AED', '#22D3EE', '#A855F7', '#2563EB', '#D946EF', '#10B981'];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-emerald flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Financial & Profitability Analytics</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Strict separation of Revenue, Cost of Goods Sold (COGS), Gross Profit, Operating Expenses, and Net Operating Margin.
          </p>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Total Sales Revenue" value={kpis.total_revenue} prefix="₹" change={21.4} color="#7C3AED" icon={<DollarSign size={18} />} />
        <KPICard title="Cost of Goods Sold (COGS)" value={kpis.cogs} prefix="₹" change={19.1} color="#2563EB" icon={<ArrowDownRight size={18} />} />
        <KPICard title="Gross Profit" value={kpis.gross_profit} prefix="₹" change={24.2} color="#10B981" icon={<DollarSign size={18} />} />
        <KPICard title="Operating Expenses (Opex)" value={kpis.operating_expenses} prefix="₹" change={-1.5} color="#D946EF" icon={<Percent size={18} />} />
        <KPICard title="Operating Profit" value={kpis.operating_profit} prefix="₹" change={27.4} color="#22D3EE" icon={<Wallet size={18} />} />
      </div>

      {/* Row 2: Waterfall Chart & Expense Breakdown Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Profit & Loss (P&L) Waterfall Breakdown" subtitle="Step-down reconciliation from Gross Sales to Operating Profit" badge="P&L Waterfall" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfall_chart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="step" stroke="#64748B" fontSize={10} interval={0} />
              <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(Math.abs(val) / 100000).toFixed(0)}L`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B1020', borderColor: '#ffffff20', borderRadius: '8px' }}
                formatter={(val: number) => [`₹${Math.abs(val).toLocaleString()}`, 'Amount']}
              />
              <Bar
                dataKey="amount"
                fill="#7C3AED"
                radius={[4, 4, 0, 0]}
              >
                {waterfall_chart.map((entry: any, index: number) => {
                  const color = entry.type === 'positive' ? '#7C3AED' : entry.type === 'negative' ? '#F43F5E' : '#10B981';
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Operating Expense Category Mix" subtitle="Proportional distribution of operating costs" badge="Opex Mix" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={expense_breakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="amount" nameKey="category">
                {expense_breakdown.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#080B16" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#ffffff20', borderRadius: '8px' }} formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Amount']} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Monthly Cash Flows (Inflow vs Outflow) */}
      <ChartCard title="Monthly Cash Inflow vs. Cash Outflow" subtitle="Operating liquidity trajectory over the 24-month observation window" badge="Cash Flow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthly_cash_flows}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
            <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 100000).toFixed(0)}L`} />
            <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#10B98150', borderRadius: '8px' }} formatter={(val: number) => [`₹${val.toLocaleString()}`, '']} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar dataKey="inflow" name="Cash Inflow" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="outflow" name="Cash Outflow" fill="#F43F5E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};
