import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { apiService } from '../services/api';
import { Megaphone, MousePointerClick, UserPlus, DollarSign, Target, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const Marketing: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService
      .getMarketing()
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Loading Marketing Analytics...</p>
      </div>
    );
  }

  const { kpis, conversion_funnel, channel_performance, campaign_trend } = data;

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-magenta flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Marketing & Growth Analytics</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Omnichannel performance, ROAS, conversion funnels, and customer acquisition efficiency.
          </p>
        </div>
      </div>

      {/* Marketing KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard title="Marketing Spend" value={kpis.marketing_spend} prefix="₹" change={12.4} color="#D946EF" icon={<DollarSign size={18} />} />
        <KPICard title="Total Impressions" value={kpis.impressions} change={18.2} color="#7C3AED" icon={<Megaphone size={18} />} />
        <KPICard title="Total Clicks" value={kpis.clicks} change={15.0} color="#22D3EE" icon={<MousePointerClick size={18} />} />
        <KPICard title="Conversions" value={kpis.conversions} change={22.8} color="#10B981" icon={<Target size={18} />} />
        <KPICard title="Customer Acquisition Cost" value={kpis.customer_acquisition_cost} prefix="₹" change={-6.2} color="#F59E0B" icon={<UserPlus size={18} />} />
        <KPICard title="Return on Ad Spend (ROAS)" value={kpis.return_on_ad_spend} suffix="x" change={8.4} color="#2563EB" icon={<TrendingUp size={18} />} />
      </div>

      {/* Row 2: Conversion Funnel & Channel ROAS Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Marketing Conversion Funnel" subtitle="Audience progression from impression to paying client" badge="Funnel Analysis">
          <div className="h-full flex flex-col justify-center gap-3 py-4">
            {conversion_funnel.map((stage: any, idx: number) => {
              const widths = ['w-full', 'w-[75%]', 'w-[50%]', 'w-[32%]'];
              const bgColors = ['bg-brand-purple/40', 'bg-brand-blue/50', 'bg-brand-cyan/60', 'bg-emerald-500/70'];
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white">{stage.stage}</span>
                    <span className="text-text-muted">{stage.count.toLocaleString()} ({stage.percentage}%)</span>
                  </div>
                  <div className="w-full h-8 bg-white/5 rounded-lg overflow-hidden flex items-center p-1">
                    <div
                      className={`h-full rounded-md ${bgColors[idx]} flex items-center justify-end px-3 transition-all duration-500`}
                      style={{ width: `${Math.max(12, stage.percentage > 1 ? stage.percentage : 18)}%` }}
                    >
                      <span className="text-[11px] font-bold text-white drop-shadow">{stage.percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title="Channel ROAS Comparison" subtitle="Attributed revenue efficiency by acquisition channel" badge="Channel Efficiency">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channel_performance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="channel" stroke="#64748B" fontSize={10} interval={0} />
              <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `${val}x`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#22D3EE50', borderRadius: '8px' }} formatter={(val: number) => [`${val}x`, 'ROAS']} />
              <Bar dataKey="roas" fill="#22D3EE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Monthly Campaign Spend vs Attributed Revenue */}
      <ChartCard title="Monthly Spend vs. Attributed Revenue" subtitle="Marketing budget allocation compared with top-line attributed returns" badge="Attribution Trend">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={campaign_trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
            <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 100000).toFixed(0)}L`} />
            <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#D946EF50', borderRadius: '8px' }} formatter={(val: number) => [`₹${val.toLocaleString()}`, '']} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Bar dataKey="spend" name="Campaign Spend" fill="#F43F5E" radius={[4, 4, 0, 0]} />
            <Bar dataKey="revenue" name="Attributed Revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};
