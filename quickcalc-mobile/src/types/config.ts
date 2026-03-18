export interface AppConfig {
  alias?: string;
  panicCode: string;
  settingsCode: string;
  isConfigured: boolean;
  trustedContacts: TrustedContact[];
  lastUpdated: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  relationship?: string;
  priority: number;
}
