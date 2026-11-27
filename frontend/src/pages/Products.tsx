import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { apiService } from '../services/api';
import { Package, Award, DollarSign, Percent, AlertOctagon, Layers } from 'lucide-react';
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

export const Products: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService
      .getProducts()
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Loading Product Intelligence...</p>
      </div>
    );
  }

  const { kpis, category_performance, abc_classification, top_products } = data;

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-purple flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Product & SKU Decision Analytics</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Category gross margin yields, ABC inventory prioritization, and high-velocity SKU rankings.
          </p>
        </div>
      </div>

      {/* Product KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard title="Total Products" value={kpis.total_products} color="#7C3AED" icon={<Package size={18} />} />
        <KPICard title="Active SKUs" value={kpis.active_products} color="#22D3EE" icon={<Package size={18} />} />
        <KPICard title="Total Product Revenue" value={kpis.total_product_revenue} prefix="₹" change={22.4} color="#10B981" icon={<DollarSign size={18} />} />
        <KPICard title="Avg Product Margin" value={kpis.average_product_margin} suffix="%" change={1.8} color="#A855F7" icon={<Percent size={18} />} />
        <KPICard title="Best Selling SKU" value={kpis.best_selling_product.slice(0, 15)} color="#2563EB" icon={<Award size={18} />} />
        <KPICard title="Low-Stock Alerts" value={kpis.low_stock_products} color="#F59E0B" icon={<AlertOctagon size={18} />} />
      </div>

      {/* Row 2: Category Margin & ABC Inventory Classification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Category Revenue & Profit Margins" subtitle="Gross profit contribution across product lines" badge="Category Margin">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={category_performance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="category" stroke="#64748B" fontSize={10} interval={0} />
              <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 100000).toFixed(0)}L`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#7C3AED50', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Gross Profit" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ABC Inventory Classification" subtitle="Pareto 80/20 inventory value concentration" badge="ABC Analysis">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={abc_classification} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis type="number" stroke="#64748B" fontSize={11} tickFormatter={val => `${val}%`} />
              <YAxis type="category" dataKey="tier" stroke="#64748B" fontSize={10} width={140} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#ffffff20', borderRadius: '8px' }} />
              <Bar dataKey="revenue_share" name="Revenue Share %" fill="#22D3EE" radius={[0, 4, 4, 0]}>
                {abc_classification.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top Products Table */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-1">Top Margin Products</h3>
        <p className="text-xs text-text-muted mb-4">Detailed margin performance across best-performing commercial SKUs</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-text-muted">
                <th className="pb-3 font-semibold">SKU</th>
                <th className="pb-3 font-semibold">Product Name</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold text-right">Units Sold</th>
                <th className="pb-3 font-semibold text-right">Gross Margin %</th>
                <th className="pb-3 font-semibold text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {top_products.map((p: any, idx: number) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-mono text-brand-cyan">{p.id}</td>
                  <td className="py-3 font-medium text-white">{p.name}</td>
                  <td className="py-3 text-text-secondary">{p.category}</td>
                  <td className="py-3 text-right font-semibold">{p.units.toLocaleString()}</td>
                  <td className="py-3 text-right font-bold text-emerald-400">{p.margin}%</td>
                  <td className="py-3 text-right font-bold font-display text-white">₹{p.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
