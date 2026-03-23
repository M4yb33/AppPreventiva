import api from './api';
import { DeviceInfo, DeviceRegistrationPayload } from '../types/device';
import { getPlatform, generateDeviceUUID } from '../lib/utils';
import { getDeviceInfo, saveDeviceInfo } from '../storage/secureStorage';

/**
 * Registrar dispositivo en el backend
 */
export async function registerDevice(
  alias?: string
): Promise<DeviceInfo | null> {
  try {
    // Obtener o generar UUID
    let uuid = '';
    const existing = await getDeviceInfo();

    if (existing?.uuid) {
      uuid = existing.uuid;
    } else {
      uuid = generateDeviceUUID();
    }

    // Preparar payload
    const payload: DeviceRegistrationPayload = {
      deviceUuid: uuid,
      alias: alias || undefined,
      platform: getPlatform(),
    };

    // Enviar al servidor
    const response = await api.post('/devices/register', payload);

    if (response.data.success) {
      // Guardar localmente
      await saveDeviceInfo(uuid, alias);

      return {
        deviceUuid: uuid,
        alias,
        platform: getPlatform(),
        isConfigured: false,
        installedAt: new Date().toISOString(),
      };
    }

    return null;
  } catch (error) {
    console.log('[Device] Registration error (silent)');
    return null;
  }
}

/**
 * Obtener información del dispositivo registrado
 */
export async function getRegisteredDevice(): Promise<DeviceInfo | null> {
  try {
    const info = await getDeviceInfo();
    if (!info?.uuid) return null;

    return {
      deviceUuid: info.uuid,
      alias: info.alias,
      platform: getPlatform(),
      isConfigured: true,
      installedAt: new Date().toISOString(),
    };
  } catch (error) {
    return null;
  }
}
