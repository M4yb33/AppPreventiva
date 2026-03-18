import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '../lib/constants';
import { silentError } from '../lib/utils';

/**
 * Guardar datos de forma segura
 */
export async function setSecureItem(key: string, value: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    silentError('Error saving secure item: ' + key);
  }
}

/**
 * Recuperar datos de forma segura
 */
export async function getSecureItem(key: string): Promise<string | null> {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value || null;
  } catch (error) {
    silentError('Error reading secure item: ' + key);
    return null;
  }
}

/**
 * Eliminar datos de forma segura
 */
export async function removeSecureItem(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    silentError('Error removing secure item: ' + key);
  }
}

/**
 * Guardar información del dispositivo
 */
export async function saveDeviceInfo(uuid: string, alias?: string): Promise<void> {
  const data = JSON.stringify({
    deviceUuid: uuid,
    alias: alias || '',
    timestamp: new Date().toISOString(),
  });
  await setSecureItem(STORAGE_KEYS.DEVICE_UUID, uuid);
  await setSecureItem(STORAGE_KEYS.DEVICE_INFO, data);
}

/**
 * Recuperar información del dispositivo
 */
export async function getDeviceInfo(): Promise<{ uuid: string; alias?: string } | null> {
  try {
    const uuid = await getSecureItem(STORAGE_KEYS.DEVICE_UUID);
    if (!uuid) return null;

    const infoStr = await getSecureItem(STORAGE_KEYS.DEVICE_INFO);
    if (!infoStr) return { uuid };

    const info = JSON.parse(infoStr);
    return { uuid: info.deviceUuid, alias: info.alias };
  } catch (error) {
    silentError('Error getting device info');
    return null;
  }
}

/**
 * Guardar configuración de códigos
 */
export async function saveAppConfig(
  panicCode: string,
  settingsCode: string,
  alias?: string
): Promise<void> {
  const data = JSON.stringify({
    panicCode,
    settingsCode,
    alias: alias || '',
    isConfigured: true,
    timestamp: new Date().toISOString(),
  });
  await setSecureItem(STORAGE_KEYS.APP_CONFIG, data);
  await setSecureItem(STORAGE_KEYS.IS_CONFIGURED, 'true');
}

/**
 * Recuperar configuración de códigos
 */
export async function getAppConfig(): Promise<{
  panicCode: string;
  settingsCode: string;
  alias?: string;
} | null> {
  try {
    const configStr = await getSecureItem(STORAGE_KEYS.APP_CONFIG);
    if (!configStr) return null;
    return JSON.parse(configStr);
  } catch (error) {
    silentError('Error getting app config');
    return null;
  }
}

/**
 * Verificar si la app está configurada
 */
export async function isAppConfigured(): Promise<boolean> {
  const configured = await getSecureItem(STORAGE_KEYS.IS_CONFIGURED);
  return configured === 'true';
}
