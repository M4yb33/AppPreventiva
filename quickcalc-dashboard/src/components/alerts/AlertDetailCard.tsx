'use client';

import { AlertDetail, AlertStatus } from '@/types/alert';
import { ALERT_STATUS_CONFIG } from '@/lib/constants';
import { getStatusLabel, getTriggerTypeLabel } from '@/lib/alert-labels';
import { AlertStatusBadge } from './AlertStatusBadge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MapPin, Clock, AlertTriangle } from 'lucide-react';
import styles from './AlertDetailCard.module.css';

interface AlertDetailCardProps {
  alert: AlertDetail;
  onOpenMap?: () => void;
}

export function AlertDetailCard({ alert, onOpenMap }: AlertDetailCardProps) {
  return (
    <div className={styles.card}>
      {/* Header with status */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>
            <span className={styles.id}>#{alert.alertId}</span>
            <span>{alert.deviceAlias || 'Dispositivo Sin Nombre'}</span>
          </h2>
          <p className={styles.subtitle}>
            {getTriggerTypeLabel(alert.triggerType)}
          </p>
        </div>
        <AlertStatusBadge status={alert.status} size="lg" />
      </div>

      {/* Grid de información */}
      <div className={styles.grid}>
        {/* Timing */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Temporalidad</h3>
          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span className={styles.label}>
                <Clock size={16} />
                Registrada:
              </span>
              <time dateTime={alert.triggeredAt}>
                {format(
                  new Date(alert.triggeredAt),
                  'dd/MM/yyyy HH:mm:ss',
                  { locale: es }
                )}
              </time>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Ubicación</h3>
          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span className={styles.label}>
                <MapPin size={16} />
                Coordenadas:
              </span>
              <code className={styles.code}>
                {alert.latitude && alert.longitude
                  ? `${alert.latitude.toFixed(6)}, ${alert.longitude.toFixed(6)}`
                  : 'No disponible'}
              </code>
            </div>
            {onOpenMap && alert.latitude && alert.longitude && (
              <button onClick={onOpenMap} className={styles.mapBtn}>
                📍 Abrir en Google Maps
              </button>
            )}
          </div>
        </div>

        {/* Device */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Dispositivo</h3>
          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span className={styles.label}>ID:</span>
              <code className={styles.code}>{alert.deviceId}</code>
            </div>
            {alert.device.platform && (
              <div className={styles.infoRow}>
                <span className={styles.label}>Plataforma:</span>
                <span>{alert.device.platform}</span>
              </div>
            )}
          </div>
        </div>

        {/* Assignment */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Asignación</h3>
          <div className={styles.info}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Asignado a:</span>
              <span>{alert.assignedTo || 'Sin asignar'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes section */}
      {alert.notes && (
        <div className={styles.notesSection}>
          <h3 className={styles.sectionTitle}>Observaciones</h3>
          <div className={styles.notes}>{alert.notes}</div>
        </div>
      )}

      {/* Delivery status */}
      <div className={styles.deliverySection}>
        <h3 className={styles.sectionTitle}>Estado de Entrega</h3>
        <div className={styles.deliveryGrid}>
          <div className={styles.deliveryItem}>
            <span className={styles.deliveryLabel}>Internet</span>
            <div className={styles.deliveryBadges}>
              {alert.internetAttempted && (
                <span className={styles.deliveryBadge}>
                  Intentado
                </span>
              )}
              {alert.internetDelivered && (
                <span className={`${styles.deliveryBadge} ${styles.success}`}>
                  ✓ Entregado
                </span>
              )}
            </div>
          </div>
          <div className={styles.deliveryItem}>
            <span className={styles.deliveryLabel}>SMS</span>
            <div className={styles.deliveryBadges}>
              {alert.smsAttempted && (
                <span className={styles.deliveryBadge}>
                  Intentado
                </span>
              )}
              {alert.smsDelivered && (
                <span className={`${styles.deliveryBadge} ${styles.success}`}>
                  ✓ Entregado
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
