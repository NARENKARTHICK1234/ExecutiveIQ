import React, { createContext, useContext, useState } from 'react';
import { FilterState } from '../types';

interface FilterContextType {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  queryString: string;
}

const defaultFilters: FilterState = {
  startDate: '2024-01-01',
  endDate: '2025-12-31',
  department: 'ALL',
  region: 'ALL',
  category: 'ALL',
  channel: 'ALL',
  segment: 'ALL',
  datasetName: 'transactions',
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const params = new URLSearchParams();
  if (filters.startDate) params.set('start_date', filters.startDate);
  if (filters.endDate) params.set('end_date', filters.endDate);
  if (filters.department !== 'ALL') params.set('department', filters.department);
  if (filters.region !== 'ALL') params.set('region', filters.region);
  if (filters.category !== 'ALL') params.set('category', filters.category);
  if (filters.channel !== 'ALL') params.set('channel', filters.channel);
  if (filters.segment !== 'ALL') params.set('segment', filters.segment);

  const queryString = params.toString() ? `?${params.toString()}` : '';

  return (
    <FilterContext.Provider value={{ filters, setFilter, resetFilters, queryString }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters must be used within FilterProvider');
  return context;
};
