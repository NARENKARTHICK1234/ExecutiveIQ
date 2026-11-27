import React, { useState } from 'react';
import { KPICard } from '../components/KPICard';
import { apiService } from '../services/api';
import { FileSpreadsheet, Printer, Download, CheckCircle, FileText, Calendar } from 'lucide-react';

export const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('executive_summary');
  const [reportData, setReportData] = useState<any>(null);
  const [generating, setGenerating] = useState(false);

  const generateReport = () => {
    setGenerating(true);
    apiService
      .generateReport({ report_type: reportType })
      .then(res => setReportData(res))
      .catch(err => console.error(err))
      .finally(() => setGenerating(false));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-purple flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Executive Reports & Dossier Export</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Compile downloadable board-level briefings, departmental audits, and predictive forecasts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={generateReport}
            disabled={generating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-purple text-xs font-semibold text-white shadow-glow-purple hover:bg-brand-purple/90 transition-all"
          >
            <FileSpreadsheet size={15} />
            <span>{generating ? 'Compiling Dossier...' : 'Generate Live Report'}</span>
          </button>
          {reportData && (
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-text-primary border border-white/10 transition-all"
            >
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Report Customization Controls */}
      <div className="glass-panel rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-text-muted mb-2">Report Template</label>
          <select
            value={reportType}
            onChange={e => setReportType(e.target.value)}
            className="w-full bg-[#080B16] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="executive_summary">Executive Summary Dossier</option>
            <option value="sales_performance">Sales & Channel Velocity Report</option>
            <option value="financial_audit">Financial P&L and Margin Reconciliation</option>
            <option value="predictive_forecast">AI Predictive Forecasting Brief</option>
            <option value="operations_logistics">Logistics & Supply Chain Audit</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-muted mb-2">Target Audience Format</label>
          <div className="flex items-center gap-3 py-1.5 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-brand-cyan" /> Board of Directors</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-brand-purple" /> VP of Finance</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-muted mb-2">Data Integrity Standard</label>
          <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 py-1.5">
            <CheckCircle size={14} /> 100% Reconciled Double-Entry COGS
          </p>
        </div>
      </div>

      {/* Generated Report Preview Area */}
      {reportData ? (
        <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-6 text-text-primary print:bg-white print:text-black">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-purple/20 text-brand-cyan">
                {reportData.report_id}
              </span>
              <h3 className="text-2xl font-bold font-display text-white mt-2">{reportData.title}</h3>
              <p className="text-xs text-text-muted mt-0.5">Generated: {reportData.generated_at}</p>
            </div>
            <div className="text-right">
              <span className="font-display font-bold text-lg text-brand-purple">ExecutiveIQ</span>
              <p className="text-[10px] text-text-muted uppercase">Decision Analytics</p>
            </div>
          </div>

          {/* Key Executive KPIs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3">Reconciled Core Performance</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs text-text-muted">Total Sales Revenue</p>
                <p className="text-xl font-bold font-display text-white mt-1">₹{reportData.kpis.total_revenue.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs text-text-muted">Operating Profit</p>
                <p className="text-xl font-bold font-display text-emerald-400 mt-1">₹{reportData.kpis.operating_profit.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs text-text-muted">Operating Margin</p>
                <p className="text-xl font-bold font-display text-brand-cyan mt-1">{reportData.kpis.profit_margin}%</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs text-text-muted">Sales Target Realization</p>
                <p className="text-xl font-bold font-display text-brand-violet mt-1">{reportData.kpis.target_achievement}%</p>
              </div>
            </div>
          </div>

          {/* Critical Strategic Insights */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-3">Priority Strategic Interventions</h4>
            <div className="space-y-3">
              {reportData.critical_insights.map((ins: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white font-bold">{ins.title} ({ins.department})</span>
                    <span className="text-rose-400 font-mono font-bold">{ins.metric}</span>
                  </div>
                  <p className="text-text-secondary">{ins.explanation}</p>
                  <p className="text-emerald-400 font-medium">Recommended Action: {ins.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology & Limitations */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-[11px] text-text-muted space-y-1">
            <p><span className="font-semibold text-white">Methodology:</span> {reportData.methodology}</p>
            <p><span className="font-semibold text-white">Limitations:</span> {reportData.limitations}</p>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-12 text-center text-text-muted space-y-2">
          <FileText size={32} className="mx-auto text-brand-purple" />
          <h4 className="text-sm font-semibold text-white">No Report Generated Yet</h4>
          <p className="text-xs max-w-sm mx-auto">
            Click "Generate Live Report" above to compile real-time metrics, ML forecasts, and critical insights into an executive board memo.
          </p>
        </div>
      )}
    </div>
  );
};
