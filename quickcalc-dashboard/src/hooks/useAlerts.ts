'use client';

import { useState, useEffect, useCallback } from 'react';
import { alertsService } from '@/services/alerts.service';
import {
  Alert,
  AlertDetail,
  UpdateAlertStatusPayload,
  AlertLog,
} from '@/types/alert';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await alertsService.getAlerts();
      setAlerts(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar alertas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    alerts,
    isLoading,
    error,
    refetch: fetchAlerts,
  };
}

export function useAlertDetail(id: number | string) {
  const [alert, setAlert] = useState<AlertDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlert = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await alertsService.getAlertById(id);
      setAlert(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar detalle de alerta');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const updateStatus = async (payload: UpdateAlertStatusPayload) => {
    try {
      await alertsService.updateAlertStatus(id, payload);
      await fetchAlert(); // Refetch to get updated data
    } catch (err: any) {
      throw new Error(err.message || 'Error al actualizar estado');
    }
  };

  useEffect(() => {
    if (id) {
      fetchAlert();
    }
  }, [id, fetchAlert]);

  return {
    alert,
    isLoading,
    error,
    refetch: fetchAlert,
    updateStatus,
  };
}

export function useAlertLogs(id: number | string) {
  const [logs, setLogs] = useState<AlertLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await alertsService.getAlertLogs(id);
      setLogs(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar historial');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchLogs();
    }
  }, [id, fetchLogs]);

  return {
    logs,
    isLoading,
    error,
    refetch: fetchLogs,
  };
}
