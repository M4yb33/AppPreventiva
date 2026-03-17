import { httpClient } from './api';
import { API_ENDPOINTS } from '@/lib/constants';
import { DashboardSummary, RecentAlert } from '@/types/dashboard';

export const dashboardService = {
  /**
   * Get dashboard summary statistics
   */
  async getSummary(): Promise<DashboardSummary> {
    const response = await httpClient.get<DashboardSummary>(
      API_ENDPOINTS.DASHBOARD.SUMMARY
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener resumen');
    }

    return response.data;
  },

  /**
   * Get recent alerts
   */
  async getRecentAlerts(): Promise<RecentAlert[]> {
    const response = await httpClient.get<RecentAlert[]>(
      API_ENDPOINTS.DASHBOARD.RECENT_ALERTS
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener alertas recientes');
    }

    return response.data;
  },
};
