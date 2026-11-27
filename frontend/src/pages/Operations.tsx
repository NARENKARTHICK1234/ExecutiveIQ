import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { apiService } from '../services/api';
import { Truck, CheckCircle, Clock, RotateCcw, Box, DollarSign } from 'lucide-react';
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

export const Operations: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService
      .getOperations()
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Loading Operations & Logistics Analytics...</p>
      </div>
    );
  }

  const { kpis, warehouse_performance, return_reasons } = data;
  const PIE_COLORS = ['#F43F5E', '#F59E0B', '#7C3AED', '#22D3EE', '#2563EB'];

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-cyan flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Operations, Logistics & Supply Chain</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Warehouse fulfillment SLAs, carrier on-time delivery rates, and return root-cause analysis.
          </p>
        </div>
      </div>

      {/* Operations KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard title="Orders Fulfilled" value={kpis.total_orders_fulfilled} color="#7C3AED" icon={<Box size={18} />} />
        <KPICard title="Fulfillment Rate" value={kpis.fulfillment_rate} suffix="%" change={1.5} color="#10B981" icon={<CheckCircle size={18} />} />
        <KPICard title="On-Time Delivery Rate" value={kpis.on_time_delivery_rate} suffix="%" change={2.1} color="#22D3EE" icon={<Clock size={18} />} />
        <KPICard title="Average Delivery Days" value={kpis.average_delivery_time_days} suffix=" Days" change={-0.4} color="#2563EB" icon={<Truck size={18} />} />
        <KPICard title="Return Rate" value={kpis.return_rate} suffix="%" change={-0.6} color="#F43F5E" icon={<RotateCcw size={18} />} />
        <KPICard title="Avg Delivery Cost" value={kpis.average_delivery_cost} prefix="₹" color="#A855F7" icon={<DollarSign size={18} />} />
      </div>

      {/* Row 2: Warehouse Performance & Return Reasons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Warehouse Dispatch Efficiency" subtitle="On-time delivery percentage across fulfillment hubs" badge="Warehouses" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={warehouse_performance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="warehouse" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} domain={[70, 100]} tickFormatter={val => `${val}%`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#22D3EE50', borderRadius: '8px' }} />
              <Bar dataKey="on_time_pct" name="On-Time Delivery %" fill="#22D3EE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Customer Return Reasons" subtitle="Defect categorization of returned goods" badge="RMA Breakdown" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={return_reasons} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="count" nameKey="reason">
                {return_reasons.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#080B16" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#ffffff20', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
