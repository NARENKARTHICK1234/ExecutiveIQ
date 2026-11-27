import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { apiService } from '../services/api';
import { Sparkles, Cpu, Layers, TrendingUp, CheckCircle, Sliders } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const Predictions: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [modelsData, setModelsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [horizon, setHorizon] = useState(90);
  const [modelName, setModelName] = useState('Gradient Boosting');
  const [scenario, setScenario] = useState('base');

  const runPrediction = (h: number, m: string, s: string) => {
    setLoading(true);
    apiService
      .runForecast({ horizon_days: h, model_name: m, scenario: s })
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    Promise.all([
      apiService.getPredictions(),
      apiService.getPredictionModels(),
    ])
      .then(([predRes, modRes]) => {
        setData(predRes);
        setModelsData(modRes);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Running Predictive Scikit-Learn Regression Models...</p>
      </div>
    );
  }

  const { total_forecasted_revenue, expected_growth_pct, forecast_points, historical_trend } = data;

  // Combine historical and forecast points for chart
  const combinedSeries = [
    ...historical_trend.slice(-30).map((p: any) => ({
      date: p.date,
      historical: p.historical_revenue,
      forecast: null,
      lower: null,
      upper: null,
    })),
    ...forecast_points.map((p: any) => ({
      date: p.date,
      historical: null,
      forecast: p.forecast_revenue,
      lower: p.lower_bound,
      upper: p.upper_bound,
    })),
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-cyan flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Machine Learning Predictive Analytics</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Strictly out-of-time chronological train-test validation. Prevents future leakage with genuine regression algorithms.
          </p>
        </div>

        {/* Interactive Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <Sliders size={13} className="text-brand-cyan" />
            <select
              value={horizon}
              onChange={e => {
                const val = Number(e.target.value);
                setHorizon(val);
                runPrediction(val, modelName, scenario);
              }}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value={30} className="bg-[#080B16]">Next 30 Days</option>
              <option value={90} className="bg-[#080B16]">Next 90 Days</option>
              <option value={180} className="bg-[#080B16]">Next 180 Days</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <Cpu size={13} className="text-brand-purple" />
            <select
              value={modelName}
              onChange={e => {
                const val = e.target.value;
                setModelName(val);
                runPrediction(horizon, val, scenario);
              }}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="Gradient Boosting" className="bg-[#080B16]">Gradient Boosting</option>
              <option value="Random Forest" className="bg-[#080B16]">Random Forest</option>
              <option value="Linear Regression" className="bg-[#080B16]">Linear Regression</option>
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <select
              value={scenario}
              onChange={e => {
                const val = e.target.value;
                setScenario(val);
                runPrediction(horizon, modelName, val);
              }}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="base" className="bg-[#080B16]">Base Scenario</option>
              <option value="conservative" className="bg-[#080B16]">Conservative (-10%)</option>
              <option value="optimistic" className="bg-[#080B16]">Optimistic (+12%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prediction KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title={`Forecasted Revenue (${horizon}D)`} value={total_forecasted_revenue} prefix="₹" change={expected_growth_pct} color="#7C3AED" icon={<Sparkles size={18} />} />
        <KPICard title="Projected Run-Rate Growth" value={expected_growth_pct} suffix="%" change={expected_growth_pct} color="#22D3EE" icon={<TrendingUp size={18} />} />
        <KPICard title="Best Performing Model" value={modelsData?.best_model || 'Gradient Boosting'} color="#10B981" icon={<CheckCircle size={18} />} />
        <KPICard title="Selected Horizon" value={`${horizon} Days`} color="#2563EB" icon={<Layers size={18} />} />
        <KPICard title="Forecast Scenario" value={scenario.toUpperCase()} color="#F59E0B" icon={<Sliders size={18} />} />
      </div>

      {/* Row 2: Future Trend Projection with Confidence Bounds */}
      <ChartCard title="Historical Trajectory vs. ML Forward Forecast" subtitle={`Multi-day forward revenue curve with upper & lower prediction confidence intervals`} badge="Forecast Trajectory">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={combinedSeries}>
            <defs>
              <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorFore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="date" stroke="#64748B" fontSize={10} interval={10} />
            <YAxis stroke="#64748B" fontSize={11} tickFormatter={val => `₹${(val / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#22D3EE50', borderRadius: '8px' }} formatter={(val: number) => (val ? [`₹${val.toLocaleString()}`, ''] : ['—', ''])} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <Area type="monotone" dataKey="historical" name="Historical Observed Revenue" stroke="#7C3AED" fill="url(#colorHist)" strokeWidth={2} />
            <Area type="monotone" dataKey="forecast" name="ML Projected Forecast" stroke="#22D3EE" fill="url(#colorFore)" strokeWidth={2.5} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="upper" name="Optimistic Bound" stroke="#10B981" strokeWidth={1.5} dot={false} />
            <Line type="monotone" dataKey="lower" name="Conservative Bound" stroke="#F43F5E" strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Row 3: ML Model Chronological Evaluation Table */}
      {modelsData && (
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-1">Model Evaluation & Benchmark Comparison</h3>
          <p className="text-xs text-text-muted mb-4">Evaluated strictly on an out-of-time chronological 20% holdout test dataset</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-text-muted font-sans">
                  <th className="pb-3 font-semibold">Algorithm</th>
                  <th className="pb-3 font-semibold">MAE (₹)</th>
                  <th className="pb-3 font-semibold">RMSE (₹)</th>
                  <th className="pb-3 font-semibold">WAPE (%)</th>
                  <th className="pb-3 font-semibold text-right">R² Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {Object.entries(modelsData.models_comparison).map(([mName, metrics]: [string, any], idx: number) => {
                  const isBest = mName === modelsData.best_model;
                  return (
                    <tr key={idx} className={`hover:bg-white/5 transition-colors ${isBest ? 'bg-brand-purple/10' : ''}`}>
                      <td className="py-3 font-sans font-semibold text-white flex items-center gap-2">
                        {isBest && <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 font-bold uppercase font-mono">Best</span>}
                        <span>{mName}</span>
                      </td>
                      <td className="py-3">₹{metrics.mae.toLocaleString()}</td>
                      <td className="py-3">₹{metrics.rmse.toLocaleString()}</td>
                      <td className="py-3 text-brand-cyan">{metrics.wape}%</td>
                      <td className="py-3 text-right font-bold text-emerald-400">{metrics.r2}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
