import * as Location from 'expo-location';
import { LOCATION_TIMEOUT } from '../lib/constants';
import { silentError } from '../lib/utils';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

/**
 * Solicitar permisos de ubicación
 */
export async function requestLocationPermission(): Promise<boolean> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    silentError('Location permission error');
    return false;
  }
}

/**
 * Obtener ubicación actual
 */
export async function getCurrentLocation(): Promise<LocationData | null> {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      silentError('Location permission denied');
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy || undefined,
    };
  } catch (error) {
    silentError('Error getting location');
    return null;
  }
}

/**
 * Obtener ubicación con timeout
 */
export async function getLocationWithTimeout(timeoutMs: number = LOCATION_TIMEOUT): Promise<LocationData | null> {
  return Promise.race([
    getCurrentLocation(),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), timeoutMs)),
  ]);
}
