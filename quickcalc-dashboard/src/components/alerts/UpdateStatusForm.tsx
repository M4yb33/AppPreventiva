'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, AlertStatus, UpdateAlertStatusPayload } from '@/types/alert';
import { ALERT_STATUS_CONFIG } from '@/lib/constants';
import { Loader2, Check } from 'lucide-react';
import styles from './UpdateStatusForm.module.css';

interface UpdateStatusFormProps {
  alert: Alert;
  onSubmit: (payload: UpdateAlertStatusPayload) => Promise<void>;
  isLoading?: boolean;
}

const STATUS_OPTIONS: AlertStatus[] = [
  'NEW',
  'IN_REVIEW',
  'IN_PROGRESS',
  'ESCALATED',
  'CLOSED',
];

export function UpdateStatusForm({
  alert,
  onSubmit,
  isLoading = false,
}: UpdateStatusFormProps) {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm<UpdateAlertStatusPayload>({
    defaultValues: {
      status: alert.status,
      note: '',
    },
  });

  const watchedStatus = watch('status');
  const watchedNote = watch('note');

  const handleFormSubmit = async (data: UpdateAlertStatusPayload) => {
    try {
      await onSubmit(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className={styles.section}>
        <label className={styles.label}>
          <span className={styles.labelText}>Cambiar Estado</span>
          <select
            {...register('status')}
            className={styles.select}
            disabled={isLoading}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {ALERT_STATUS_CONFIG[status].label}
              </option>
            ))}
          </select>
        </label>

        {watchedStatus !== alert.status && (
          <p className={styles.hint}>
            Cambio de <strong>{ALERT_STATUS_CONFIG[alert.status].label}</strong> a{' '}
            <strong>{ALERT_STATUS_CONFIG[watchedStatus].label}</strong>
          </p>
        )}
      </div>

      <div className={styles.section}>
        <label className={styles.label}>
          <span className={styles.labelText}>Agregar Observación (Opcional)</span>
          <textarea
            {...register('note')}
            placeholder="Ej: Se ha contactado con el operador. Situación bajo control."
            className={styles.textarea}
            disabled={isLoading}
            rows={4}
          />
        </label>
        {watchedNote && (
          <p className={styles.charCount}>
            {watchedNote.length} caracteres
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          disabled={isLoading || watchedStatus === alert.status}
          className={styles.submitBtn}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className={styles.spinner} />
              Guardando...
            </>
          ) : (
            <>
              <Check size={18} />
              Guardar Cambios
            </>
          )}
        </button>
      </div>

      {success && (
        <div className={styles.success}>
          ✓ Cambios guardados correctamente
        </div>
      )}
    </form>
  );
}
