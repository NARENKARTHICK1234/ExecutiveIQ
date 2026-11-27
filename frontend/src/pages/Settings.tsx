import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useFilters } from '../context/FilterContext';
import { Settings as SettingsIcon, Sun, Moon, DollarSign, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, setTheme, currency, setCurrency, reducedMotion, setReducedMotion } = useTheme();
  const { resetFilters } = useFilters();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-violet flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Platform Settings & Customization</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Configure visual themes, display currencies, animation speeds, and data filter defaults.
          </p>
        </div>
      </div>

      {/* Visual Theme Section */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sun size={18} className="text-brand-cyan" />
          <span>Interface Appearance Theme</span>
        </h3>
        <p className="text-xs text-text-muted">Choose between high-contrast cinematic dark mode and high-readability daylight mode.</p>
        <div className="grid grid-cols-3 gap-4 pt-2">
          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border text-center transition-all ${
              theme === 'dark'
                ? 'bg-brand-purple/20 border-brand-purple text-white shadow-glow-purple font-semibold'
                : 'bg-white/5 border-white/10 text-text-secondary hover:text-white'
            }`}
          >
            <Moon size={20} className="mx-auto mb-2 text-brand-purple" />
            <span className="text-xs">Cinematic Dark</span>
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border text-center transition-all ${
              theme === 'light'
                ? 'bg-brand-purple/20 border-brand-purple text-white shadow-glow-purple font-semibold'
                : 'bg-white/5 border-white/10 text-text-secondary hover:text-white'
            }`}
          >
            <Sun size={20} className="mx-auto mb-2 text-brand-cyan" />
            <span className="text-xs">Clean Light</span>
          </button>

          <button
            onClick={() => setTheme('system')}
            className={`p-4 rounded-xl border text-center transition-all ${
              theme === 'system'
                ? 'bg-brand-purple/20 border-brand-purple text-white shadow-glow-purple font-semibold'
                : 'bg-white/5 border-white/10 text-text-secondary hover:text-white'
            }`}
          >
            <SettingsIcon size={20} className="mx-auto mb-2 text-brand-violet" />
            <span className="text-xs">System Default</span>
          </button>
        </div>
      </div>

      {/* Currency Display Preference */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <DollarSign size={18} className="text-emerald-400" />
          <span>Currency Symbol Formatting</span>
        </h3>
        <p className="text-xs text-text-muted">Preferred commercial valuation symbol (INR ₹ default for Indian retail datasets).</p>
        <div className="flex gap-4 pt-2">
          {['INR', 'USD', 'EUR'].map(c => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-6 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                currency === c
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 font-bold'
                  : 'bg-white/5 border-white/10 text-text-secondary hover:text-white'
              }`}
            >
              {c === 'INR' ? '₹ Indian Rupee (INR)' : c === 'USD' ? '$ US Dollar (USD)' : '€ Euro (EUR)'}
            </button>
          ))}
        </div>
      </div>

      {/* Animation & Reduced Motion */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Eye size={18} className="text-brand-magenta" />
          <span>Background Animation & Performance</span>
        </h3>
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-xs font-semibold text-white">Reduced Motion Mode</p>
            <p className="text-[11px] text-text-muted mt-0.5">Pause heavy background 3D canvas particles for maximum battery saving.</p>
          </div>
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              reducedMotion ? 'bg-brand-purple' : 'bg-white/10'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                reducedMotion ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Reset Cache & Defaults */}
      <div className="glass-panel rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Reset Local Preferences</h4>
          <p className="text-[11px] text-text-muted mt-0.5">Clears stored filter context and resets to default 24-month observation window.</p>
        </div>
        <button
          onClick={() => {
            resetFilters();
            alert('Filters and local state restored to factory defaults.');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-text-primary border border-white/10 transition-all"
        >
          <RefreshCw size={14} />
          <span>Reset All</span>
        </button>
      </div>
    </div>
  );
};
