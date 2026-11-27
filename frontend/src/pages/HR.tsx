import React, { useEffect, useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { apiService } from '../services/api';
import { Briefcase, UserCheck, CalendarCheck, UserX, Star, Clock } from 'lucide-react';
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

export const HR: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService
      .getHR()
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Loading Workforce Analytics...</p>
      </div>
    );
  }

  const { kpis, department_distribution, monthly_workforce_trend } = data;

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-violet flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Human Resources & Workforce Intelligence</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Headcount allocation across 6 functional divisions, attendance trends, performance scores, and tenure health.
          </p>
        </div>
      </div>

      {/* HR KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard title="Total Headcount" value={kpis.total_employees} color="#7C3AED" icon={<Briefcase size={18} />} />
        <KPICard title="Active Employees" value={kpis.active_employees} color="#22D3EE" icon={<UserCheck size={18} />} />
        <KPICard title="Attendance Rate" value={kpis.attendance_rate} suffix="%" change={1.2} color="#10B981" icon={<CalendarCheck size={18} />} />
        <KPICard title="Employee Attrition" value={kpis.attrition_rate} suffix="%" change={-0.8} color="#F43F5E" icon={<UserX size={18} />} />
        <KPICard title="Avg Performance" value={kpis.average_performance_score} suffix="/5" change={0.2} color="#F59E0B" icon={<Star size={18} />} />
        <KPICard title="Average Tenure" value={kpis.average_tenure_years} suffix=" Yrs" color="#A855F7" icon={<Clock size={18} />} />
      </div>

      {/* Row 2: Department Distribution & Monthly Workforce Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Employee Headcount by Department" subtitle="Staffing levels across operational business units" badge="Headcount">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={department_distribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="department" stroke="#64748B" fontSize={10} interval={0} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#7C3AED50', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Attendance & Performance Trajectory" subtitle="Workforce attendance compliance vs internal evaluation scores" badge="Productivity">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly_workforce_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="period" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} domain={[70, 100]} tickFormatter={val => `${val}%`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#22D3EE50', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="attendance_rate" name="Attendance Rate (%)" stroke="#22D3EE" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
