import { AlertStatus } from '@/types/alert';

// Alert Status Configuration
export const ALERT_STATUS_CONFIG: Record<
  AlertStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
  }
> = {
  NEW: {
    label: 'Nueva',
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200',
  },
  IN_REVIEW: {
    label: 'En Revisión',
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
  },
  IN_PROGRESS: {
    label: 'En Progreso',
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200',
  },
  ESCALATED: {
    label: 'Escalada',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
  },
  CLOSED: {
    label: 'Cerrada',
    color: 'gray',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-200',
  },
  TEST: {
    label: 'Prueba',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'quickcalc_token',
  USER: 'quickcalc_user',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    ME: '/auth/me',
  },
  DASHBOARD: {
    SUMMARY: '/dashboard/summary',
    RECENT_ALERTS: '/dashboard/recent-alerts',
  },
  ALERTS: {
    LIST: '/alerts',
    DETAIL: (id: number | string) => `/alerts/${id}`,
    UPDATE_STATUS: (id: number | string) => `/alerts/${id}/status`,
    ADD_LOCATION: (id: number | string) => `/alerts/${id}/location`,
    LOGS: (id: number | string) => `/alerts/${id}/logs`,
  },
  OPERATORS: {
    LIST: '/operators',
    DETAIL: (id: number | string) => `/operators/${id}`,
    CREATE: '/operators',
  },
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'QuickCalc Dashboard',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistema de Gestión de Alertas de Emergencia',
  ORGANIZATION: 'Línea Violeta',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// Date Formats
export const DATE_FORMATS = {
  FULL: 'dd/MM/yyyy HH:mm:ss',
  SHORT: 'dd/MM/yyyy',
  TIME: 'HH:mm',
  DATETIME: 'dd/MM/yyyy HH:mm',
} as const;
