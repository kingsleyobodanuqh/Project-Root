/**
 * MetricCard component - displays a single metric card
 */
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  ariaLabel?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon, iconBg, ariaLabel }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6" aria-label={ariaLabel}>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center`}>
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

export default MetricCard;
