import React, { useEffect, useState, useRef } from 'react';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { apiService } from '../services/api';
import { Database, UploadCloud, RefreshCw, Download, CheckCircle, FileText, AlertCircle } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const Datasets: React.FC = () => {
  const [quality, setQuality] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      apiService.getDatasetQuality(),
      apiService.getDatasetPreview('transactions'),
    ])
      .then(([qRes, pRes]) => {
        setQuality(qRes);
        setPreview(pRes);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploadStatus('Validating and loading schema...');
    try {
      const res = await fetch('/api/datasets/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const result = await res.json();
        setUploadStatus(`Success! Imported ${result.rows_imported} rows from ${file.name}.`);
        loadData();
      } else {
        const err = await res.json();
        setUploadStatus(`Upload rejected: ${err.detail || 'Invalid schema'}`);
      }
    } catch (err: any) {
      setUploadStatus(`Upload error: ${err.message}`);
    }
  };

  const handleReset = async () => {
    setUploadStatus('Resetting to verified baseline datasets...');
    await apiService.resetSampleDatasets();
    setUploadStatus('Reset complete. 25,000 baseline records restored.');
    loadData();
  };

  if (loading || !quality) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-text-muted">Evaluating Dataset Health & Schema Quality...</p>
      </div>
    );
  }

  const { overall_health_score, total_datasets, total_records, total_missing_cells, datasets } = quality;
  const healthDonutData = [
    { name: 'Complete & Valid', value: overall_health_score },
    { name: 'Missing / Discrepant', value: Math.max(0, 100 - overall_health_score) },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-l-4 border-brand-purple flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Dataset Management & Data Governance</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Schema validation, missing value detection, drag-and-drop ingestion, and data health scoring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-text-primary border border-white/10 transition-all"
          >
            <RefreshCw size={14} />
            <span>Reset Sample Data</span>
          </button>
          <a
            href="/api/datasets/download?name=transactions"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple/20 hover:bg-brand-purple/30 text-xs font-semibold text-brand-violet border border-brand-purple/40 transition-all"
          >
            <Download size={14} />
            <span>Download CSV</span>
          </a>
        </div>
      </div>

      {/* Dataset Health KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Data Quality Health" value={overall_health_score} suffix="%" color="#10B981" icon={<CheckCircle size={18} />} />
        <KPICard title="Total Active Datasets" value={total_datasets} color="#7C3AED" icon={<Database size={18} />} />
        <KPICard title="Total Indexed Records" value={total_records} color="#22D3EE" icon={<FileText size={18} />} />
        <KPICard title="Missing Cell Count" value={total_missing_cells} color="#A855F7" icon={<AlertCircle size={18} />} />
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="glass-panel rounded-2xl p-8 border-2 border-dashed border-brand-purple/30 text-center relative hover:border-brand-purple transition-all">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.json"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="w-14 h-14 rounded-2xl bg-brand-purple/20 text-brand-cyan mx-auto flex items-center justify-center mb-4 border border-brand-purple/30">
          <UploadCloud size={28} />
        </div>
        <h3 className="text-base font-bold text-white">Drop your custom CSV, Excel (.xlsx), or JSON dataset here</h3>
        <p className="text-xs text-text-muted mt-1 max-w-md mx-auto">
          Automatic column type inference, duplicate row pruning, and real-time schema validation across all 14 analytics portals.
        </p>
        <button className="mt-4 px-5 py-2 rounded-xl bg-brand-purple text-xs font-semibold text-white shadow-glow-purple pointer-events-none">
          Browse File from Computer
        </button>

        {uploadStatus && (
          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-brand-cyan max-w-lg mx-auto">
            {uploadStatus}
          </div>
        )}
      </div>

      {/* Row 2: Quality Donut & Dataset Completeness Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Overall Data Completeness" subtitle="Percentage of valid non-null relational records" badge="Data Quality" className="lg:col-span-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={healthDonutData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                <Cell fill="#10B981" />
                <Cell fill="#F43F5E" />
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#ffffff20', borderRadius: '8px' }} formatter={(val: number) => [`${val}%`, '']} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Completeness by Dataset" subtitle="Verification score across all 12 operational datasets" badge="Completeness" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={Object.entries(datasets).map(([name, info]: [string, any]) => ({
                name,
                completeness: info.completeness_pct,
                records: info.rows,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={10} interval={0} />
              <YAxis stroke="#64748B" fontSize={11} domain={[90, 100]} tickFormatter={val => `${val}%`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1020', borderColor: '#22D3EE50', borderRadius: '8px' }} />
              <Bar dataKey="completeness" name="Completeness %" fill="#22D3EE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Dataset Preview Table */}
      {preview && (
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Live Data Preview: {preview.name}</h3>
              <p className="text-xs text-text-muted">Displaying top 100 records of {preview.total_rows.toLocaleString()} total rows</p>
            </div>
          </div>
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs font-mono">
              <thead className="sticky top-0 bg-[#080B16]">
                <tr className="border-b border-white/10 text-text-muted font-sans">
                  {preview.columns.map((col: string, idx: number) => (
                    <th key={idx} className="pb-3 pr-4 font-semibold whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {preview.sample_rows.slice(0, 15).map((row: any, rIdx: number) => (
                  <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                    {preview.columns.map((col: string, cIdx: number) => (
                      <td key={cIdx} className="py-2.5 pr-4 whitespace-nowrap text-text-secondary">
                        {String(row[col] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
