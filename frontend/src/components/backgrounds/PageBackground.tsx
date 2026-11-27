import React from 'react';
import { DataSphere } from './DataSphere';
import { ParticleWave } from './ParticleWave';
import { SalesStreamBackground } from './SalesStreamBackground';
import { FinancialWave } from './FinancialWave';
import { CampaignFunnelBackground } from './CampaignFunnelBackground';
import { CustomerNetworkBackground } from './CustomerNetworkBackground';
import { WorkforceBackground } from './WorkforceBackground';
import { LogisticsGridBackground } from './LogisticsGridBackground';
import { ProductCubesBackground } from './ProductCubesBackground';
import { GeographicContourBackground } from './GeographicContourBackground';
import { PredictionWaveBackground } from './PredictionWaveBackground';
import { NeuralNetworkBackground } from './NeuralNetworkBackground';
import { DatabasePipelineBackground } from './DatabasePipelineBackground';
import { HolographicReportsBackground } from './HolographicReportsBackground';
import { AuroraMeshBackground } from './AuroraMeshBackground';

export type BackgroundVariant =
  | 'home'
  | 'dashboard'
  | 'sales'
  | 'finance'
  | 'marketing'
  | 'customers'
  | 'hr'
  | 'operations'
  | 'products'
  | 'regions'
  | 'predictions'
  | 'insights'
  | 'datasets'
  | 'reports'
  | 'settings';

interface PageBackgroundProps {
  variant: BackgroundVariant;
  className?: string;
}

export const PageBackground: React.FC<PageBackgroundProps> = ({ variant, className = '' }) => {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {/* Background variant switch matching reference images exactly */}
      {variant === 'home' && <DataSphere />}
      {variant === 'dashboard' && <ParticleWave />}
      {variant === 'sales' && <SalesStreamBackground />}
      {variant === 'finance' && <FinancialWave />}
      {variant === 'marketing' && <CampaignFunnelBackground />}
      {variant === 'customers' && <CustomerNetworkBackground />}
      {variant === 'hr' && <WorkforceBackground />}
      {variant === 'operations' && <LogisticsGridBackground />}
      {variant === 'products' && <ProductCubesBackground />}
      {variant === 'regions' && <GeographicContourBackground />}
      {variant === 'predictions' && <PredictionWaveBackground />}
      {variant === 'insights' && <NeuralNetworkBackground />}
      {variant === 'datasets' && <DatabasePipelineBackground />}
      {variant === 'reports' && <HolographicReportsBackground />}
      {variant === 'settings' && <AuroraMeshBackground />}

      {/* Cyberpunk subtle digital grid overlay across all pages */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#7C3AED 1px, transparent 1px), linear-gradient(to right, #7C3AED 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
