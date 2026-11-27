import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  subtext?: string;
  prefix?: string;
  suffix?: string;
  sparklineData?: number[];
  color?: string;
  icon?: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  subtext,
  prefix = '',
  suffix = '',
  sparklineData,
  color = '#7C3AED',
  icon,
}) => {
  const isPositive = change !== undefined ? change > 0 : null;
  const isNeutral = change === 0;

  const chartData = sparklineData ? sparklineData.map((val, idx) => ({ index: idx, value: val })) : null;

  return (
    <div className="glass-panel glass-panel-hover rounded-xl p-5 relative overflow-hidden transition-all duration-300">
      {/* Top glowing accent border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-75"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold font-display text-text-primary">
              {prefix}
              {typeof value === 'number' ? value.toLocaleString() : value}
              {suffix}
            </span>
          </div>
        </div>

        {icon && (
          <div
            className="p-2.5 rounded-lg border border-white/5 backdrop-blur-md"
            style={{ backgroundColor: `${color}18`, color: color }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        {change !== undefined ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span
              className={`flex items-center px-2 py-0.5 rounded-full ${
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : isNeutral
                  ? 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {isPositive ? <TrendingUp size={12} className="mr-1" /> : isNeutral ? <Minus size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
              {Math.abs(change)}%
            </span>
            {subtext && <span className="text-text-muted text-[11px] truncate">{subtext}</span>}
          </div>
        ) : (
          subtext && <span className="text-text-muted text-[11px] truncate">{subtext}</span>
        )}

        {chartData && (
          <div className="w-24 h-8 ml-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
