import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { apiService } from '../services/api';
import { Globe, TrendingUp, Award, Users, DollarSign, MapPin } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const Regions: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService
      .getRegions()
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Loading Regional Geospatial Intelligence...</p>
      </div>
    );
  }

  const { kpis, state_performance, city_markers } = data;

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-blue flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Geographic & Regional Performance</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Zero-API-key local Indian state boundary choropleth rankings, city customer density, and regional growth.
          </p>
        </div>
      </div>

      {/* Regional KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard title="Active Regional Hubs" value={kpis.total_active_regions} color="#7C3AED" icon={<Globe size={18} />} />
        <KPICard title="Top Revenue Region" value={kpis.highest_revenue_region} color="#22D3EE" icon={<Award size={18} />} />
        <KPICard title="Fastest Growing" value={kpis.fastest_growing_region.slice(0, 15)} color="#10B981" icon={<TrendingUp size={18} />} />
        <KPICard title="Regional Customers" value={kpis.regional_customer_count} color="#2563EB" icon={<Users size={18} />} />
        <KPICard title="Avg Regional Revenue" value={kpis.average_regional_revenue} prefix="₹" color="#D946EF" icon={<DollarSign size={18} />} />
        <KPICard title="Target Run Rate" value={kpis.regional_target_achievement} suffix="%" change={1.4} color="#F59E0B" icon={<Award size={18} />} />
      </div>

      {/* Row 2: Interactive Regional SVG Choropleth Map & State Ranking Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="India Regional Hub Choropleth & Density Map" subtitle="Clickable regional clusters across North, South, West, and East corridors" badge="Interactive Map">
          <div className="h-full flex flex-col items-center justify-center p-4 relative">
            <svg viewBox="0 0 500 500" className="w-full h-full max-h-[300px]">
              {/* Abstract futuristic stylized India vector paths */}
              <path
                d="M 230 60 L 290 90 L 320 150 L 360 210 L 320 280 L 260 420 L 230 460 L 210 420 L 160 280 L 140 220 L 160 170 L 190 120 Z"
                fill="rgba(124, 58, 237, 0.15)"
                stroke="#7C3AED"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              {city_markers.map((c: any, idx: number) => {
                // Map approximate lat/long (lat 8-32, long 68-90) into svg (500x500)
                const sx = ((c.longitude - 68) / (90 - 68)) * 340 + 70;
                const sy = (1 - (c.latitude - 8) / (32 - 8)) * 360 + 60;
                return (
                  <g key={idx} className="group cursor-pointer">
                    <circle cx={sx} cy={sy} r="6" fill="#22D3EE" className="animate-pulse" />
                    <circle cx={sx} cy={sy} r="12" fill="rgba(34, 211, 238, 0.2)" />
                    <text x={sx + 10} y={sy + 4} fill="#F8FAFC" fontSize="10" fontWeight="600" className="drop-shadow">
                      {c.city}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="flex items-center gap-6 text-[11px] text-text-muted mt-2">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" /> Metro Tier 1</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-brand-purple" /> Urban Tier 2</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Emerging Hub</span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="State Revenue & Profit Realization" subtitle="Top performing state commercial jurisdictions" badge="State Ranking">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={state_performance.slice(0, 7)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="state" stroke="#64748B" fontSize={10} interval={0} />
              <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 100000).toFixed(0)}L`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#22D3EE50', borderRadius: '8px' }} formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#22D3EE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Regional Performance Table */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-1">State Financial Scorecard</h3>
        <p className="text-xs text-text-muted mb-4">Complete breakdown by commercial territory and customer concentration</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-text-muted">
                <th className="pb-3 font-semibold">State</th>
                <th className="pb-3 font-semibold">Orders Fulfilled</th>
                <th className="pb-3 font-semibold">Active Customers</th>
                <th className="pb-3 font-semibold text-right">Profit Margin %</th>
                <th className="pb-3 font-semibold text-right">Recognized Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {state_performance.map((st: any, idx: number) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-semibold text-white flex items-center gap-2">
                    <MapPin size={13} className="text-brand-cyan" />
                    <span>{st.state}</span>
                  </td>
                  <td className="py-3">{st.orders.toLocaleString()}</td>
                  <td className="py-3">{st.customers.toLocaleString()}</td>
                  <td className="py-3 text-right font-bold text-emerald-400">{st.margin}%</td>
                  <td className="py-3 text-right font-bold font-display text-white">₹{st.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
