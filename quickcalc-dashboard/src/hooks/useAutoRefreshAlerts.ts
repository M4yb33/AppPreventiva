import { useEffect, useRef, useState } from 'react';
import { alertsService } from '@/services/alerts.service';
import { Alert } from '@/types/alert';

interface UseAutoRefreshAlertsOptions {
  interval?: number; // En milisegundos. Default: 5000 (5 segundos)
  enabled?: boolean; // Default: true
  onAlertsChange?: (alerts: Alert[]) => void;
  onError?: (error: Error) => void;
}

interface UseAutoRefreshAlertsReturn {
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook para auto-refresh inteligente de alertas
 * - Polling cada N segundos
 * - Solo actualiza si hay cambios reales
 * - Maneja errores gracefully
 */
export function useAutoRefreshAlerts(options: UseAutoRefreshAlertsOptions = {}): UseAutoRefreshAlertsReturn {
  const {
    interval = 5000, // 5 segundos
    enabled = true,
    onAlertsChange,
    onError,
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const lastAlertsRef = useRef<Alert[] | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef(false);
  const isFirstLoadRef = useRef(true);

  // Guardar callbacks en refs para evitar que causen re-renders del effect
  const callbacksRef = useRef({ onAlertsChange, onError });

  useEffect(() => {
    callbacksRef.current = { onAlertsChange, onError };
  }, [onAlertsChange, onError]);

  const fetchAlerts = async () => {
    // Evitar múltiples llamadas simultáneas
    if (isRunningRef.current) return;

    isRunningRef.current = true;

    try {
      const alerts = await alertsService.getAlerts();

      // Comparar con las alertas anteriores
      const hasChanged = JSON.stringify(lastAlertsRef.current) !== JSON.stringify(alerts);

      if (hasChanged) {
        lastAlertsRef.current = alerts;
        callbacksRef.current.onAlertsChange?.(alerts);
      }

      setError(null);

      // Solo setear isLoading a false en la primera carga
      if (isFirstLoadRef.current) {
        setIsLoading(false);
        isFirstLoadRef.current = false;
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      callbacksRef.current.onError?.(error);

      // Si es primera carga, también setear isLoading a false
      if (isFirstLoadRef.current) {
        setIsLoading(false);
        isFirstLoadRef.current = false;
      }
    } finally {
      isRunningRef.current = false;
    }
  };

  useEffect(() => {
    if (!enabled) {
      // Limpiar intervalo si se deshabilita
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Fetch inicial inmediato
    fetchAlerts();

    // Configurar polling
    intervalRef.current = setInterval(fetchAlerts, interval);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, interval]);

  // Cleanup en unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { isLoading, error };
}
