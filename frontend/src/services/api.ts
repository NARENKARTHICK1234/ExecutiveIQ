/**
 * ExecutiveIQ API Service
 * Clean relative URL abstraction for all backend endpoints.
 */

const API_BASE = '/api';

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const apiService = {
  getHealth: () => fetchAPI<{ status: string; service: string }>('/health'),
  getOverview: (query: string = '') => fetchAPI<any>(`/overview${query}`),
  getSales: (query: string = '') => fetchAPI<any>(`/sales${query}`),
  getFinance: (query: string = '') => fetchAPI<any>(`/finance${query}`),
  getMarketing: () => fetchAPI<any>('/marketing'),
  getCustomers: () => fetchAPI<any>('/customers'),
  getHR: () => fetchAPI<any>('/hr'),
  getOperations: () => fetchAPI<any>('/operations'),
  getProducts: () => fetchAPI<any>('/products'),
  getRegions: () => fetchAPI<any>('/regions'),
  getMapGeoJSON: () => fetchAPI<any>('/maps/geojson'),
  getPredictions: () => fetchAPI<any>('/predictions'),
  getPredictionModels: () => fetchAPI<any>('/predictions/models'),
  runForecast: (body: { horizon_days: number; model_name: string; scenario: string }) =>
    fetchAPI<any>('/predictions/forecast', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  getInsights: () => fetchAPI<any>('/insights'),
  getDatasetQuality: () => fetchAPI<any>('/datasets/quality'),
  getDatasetPreview: (name: string = 'transactions') => fetchAPI<any>(`/datasets/preview?name=${name}`),
  resetSampleDatasets: () => fetchAPI<any>('/datasets/sample'),
  generateReport: (body: any) =>
    fetchAPI<any>('/reports/generate', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
