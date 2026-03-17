import { httpClient } from './api';
import { API_ENDPOINTS } from '@/lib/constants';
import {
  Alert,
  AlertDetail,
  AlertLog,
  UpdateAlertStatusPayload,
  AddLocationPayload,
  AlertLocation,
} from '@/types/alert';
import { ApiResponse } from '@/types/api';

export const alertsService = {
  /**
   * Get all alerts
   */
  async getAlerts(): Promise<Alert[]> {
    const response = await httpClient.get<Alert[]>(API_ENDPOINTS.ALERTS.LIST);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener alertas');
    }

    return response.data;
  },

  /**
   * Get alert by ID
   */
  async getAlertById(id: number | string): Promise<AlertDetail> {
    const response = await httpClient.get<AlertDetail>(
      API_ENDPOINTS.ALERTS.DETAIL(id)
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener detalle de alerta');
    }

    return response.data;
  },

  /**
   * Update alert status
   */
  async updateAlertStatus(
    id: number | string,
    payload: UpdateAlertStatusPayload
  ): Promise<Alert> {
    const response = await httpClient.patch<Alert>(
      API_ENDPOINTS.ALERTS.UPDATE_STATUS(id),
      payload
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar estado');
    }

    return response.data;
  },

  /**
   * Add location to alert
   */
  async addLocation(
    id: number | string,
    payload: AddLocationPayload
  ): Promise<AlertLocation> {
    const response = await httpClient.post<AlertLocation>(
      API_ENDPOINTS.ALERTS.ADD_LOCATION(id),
      payload
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al agregar ubicación');
    }

    return response.data;
  },

  /**
   * Get alert logs
   */
  async getAlertLogs(id: number | string): Promise<AlertLog[]> {
    const response = await httpClient.get<AlertLog[]>(
      API_ENDPOINTS.ALERTS.LOGS(id)
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener historial');
    }

    return response.data;
  },
};
