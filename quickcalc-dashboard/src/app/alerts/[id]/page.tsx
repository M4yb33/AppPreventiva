'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { alertsService } from '@/services/alerts.service';
import { AlertDetail } from '@/types/alert';
import { AlertDetailCard } from '@/components/alerts/AlertDetailCard';
import { UpdateStatusForm } from '@/components/alerts/UpdateStatusForm';
import { AlertLogsList } from '@/components/alerts/AlertLogsList';
import { openMapsLocation } from '@/lib/maps';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

interface PageProps {
  params: {
    id: string;
  };
}

export default function AlertDetailPage({ params }: PageProps) {
  const [alert, setAlert] = useState<AlertDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await alertsService.getAlertById(params.id);
        setAlert(data);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message || 'Error al cargar la alerta');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlert();
  }, [params.id]);

  const handleStatusUpdate = async (payload: any) => {
    if (!alert) return;

    try {
      setIsUpdating(true);
      setUpdateError(null);
      await alertsService.updateAlertStatus(alert.alertId, payload);

      // Reload alert data
      const updatedAlert = await alertsService.getAlertById(params.id);
      setAlert(updatedAlert);
    } catch (err: any) {
      console.error('Error:', err);
      setUpdateError(err.message || 'Error al actualizar la alerta');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenMap = () => {
    if (alert) {
      openMapsLocation(alert.latitude, alert.longitude);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Detalle de Alerta">
        <div className={styles.loading}>
          <Loader2 size={32} className={styles.spinner} />
          <p>Cargando alerta...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !alert) {
    return (
      <DashboardLayout pageTitle="Detalle de Alerta">
        <div className={styles.container}>
          <Link href="/alerts" className={styles.backLink}>
            <ArrowLeft size={18} />
            Volver
          </Link>
          <div className={styles.errorCard}>
            <AlertTriangle size={32} />
            <p>{error || 'No se encontró la alerta'}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Detalle de Alerta">
      <div className={styles.container}>
        {/* Back button */}
        <Link href="/alerts" className={styles.backLink}>
          <ArrowLeft size={18} />
          Volver a Alertas
        </Link>

        {/* Layout grid */}
        <div className={styles.grid}>
          {/* Main content - 2/3 width */}
          <div className={styles.mainContent}>
            {/* Alert detail */}
            <AlertDetailCard alert={alert} onOpenMap={handleOpenMap} />

            {/* Activity logs */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Historial de Cambios</h2>
              <AlertLogsList logs={alert.logs} />
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <aside className={styles.sidebar}>
            {updateError && (
              <div className={styles.errorAlert}>
                <AlertTriangle size={18} />
                <p>{updateError}</p>
              </div>
            )}

            <UpdateStatusForm
              alert={alert}
              onSubmit={handleStatusUpdate}
              isLoading={isUpdating}
            />
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
