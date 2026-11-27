import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { apiService } from '../services/api';
import { Users, UserCheck, UserPlus, RefreshCw, HeartHandshake, ShieldAlert } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const Customers: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService
      .getCustomers()
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Loading Customer Intelligence...</p>
      </div>
    );
  }

  const { kpis, segment_distribution, rfm_segmentation, cohort_retention } = data;
  const PIE_COLORS = ['#7C3AED', '#22D3EE', '#A855F7', '#2563EB', '#D946EF'];

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-purple flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Customer Analytics & Retention</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            RFM behavioural segmentation, active vs. dormant client distribution, and longitudinal cohort retention.
          </p>
        </div>
      </div>

      {/* Customer KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard title="Total Customer Base" value={kpis.total_customers} color="#7C3AED" icon={<Users size={18} />} />
        <KPICard title="Active Customers" value={kpis.active_customers} change={8.4} color="#22D3EE" icon={<UserCheck size={18} />} />
        <KPICard title="New Customers" value={kpis.new_customers} change={12.1} color="#2563EB" icon={<UserPlus size={18} />} />
        <KPICard title="Returning Clients" value={kpis.returning_customers} change={16.5} color="#10B981" icon={<RefreshCw size={18} />} />
        <KPICard title="Retention Rate" value={kpis.retention_rate} suffix="%" change={3.2} color="#D946EF" icon={<HeartHandshake size={18} />} />
        <KPICard title="Inactivity Churn Rate" value={kpis.churn_rate} suffix="%" change={-2.1} color="#F59E0B" icon={<ShieldAlert size={18} />} />
      </div>

      {/* Row 2: Customer Segments Donut & RFM Segmentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Customer Segment Distribution" subtitle="Enterprise, SMB, and Mid-Market account shares" badge="Segments">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={segment_distribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="count" nameKey="segment">
                {segment_distribution.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#080B16" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#ffffff20', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="RFM Behavioral Segmentation" subtitle="Classified by Recency, Frequency, and Monetary value" badge="RFM Clusters">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rfm_segmentation} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis type="number" stroke="#64748B" fontSize={11} />
              <YAxis type="category" dataKey="group" stroke="#64748B" fontSize={11} width={130} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#ffffff20', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#7C3AED" radius={[0, 4, 4, 0]}>
                {rfm_segmentation.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Cohort Retention Matrix */}
      <div className="glass-panel rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-1">Quarterly Cohort Retention Matrix</h3>
        <p className="text-xs text-text-muted mb-4">Percentage of initial customer cohort remaining active over 3-month rolling windows</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-text-muted">
                <th className="pb-3 font-semibold">Cohort</th>
                <th className="pb-3 font-semibold text-center">Month 0</th>
                <th className="pb-3 font-semibold text-center">Month 3</th>
                <th className="pb-3 font-semibold text-center">Month 6</th>
                <th className="pb-3 font-semibold text-center">Month 9</th>
                <th className="pb-3 font-semibold text-center">Month 12</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {cohort_retention.map((row: any, idx: number) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-sans font-semibold text-white">{row.cohort}</td>
                  <td className="py-3 text-center text-emerald-400 font-bold bg-emerald-500/10 rounded">{row.m0}%</td>
                  <td className="py-3 text-center text-brand-cyan">{row.m3 ? `${row.m3}%` : '—'}</td>
                  <td className="py-3 text-center text-brand-violet">{row.m6 ? `${row.m6}%` : '—'}</td>
                  <td className="py-3 text-center text-brand-purple">{row.m9 ? `${row.m9}%` : '—'}</td>
                  <td className="py-3 text-center text-text-secondary">{row.m12 ? `${row.m12}%` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
