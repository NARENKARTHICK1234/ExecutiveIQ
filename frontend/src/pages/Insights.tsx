import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { apiService } from '../services/api';
import { SmartInsight } from '../types';
import { Lightbulb, AlertCircle, AlertTriangle, Info, CheckCircle2, Shield, Activity } from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export const Insights: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService
      .getInsights()
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Evaluating Anomaly Detection & Strategic Insights...</p>
      </div>
    );
  }

  const { total_insights, priority_distribution, insights, risk_matrix, radar_performance, anomaly_timeline } = data;

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-violet flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Smart Business Insights & Anomaly Detection</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Rule-based and statistical business anomaly detection with prioritized executive interventions.
          </p>
        </div>
      </div>

      {/* Priority Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {priority_distribution.map((p: any, idx: number) => (
          <div key={idx} className="glass-panel rounded-xl p-4 flex items-center justify-between" style={{ borderColor: `${p.color}30` }}>
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{p.priority} Severity</p>
              <p className="text-2xl font-bold font-display text-white mt-1">{p.count} Alerts</p>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${p.color}20`, color: p.color }}>
              {p.priority === 'Critical' ? <AlertCircle size={20} /> : p.priority === 'High' ? <AlertTriangle size={20} /> : <Info size={20} />}
            </div>
          </div>
        ))}
      </div>

      {/* Actionable Executive Insight Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">Priority Strategic Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((ins: SmartInsight, idx: number) => {
            const priorityColors = {
              Critical: 'border-rose-500/40 bg-rose-500/5',
              High: 'border-amber-500/40 bg-amber-500/5',
              Medium: 'border-cyan-500/40 bg-cyan-500/5',
              Low: 'border-emerald-500/40 bg-emerald-500/5',
            };
            const badgeColors = {
              Critical: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
              High: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
              Medium: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
              Low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            };
            return (
              <div key={idx} className={`glass-panel rounded-2xl p-5 border ${priorityColors[ins.priority]} space-y-3`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badgeColors[ins.priority]}`}>
                      {ins.priority} Priority
                    </span>
                    <span className="text-xs text-text-muted ml-2">{ins.department} Division</span>
                    <h4 className="text-base font-bold text-white mt-2">{ins.title}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-brand-cyan px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                    {ins.metric}
                  </span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed">{ins.explanation}</p>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> Recommended Executive Action
                  </p>
                  <p className="text-xs text-text-primary">{ins.action}</p>
                </div>

                <p className="text-[10px] text-text-muted italic">{ins.assumptions}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 3: Department Performance Radar & Anomaly Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Departmental Performance Radar" subtitle="Multilateral efficiency scoring across functional units" badge="Radar Evaluation">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radar_performance} cx="50%" cy="50%" outerRadius={90}>
              <PolarGrid stroke="#ffffff15" />
              <PolarAngleAxis dataKey="department" stroke="#94A3B8" fontSize={11} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748B" fontSize={10} />
              <Radar name="Performance" dataKey="score" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.4} />
              <Radar name="Target SLA" dataKey="target" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Statistical Anomaly Timeline" subtitle="Deviations exceeding +/- 2.0 Sigma historical baseline" badge="Sigma Outliers">
          <div className="space-y-3 py-2">
            {anomaly_timeline.map((anom: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-purple/20 text-brand-cyan">
                    <Activity size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{anom.event}</p>
                    <p className="text-[10px] text-text-muted">{anom.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-brand-violet">{anom.magnitude}</span>
                  <p className="text-[10px] text-text-muted">{anom.date}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};
