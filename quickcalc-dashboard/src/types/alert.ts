export type AlertStatus =
  | 'NEW'
  | 'IN_REVIEW'
  | 'IN_PROGRESS'
  | 'ESCALATED'
  | 'CLOSED'
  | 'TEST';

export type TriggerType = 'PANIC_CODE' | 'TEST_MODE';

export interface Device {
  deviceId: number;
  deviceUuid: string;
  alias: string | null;
  platform: string;
  isConfigured?: boolean;
}

export interface AlertLocation {
  locationId: number;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  capturedAt: string;
}

export interface AlertLog {
  logId: number;
  action: string;
  details: string | null;
  createdAt: string;
}

export interface Alert {
  alertId: number;
  deviceId: number;
  deviceAlias: string | null;
  devicePlatform?: string;
  status: AlertStatus;
  triggerType: TriggerType;
  triggeredAt: string;
  latitude: number;
  longitude: number;
  assignedTo: string | null;
  notes: string | null;
  internetAttempted?: boolean;
  internetDelivered: boolean;
  smsAttempted?: boolean;
  smsDelivered: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AlertDetail extends Alert {
  device: Device;
  locations: AlertLocation[];
  logs: AlertLog[];
}

export interface UpdateAlertStatusPayload {
  status: AlertStatus;
  note?: string;
  performedBy?: string;
}

export interface AddLocationPayload {
  latitude: number;
  longitude: number;
  accuracy?: number;
}
