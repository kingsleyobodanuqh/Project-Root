/**
 * Device interface for network monitoring dashboard
 */
export interface Device {
  id: string;
  name: string;
  group: string;
  lastUp: Date | null;
  downtime: string;
  status: 'online' | 'offline' | 'warning' | 'critical';
  recorded: Date;
}

/**
 * MetricData interface for dashboard statistics
 */
export interface MetricData {
  totalDevices: number;
  criticalDevices: number;
  avgDowntime: string;
  lastUpdate: string | null;
}
