/**
 * Dashboard.tsx - Main network monitoring dashboard page
 * Pixel-perfect PRTG Network Monitor replica
 */
import React, { useState } from 'react';
import ErrorAlert from '../components/ErrorAlert';
import MetricCard from '../components/MetricCard';
import SearchAndFilter from '../components/SearchAndFilter';
import { Device, MetricData } from '../types';

// Mock metric data
const initialMetrics: MetricData = {
  totalDevices: 0,
  criticalDevices: 0,
  avgDowntime: '0 days',
  lastUpdate: 'No data',
};

// Mock device data
const initialDevices: Device[] = [];

const groupOptions = [
  { value: 'all', label: '🔽 All Groups' },
];

/**
 * Main Dashboard component
 */
const Dashboard: React.FC = () => {
  // Error and loading states
  const [error, setError] = useState<boolean>(true); // Simulate error for demo
  const [loading, setLoading] = useState<boolean>(false);

  // Search/filter states
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  // Metrics
  const [metrics] = useState<MetricData>(initialMetrics);

  // Devices
  const [devices] = useState<Device[]>(initialDevices);

  // Run Report handler
  const handleRunReport = () => {
    // TODO: Integrate backend trigger
    alert('Run Report triggered!');
  };

  // Filtered devices (for table)
  const filteredDevices = devices.filter(
    (d) =>
      (filter === 'all' || d.group === filter) &&
      (d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.group.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-8">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <span className="text-white text-sm" aria-label="Network Icon">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">PRTG Network Monitor</h1>
              <p className="text-sm text-gray-500">Real-time network device monitoring</p>
            </div>
          </div>
          {/* Run Report Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium flex items-center"
            onClick={handleRunReport}
            aria-label="Run Report"
          >
            <span className="mr-2">▶</span>
            Run Report
          </button>
        </header>

        {/* Error Alert */}
        {error && <ErrorAlert message="An error occurred while fetching data" />}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Devices"
            value={metrics.totalDevices}
            description="Monitored devices"
            icon={
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="12" width="4" height="8" rx="1" fill="currentColor" className="text-blue-300" />
                <rect x="9" y="8" width="4" height="12" rx="1" fill="currentColor" className="text-blue-400" />
                <rect x="15" y="4" width="4" height="16" rx="1" fill="currentColor" className="text-blue-500" />
              </svg>
            }
            iconBg="bg-blue-100"
            ariaLabel="Total Devices"
          />
          <MetricCard
            title="Critical Devices"
            value={metrics.criticalDevices}
            description="≤ 15 days downtime"
            icon={
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <polygon points="12,2 22,20 2,20" fill="currentColor" className="text-red-500" />
                <rect x="11" y="9" width="2" height="5" rx="1" fill="#fff" />
                <rect x="11" y="16" width="2" height="2" rx="1" fill="#fff" />
              </svg>
            }
            iconBg="bg-red-100"
            ariaLabel="Critical Devices"
          />
          <MetricCard
            title="Avg Downtime"
            value={metrics.avgDowntime}
            description="Across all devices"
            icon={
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path stroke="currentColor" strokeWidth="2" d="M12 6v6l4 2" />
              </svg>
            }
            iconBg="bg-yellow-100"
            ariaLabel="Average Downtime"
          />
          <MetricCard
            title="Last Update"
            value={metrics.lastUpdate ?? ""}
            description="Data refresh time"
            icon={
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke="currentColor" strokeWidth="2" d="M4 4v6h6" />
                <path stroke="currentColor" strokeWidth="2" d="M20 20v-6h-6" />
                <path stroke="currentColor" strokeWidth="2" d="M5 19A9 9 0 1 1 19 5" />
              </svg>
            }
            iconBg="bg-green-100"
            ariaLabel="Last Update"
          />
        </div>

        {/* Data Table Section */}
        <section className="bg-white rounded-lg border border-gray-200 mb-8 shadow-sm">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Full Network Report ({filteredDevices.length})</h2>
            <SearchAndFilter
              search={search}
              onSearch={(e) => setSearch(e.target.value)}
              filter={filter}
              onFilter={(e) => setFilter(e.target.value)}
              filterOptions={groupOptions}
            />
          </div>
          {/* Table Columns */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-6 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div>GROUP</div>
              <div>DEVICE</div>
              <div>LAST UP</div>
              <div>DOWNTIME</div>
              <div>STATUS</div>
              <div>RECORDED</div>
            </div>
          </div>
          {/* Table Body or Empty State */}
          {loading ? (
            <div className="px-6 py-12 text-center animate-pulse">
              <p className="text-gray-400 text-sm">Loading data...</p>
            </div>
          ) : filteredDevices.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-sm">No data available</p>
            </div>
          ) : (
            <div className="px-6 py-4">
              <div className="grid grid-cols-6 gap-4 text-sm">
                {filteredDevices.map((d) => (
                  <React.Fragment key={d.id}>
                    <div>{d.group}</div>
                    <div>{d.name}</div>
                    <div>{d.lastUp ? d.lastUp.toLocaleString() : '—'}</div>
                    <div>{d.downtime}</div>
                    <div>{d.status}</div>
                    <div>{d.recorded.toLocaleString()}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
