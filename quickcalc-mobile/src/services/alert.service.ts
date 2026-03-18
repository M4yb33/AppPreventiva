import api from './api';
import { AlertPayload, AlertResponse } from '../types/alert';
import { silentError } from '../lib/utils';

/**
 * Enviar alerta de emergencia al backend
 */
export async function sendEmergencyAlert(
  payload: AlertPayload
): Promise<AlertResponse | null> {
  try {
    const response = await api.post<AlertResponse>('/alerts/create', payload);

    if (response.data.success) {
      return response.data;
    }

    silentError('Alert send failed: ' + response.data.message);
    return null;
  } catch (error) {
    silentError('Error sending emergency alert');
    return null;
  }
}

/**
 * Construir payload de alerta
 */
export function buildAlertPayload(
  deviceUuid: string,
  latitude?: number,
  longitude?: number,
  accuracy?: number
): AlertPayload {
  const payload: AlertPayload = {
    deviceUuid,
    triggerType: 'PANIC_CODE',
  };

  if (latitude !== undefined && longitude !== undefined) {
    payload.latitude = latitude;
    payload.longitude = longitude;
    payload.accuracy = accuracy;
  }

  return payload;
}
