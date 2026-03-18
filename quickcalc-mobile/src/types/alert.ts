export interface AlertPayload {
  deviceUuid: string;
  alias?: string;
  triggerType: 'PANIC_CODE';
  latitude?: number;
  longitude?: number;
  accuracy?: number;
}

export interface AlertResponse {
  success: boolean;
  message: string;
  data?: {
    alertId: number;
    status: string;
  };
}
