import React, { useState } from 'react';
import { Maximize2, Minimize2, Download } from 'lucide-react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  height?: string;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  badge,
  children,
  action,
  height = 'h-80',
  className = '',
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      className={`glass-panel rounded-xl p-5 relative transition-all duration-300 flex flex-col ${
        isFullscreen
          ? 'fixed inset-4 z-50 overflow-auto bg-[#080B16] border border-brand-purple/50 shadow-2xl p-8'
          : className
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-text-primary tracking-wide">{title}</h3>
            {badge && (
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-brand-purple/20 text-brand-violet border border-brand-purple/30">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
          {action}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className={`w-full ${isFullscreen ? 'h-[calc(100vh-140px)]' : height} relative`}>
        {children}
      </div>
    </div>
  );
};
