'use client';

import Link from 'next/link';
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronRight, AlertTriangle, Loader2 } from 'lucide-react';
import { Alert } from '@/types/alert';
import { getTriggerTypeLabel } from '@/lib/alert-labels';
import { AlertStatusBadge } from './AlertStatusBadge';
import styles from './AlertsTable.module.css';

interface AlertsTableProps {
  alerts: Alert[];
  isLoading?: boolean;
  error?: string | null;
}

export function AlertsTable({ alerts, isLoading, error }: AlertsTableProps) {
  console.log('🔍 AlertsTable render:', { alertsCount: alerts.length, isLoading, hasError: !!error });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader2 size={24} className={styles.spinner} />
        <p>Cargando alertas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <AlertTriangle size={20} />
        <p>{error}</p>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <AlertTriangle size={32} />
        </div>
        <p className={styles.emptyTitle}>No hay alertas</p>
        <p className={styles.emptySubtitle}>
          No hay alertas registradas en este momento
        </p>
      </div>
    );
  }

  console.log('✅ AlertsTable rendering table with', alerts.length, 'alerts');

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.thId}>ID</th>
            <th className={styles.thDevice}>Dispositivo</th>
            <th className={styles.thType}>Tipo</th>
            <th className={styles.thTime}>Hora</th>
            <th className={styles.thStatus}>Estado</th>
            <th className={styles.thAction}></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {alerts.map((alert) => {
            try {
              return (
                <tr key={alert.alertId} className={styles.row}>
                  <td className={styles.tdId}>
                    <code className={styles.code}>#{alert.alertId}</code>
                  </td>
                  <td className={styles.tdDevice}>
                    <div className={styles.deviceInfo}>
                      <span className={styles.deviceAlias}>
                        {alert.deviceAlias || 'Sin nombre'}
                      </span>
                      <span className={styles.deviceUuid}>
                        {alert.deviceId}
                      </span>
                    </div>
                  </td>
                  <td className={styles.tdType}>
                    <span className={styles.triggerBadge}>
                      {getTriggerTypeLabel(alert.triggerType)}
                    </span>
                  </td>
                  <td className={styles.tdTime}>
                    <time
                      dateTime={alert.triggeredAt}
                      title={format(
                        new Date(alert.triggeredAt),
                        'dd/MM/yyyy HH:mm:ss',
                        { locale: es }
                      )}
                    >
                      {formatDistanceToNow(new Date(alert.triggeredAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </time>
                  </td>
                  <td className={styles.tdStatus}>
                    <AlertStatusBadge status={alert.status} />
                  </td>
                  <td className={styles.tdAction}>
                    <Link href={`/alerts/${alert.alertId}`} className={styles.actionLink}>
                      <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              );
            } catch (err) {
              console.error('❌ Error rendering alert row:', alert, err);
              return (
                <tr key={alert.alertId}>
                  <td colSpan={6} style={{ padding: '1rem', color: 'red' }}>
                    Error rendering alert #{alert.alertId}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
