import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { useFilters } from '../context/FilterContext';
import { apiService } from '../services/api';
import { DollarSign, ShoppingBag, Layers, TrendingUp, Award, Download } from 'lucide-react';
import {
  LineChart,
  Line,
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

export const Sales: React.FC = () => {
  const { queryString } = useFilters();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService
      .getSales(queryString)
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [queryString]);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Loading Sales Analytics...</p>
      </div>
    );
  }

  const { kpis, monthly_trend, sales_by_region, sales_by_category, top_selling_products, sales_channels } = data;
  const PIE_COLORS = ['#7C3AED', '#22D3EE', '#A855F7', '#2563EB'];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-cyan flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Sales & Commercial Intelligence</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Deep drill-down into revenue streams, channel volume distribution, order velocities, and SKU performance.
          </p>
        </div>
        <button
          onClick={() => window.open('/api/datasets/download?name=transactions', '_blank')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-text-primary border border-white/10 transition-all"
        >
          <Download size={14} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Sales KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard title="Total Sales Revenue" value={kpis.total_sales_revenue} prefix="₹" change={kpis.sales_growth} color="#7C3AED" icon={<DollarSign size={18} />} />
        <KPICard title="Total Orders" value={kpis.total_orders} change={18.4} color="#22D3EE" icon={<ShoppingBag size={18} />} />
        <KPICard title="Units Sold" value={kpis.units_sold} change={21.0} color="#2563EB" icon={<Layers size={18} />} />
        <KPICard title="Average Order Value" value={kpis.average_order_value} prefix="₹" change={4.2} color="#10B981" icon={<TrendingUp size={18} />} />
        <KPICard title="Sales Growth Rate" value={kpis.sales_growth} suffix="%" change={kpis.sales_growth} color="#D946EF" icon={<TrendingUp size={18} />} />
        <KPICard title="Target Realization" value={kpis.target_achievement} suffix="%" change={1.8} color="#F59E0B" icon={<Award size={18} />} />
      </div>

      {/* Row 2: Monthly Sales Trend & Channel Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Monthly Sales Revenue Trajectory" subtitle="Historical recognized monthly sales across all active accounts" badge="Sales Trend" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 100000).toFixed(0)}L`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#7C3AED50', borderRadius: '8px' }} formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Revenue']} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="revenue" name="Sales Revenue" stroke="#7C3AED" strokeWidth={3} dot={{ fill: '#7C3AED', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sales Channel Volume" subtitle="Revenue split by commercial acquisition channels" badge="Channels" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={sales_channels} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="revenue" nameKey="channel">
                {sales_channels.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#080B16" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#ffffff20', borderRadius: '8px' }} formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Revenue']} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Sales by Region & Sales by Product Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Sales by Indian State" subtitle="Top state geographic revenue comparison" badge="Regional">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sales_by_region.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="state" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 100000).toFixed(0)}L`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#22D3EE50', borderRadius: '8px' }} formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#22D3EE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sales by Product Category" subtitle="Hardware and software product line demand" badge="Category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sales_by_category} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis type="number" stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 100000).toFixed(0)}L`} />
              <YAxis type="category" dataKey="category" stroke="#64748B" fontSize={11} width={110} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#A855F750', borderRadius: '8px' }} formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#A855F7" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top 10 Selling Products Table */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-1">Top 10 High-Velocity Products</h3>
        <p className="text-xs text-text-muted mb-4">Ranked by recognized sales volume and cumulative order counts</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-text-muted">
                <th className="pb-3 font-semibold">SKU ID</th>
                <th className="pb-3 font-semibold">Product Name</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Units Sold</th>
                <th className="pb-3 font-semibold text-right">Recognized Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {top_selling_products.map((prod: any, idx: number) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-mono text-brand-cyan">{prod.product_id}</td>
                  <td className="py-3 font-medium text-white">{prod.product_name}</td>
                  <td className="py-3 text-text-secondary">{prod.category}</td>
                  <td className="py-3 font-semibold">{prod.units_sold.toLocaleString()}</td>
                  <td className="py-3 text-right font-bold font-display text-emerald-400">₹{prod.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
