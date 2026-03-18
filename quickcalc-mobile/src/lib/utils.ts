import * as UUID from 'expo-modules-core';
import { Platform } from 'react-native';

/**
 * Generar UUID único para el dispositivo
 */
export function generateDeviceUUID(): string {
  // Formato simple: timestamp + random
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
}

/**
 * Obtener plataforma del dispositivo
 */
export function getPlatform(): 'android' | 'ios' {
  return Platform.OS as 'android' | 'ios';
}

/**
 * Validar código (solo números)
 */
export function isValidCode(code: string): boolean {
  return /^\d+$/.test(code);
}

/**
 * Formatear número para display de calculadora
 */
export function formatDisplayNumber(num: string | number): string {
  const str = String(num);
  const parts = str.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * Validar código de emergencia
 */
export function isEmergencyCode(input: string, panicCode: string): boolean {
  return input === panicCode;
}

/**
 * Validar código de configuración
 */
export function isSettingsCode(input: string, settingsCode: string): boolean {
  return input === settingsCode;
}

/**
 * Log oculto (solo en desarrollo)
 */
export function debugLog(message: string, data?: any) {
  if (__DEV__) {
    console.log(`[QuickCalc Debug] ${message}`, data || '');
  }
}

/**
 * Simular error oculto
 */
export function silentError(error: Error | string) {
  if (__DEV__) {
    console.error('[QuickCalc Error]', error);
  }
  // En producción, no mostrar nada
}
