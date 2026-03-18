'use client';

import { AlertLog } from '@/types/alert';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Activity, Loader2 } from 'lucide-react';
import { getAlertActionLabel, translateLogDetails } from '@/lib/alert-labels';
import styles from './AlertLogsList.module.css';

interface AlertLogsListProps {
  logs: AlertLog[];
  isLoading?: boolean;
  error?: string | null;
}

export function AlertLogsList({ logs, isLoading, error }: AlertLogsListProps) {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader2 size={20} className={styles.spinner} />
        <p>Cargando historial...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className={styles.empty}>
        <Activity size={24} />
        <p>No hay registro de cambios</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {logs.map((log, index) => (
        <div key={log.logId} className={styles.item}>
          {/* Timeline dot and line */}
          <div className={styles.timeline}>
            <div className={styles.dot} />
            {index < logs.length - 1 && <div className={styles.line} />}
          </div>

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.header}>
              <span className={styles.action}>{getAlertActionLabel(log.action)}</span>
              <time className={styles.time} dateTime={log.createdAt}>
                {format(new Date(log.createdAt), 'dd/MM/yyyy HH:mm', {
                  locale: es,
                })}
              </time>
            </div>

            {log.details && (
              <div className={styles.details}>{translateLogDetails(log.details)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
