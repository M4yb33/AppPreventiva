import { useState, useCallback, useEffect } from 'react';
import { isEmergencyCode, isSettingsCode, silentError } from '../lib/utils';
import { getAppConfig } from '../storage/secureStorage';
import { DEFAULT_PANIC_CODE, DEFAULT_SETTINGS_CODE } from '../lib/constants';

export interface HiddenCodeDetection {
  type: 'PANIC' | 'SETTINGS' | null;
  detected: boolean;
}

export function useHiddenCodes() {
  const [inputBuffer, setInputBuffer] = useState('');
  const [panicCode, setPanicCode] = useState(DEFAULT_PANIC_CODE);
  const [settingsCode, setSettingsCode] = useState(DEFAULT_SETTINGS_CODE);

  // Cargar códigos al iniciar
  useEffect(() => {
    loadCodes();
  }, []);

  const loadCodes = useCallback(async () => {
    try {
      const config = await getAppConfig();
      if (config) {
        setPanicCode(config.panicCode);
        setSettingsCode(config.settingsCode);
      }
    } catch (error) {
      silentError('Error loading codes');
    }
  }, []);

  const detectCode = useCallback(
    (input: string): HiddenCodeDetection => {
      // Solo procesar si el input termina con '='
      if (!input.endsWith('=')) {
        return { type: null, detected: false };
      }

      // Remover el '=' para comparar
      const codeInput = input.slice(0, -1);

      if (isEmergencyCode(codeInput, panicCode)) {
        silentError('Emergency code detected');
        return { type: 'PANIC', detected: true };
      }

      if (isSettingsCode(codeInput, settingsCode)) {
        silentError('Settings code detected');
        return { type: 'SETTINGS', detected: true };
      }

      return { type: null, detected: false };
    },
    [panicCode, settingsCode]
  );

  const onNumberPress = useCallback(
    (num: string): boolean => {
      const newBuffer = inputBuffer + num;
      setInputBuffer(newBuffer);

      // Limitar buffer para no ocupar memoria
      if (newBuffer.length > 10) {
        setInputBuffer(newBuffer.slice(-10));
      }

      return false;
    },
    [inputBuffer]
  );

  const onEqualsPress = useCallback(
    (fullInput: string): HiddenCodeDetection => {
      const detection = detectCode(fullInput);
      if (detection.detected) {
        setInputBuffer('');
      }
      return detection;
    },
    [detectCode]
  );

  const onClear = useCallback(() => {
    setInputBuffer('');
  }, []);

  return {
    detectCode,
    onNumberPress,
    onEqualsPress,
    onClear,
    inputBuffer,
    setInputBuffer,
    panicCode,
    settingsCode,
  };
}
