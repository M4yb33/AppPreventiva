export interface DeviceInfo {
  deviceUuid: string;
  alias?: string;
  platform: 'android' | 'ios';
  isConfigured: boolean;
  installedAt: string;
}

export interface DeviceRegistrationPayload {
  deviceUuid: string;
  alias?: string;
  platform: 'android' | 'ios';
}
