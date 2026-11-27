export interface FilterState {
  startDate: string;
  endDate: string;
  department: string;
  region: string;
  category: string;
  channel: string;
  segment: string;
  datasetName: string;
}

export interface KPIItem {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  subtext?: string;
  prefix?: string;
  suffix?: string;
  color?: string;
}

export interface SmartInsight {
  id: string;
  title: string;
  department: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  metric: string;
  comparison: string;
  explanation: string;
  action: string;
  assumptions: string;
}

export interface ModelMetrics {
  mae: number;
  rmse: number;
  wape: number;
  r2: number;
}
