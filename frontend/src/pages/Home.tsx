import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Layers,
  Sparkles,
  BarChart3,
  Cpu,
  Database,
  Globe2,
  CheckCircle2,
  ChevronRight,
  Play,
} from 'lucide-react';
import { DataSphere } from '../components/backgrounds/DataSphere';

export const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-20">
      {/* Cinematic 3D Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <DataSphere />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-28 flex flex-col items-center text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/15 border border-brand-purple/30 text-xs font-semibold text-brand-violet mb-8 shadow-glow-purple backdrop-blur-md">
          <Sparkles size={14} className="text-brand-cyan" />
          <span>Next-Generation Executive Decision Intelligence</span>
        </div>

        {/* Hero Heading strictly following guidelines */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white max-w-4xl leading-[1.1]">
          Transform Data.{' '}
          <span className="text-gradient-purple">Discover Insights.</span>{' '}
          <span className="text-gradient-cyan">Drive Decisions.</span>
        </h1>

        {/* Hero Description */}
        <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
          Unify business performance, financial intelligence, customer analytics, and predictive insights in one powerful executive decision-making platform.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-cyan transition-all shadow-glow-purple flex items-center gap-2 group"
          >
            <span>Explore Dashboard</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/datasets"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm text-text-primary bg-white/5 hover:bg-white/10 border border-white/10 transition-all backdrop-blur-md"
          >
            Analyze Your Dataset
          </Link>
        </div>

        {/* Floating KPI Highlights */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <div className="glass-panel rounded-xl p-4 text-left border border-brand-purple/20">
            <p className="text-[11px] font-semibold text-text-muted uppercase">Annual Revenue</p>
            <p className="text-2xl font-bold font-display text-white mt-1">₹52.4 Cr</p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
              <TrendingUp size={12} /> +21.4% YoY
            </p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-left border border-brand-cyan/20">
            <p className="text-[11px] font-semibold text-text-muted uppercase">Transactions Analyzed</p>
            <p className="text-2xl font-bold font-display text-brand-cyan mt-1">25,000+</p>
            <p className="text-[11px] text-text-muted mt-1 font-medium">Relational Records</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-left border border-brand-violet/20">
            <p className="text-[11px] font-semibold text-text-muted uppercase">ML Forecast Horizon</p>
            <p className="text-2xl font-bold font-display text-brand-violet mt-1">180 Days</p>
            <p className="text-[11px] text-text-muted mt-1 font-medium">Chronological Split</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-left border border-brand-emerald/20">
            <p className="text-[11px] font-semibold text-text-muted uppercase">Operational Health</p>
            <p className="text-2xl font-bold font-display text-emerald-400 mt-1">98.2%</p>
            <p className="text-[11px] text-text-muted mt-1 font-medium">Data Quality Score</p>
          </div>
        </div>
      </section>

      {/* Platform Capabilities Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-bold text-brand-cyan tracking-wider">Enterprise Architecture</h2>
          <h3 className="text-3xl font-bold font-display text-white mt-2">Comprehensive 360° Decision Analytics</h3>
          <p className="text-sm text-text-muted mt-3">
            Six business departments seamlessly unified through machine learning, automated anomaly detection, and interactive geospatial mapping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel glass-panel-hover rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/20 text-brand-violet flex items-center justify-center mb-4 border border-brand-purple/30">
              <BarChart3 size={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Executive KPI Monitoring</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Track revenue, expenses, operating margin, AOV, and customer churn in real time with previous period and quarterly target variance comparisons.
            </p>
            <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-brand-cyan font-semibold mt-4 hover:underline">
              <span>View Executive View</span> <ChevronRight size={14} />
            </Link>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center mb-4 border border-brand-cyan/30">
              <Cpu size={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Predictive AI Forecasting</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Ensemble time-series regression models featuring Linear Regression, Random Forest, and Gradient Boosting evaluated on chronological test horizons.
            </p>
            <Link to="/predictions" className="inline-flex items-center gap-1.5 text-xs text-brand-cyan font-semibold mt-4 hover:underline">
              <span>Explore Predictions</span> <ChevronRight size={14} />
            </Link>
          </div>

          <div className="glass-panel glass-panel-hover rounded-2xl p-6">
            <div className="w-12 h-12 rounded-xl bg-brand-magenta/20 text-brand-magenta flex items-center justify-center mb-4 border border-brand-magenta/30">
              <Globe2 size={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Geospatial Intelligence</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Zero-external-key local India regional boundary choropleths, state-level margin rankings, and interactive city logistics delivery markers.
            </p>
            <Link to="/regions" className="inline-flex items-center gap-1.5 text-xs text-brand-cyan font-semibold mt-4 hover:underline">
              <span>View Regional Map</span> <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="glass-panel rounded-3xl p-10 md:p-14 relative overflow-hidden text-center border border-brand-purple/40 shadow-glow-purple">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />

          <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white relative z-10">
            Ready to Experience Executive Intelligence?
          </h3>
          <p className="text-sm text-text-secondary max-w-xl mx-auto mt-4 relative z-10">
            Explore all 15 independent application routes, interact with 60+ dynamic visualizations, and test custom dataset uploads.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 transition-all shadow-glow-purple"
            >
              Open Interactive Platform
            </Link>
            <Link
              to="/reports"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-text-primary bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              Generate Executive Dossier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
