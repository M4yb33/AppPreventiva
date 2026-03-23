/**
 * Translate alert actions to user-friendly labels
 */
export function getAlertActionLabel(action: string): string {
  const labels: Record<string, string> = {
    ALERT_CREATED: '🚨 Alerta creada',
    STATUS_CHANGED: '📋 Estado actualizado',
    LOCATION_ADDED: '📍 Ubicación agregada',
    NOTE_ADDED: '📝 Nota agregada',
    ASSIGNED: '👤 Asignada',
  };

  return labels[action] || action;
}

/**
 * Translate alert status to user-friendly labels
 */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    NEW: 'Nueva',
    IN_REVIEW: 'En revisión',
    IN_PROGRESS: 'En progreso',
    ESCALATED: 'Escalada',
    CLOSED: 'Cerrada',
    TEST: 'Prueba',
  };

  return labels[status] || status;
}

/**
 * Translate trigger types to user-friendly labels
 */
export function getTriggerTypeLabel(triggerType: string): string {
  const labels: Record<string, string> = {
    PANIC_CODE: '🚨 Pánico',
    TEST_MODE: '🧪 Prueba',
  };

  return labels[triggerType] || triggerType;
}

/**
 * Translate log details to user-friendly text
 * Handles both old and new formats from backend
 */
export function translateLogDetails(details: string | null): string | null {
  if (!details) return null;

  // Map status codes to Spanish
  const statusMap: Record<string, string> = {
    NEW: 'Nueva',
    IN_REVIEW: 'En revisión',
    IN_PROGRESS: 'En progreso',
    ESCALATED: 'Escalada',
    CLOSED: 'Cerrada',
    TEST: 'Prueba',
  };

  // Map trigger types to Spanish
  const triggerMap: Record<string, string> = {
    PANIC_CODE: 'Código de pánico',
    TEST_MODE: 'Modo de prueba',
  };

  let translated = details;

  // Handle old format: "Alert created via PANIC_CODE"
  translated = translated.replace(
    /Alert created via (\w+)/g,
    (match, trigger) => `Alerta creada automáticamente (${triggerMap[trigger] || trigger})`
  );

  // Handle old format: "Status changed from NEW to IN_REVIEW"
  translated = translated.replace(
    /Status changed from (\w+) to (\w+)/g,
    (match, from, to) => `Estado: ${statusMap[from] || from} → ${statusMap[to] || to}`
  );

  // Replace status codes in other contexts
  Object.entries(statusMap).forEach(([code, label]) => {
    translated = translated.replace(new RegExp(`\\b${code}\\b`, 'g'), label);
  });

  // Replace trigger codes in other contexts
  Object.entries(triggerMap).forEach(([code, label]) => {
    translated = translated.replace(new RegExp(`\\b${code}\\b`, 'g'), label);
  });

  return translated;
}


