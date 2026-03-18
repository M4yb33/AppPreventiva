import { useState, useCallback } from 'react';
import { sendEmergencyAlert, buildAlertPayload } from '../services/alert.service';
import { getLocationWithTimeout } from '../services/location.service';
import { getDeviceInfo } from '../storage/secureStorage';
import { silentError } from '../lib/utils';

export interface EmergencyAlertState {
  isLoading: boolean;
  error: string | null;
  sent: boolean;
}

export function useEmergencyAlert() {
  const [state, setState] = useState<EmergencyAlertState>({
    isLoading: false,
    error: null,
    sent: false,
  });

  const triggerEmergencyAlert = useCallback(async () => {
    setState({
      isLoading: true,
      error: null,
      sent: false,
    });

    try {
      // Obtener información del dispositivo
      const deviceInfo = await getDeviceInfo();
      if (!deviceInfo?.uuid) {
        throw new Error('Device not registered');
      }

      // Intentar obtener ubicación (con timeout)
      const location = await getLocationWithTimeout(5000);

      // Construir payload
      const payload = buildAlertPayload(
        deviceInfo.uuid,
        location?.latitude,
        location?.longitude,
        location?.accuracy
      );

      // Enviar alerta
      const response = await sendEmergencyAlert(payload);

      if (response?.success) {
        setState({
          isLoading: false,
          error: null,
          sent: true,
        });

        return true;
      } else {
        throw new Error('Alert not sent');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      silentError('Emergency alert error: ' + errorMessage);

      // No mostrar error al usuario, solo logs interno
      setState({
        isLoading: false,
        error: null, // No mostrar error visible
        sent: false,
      });

      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      sent: false,
    });
  }, []);

  return {
    ...state,
    triggerEmergencyAlert,
    reset,
  };
}
