'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { alertsService } from '@/services/alerts.service';
import { Alert } from '@/types/alert';
import { AlertsTable } from '@/components/alerts/AlertsTable';
import styles from './page.module.css';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await alertsService.getAlerts();
        setAlerts(data);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message || 'Error al cargar las alertas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    const matchSearch =
      alert.alertId.toString().includes(searchTerm) ||
      (alert.deviceAlias?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchStatus = !statusFilter || alert.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout pageTitle="Alertas">
      <div className={styles.container}>
        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Buscar por ID o dispositivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.input}
            />
          </div>

          <select
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value || null)}
            className={styles.select}
          >
            <option value="">Todos los estados</option>
            <option value="NEW">Nueva</option>
            <option value="IN_REVIEW">En Revisión</option>
            <option value="IN_PROGRESS">En Progreso</option>
            <option value="ESCALATED">Escalada</option>
            <option value="CLOSED">Cerrada</option>
          </select>

          {(searchTerm || statusFilter) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter(null);
              }}
              className={styles.clearBtn}
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Results info */}
        <div className={styles.resultsInfo}>
          Mostrando <strong>{filteredAlerts.length}</strong> de{' '}
          <strong>{alerts.length}</strong> alertas
        </div>

        {/* Table */}
        <AlertsTable
          alerts={filteredAlerts}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </DashboardLayout>
  );
}
