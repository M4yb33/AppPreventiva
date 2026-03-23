'use client';

import { AlertStatus } from '@/types/alert';
import { ALERT_STATUS_CONFIG } from '@/lib/constants';
import styles from './AlertStatusBadge.module.css';

interface AlertStatusBadgeProps {
  status: AlertStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function AlertStatusBadge({ status, size = 'md' }: AlertStatusBadgeProps) {
  const config = ALERT_STATUS_CONFIG[status];

  return (
    <span
      className={`${styles.badge} ${styles[size]} ${styles[status.toLowerCase()]}`}
      title={config.label}
    >
      {config.label}
    </span>
  );
}
