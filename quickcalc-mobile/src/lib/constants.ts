export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// Códigos ocultos por defecto
export const DEFAULT_PANIC_CODE = '2580';
export const DEFAULT_SETTINGS_CODE = '0000';

// Timeouts
export const LOCATION_TIMEOUT = 10000; // 10 segundos
export const API_TIMEOUT = 15000; // 15 segundos

// Almacenamiento local
export const STORAGE_KEYS = {
  DEVICE_INFO: 'quickcalc_device_info',
  APP_CONFIG: 'quickcalc_app_config',
  DEVICE_UUID: 'quickcalc_device_uuid',
  IS_CONFIGURED: 'quickcalc_is_configured',
} as const;

// Estados
export const APP_STATES = {
  IDLE: 'IDLE',
  SENDING_ALERT: 'SENDING_ALERT',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
} as const;

// Mensajes (ocultos - no mostrar al usuario)
export const HIDDEN_MESSAGES = {
  ALERT_SENT: '✓',
  ERROR: 'Error',
  NO_INTERNET: 'Sin conexión',
} as const;
