'use client';

import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '@/services/dashboard.service';
import { DashboardSummary, RecentAlert } from '@/types/dashboard';

export function useDashboardSummary() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await dashboardService.getSummary();
      setSummary(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar resumen');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary,
    isLoading,
    error,
    refetch: fetchSummary,
  };
}

export function useRecentAlerts() {
  const [alerts, setAlerts] = useState<RecentAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await dashboardService.getRecentAlerts();
      setAlerts(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar alertas recientes');
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
