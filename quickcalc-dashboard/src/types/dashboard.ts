import { Alert } from './alert';

export interface DashboardSummary {
  totalAlerts: number;
  newAlerts: number;
  inReviewAlerts: number;
  inProgressAlerts: number;
  escalatedAlerts: number;
  closedAlerts: number;
  testAlerts: number;
  totalDevices: number;
  configuredDevices: number;
  activeOperators: number;
}

export interface RecentAlert extends Alert {
  // Puede extender con campos adicionales si es necesario
}
