import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { CalculatorContainer } from '../components/calculator/CalculatorContainer';
import { CalculatorDisplay } from '../components/calculator/CalculatorDisplay';
import { CalculatorKeypad } from '../components/calculator/CalculatorKeypad';
import { useCalculator } from '../hooks/useCalculator';
import { useHiddenCodes } from '../hooks/useHiddenCodes';
import { useEmergencyAlert } from '../hooks/useEmergencyAlert';
import { registerDevice } from '../services/device.service';
import { isAppConfigured } from '../storage/secureStorage';

export function CalculatorScreen({ navigation }: any) {
  const calculator = useCalculator();
  const codes = useHiddenCodes();
  const emergencyAlert = useEmergencyAlert();

  // Inicializar dispositivo al arrancar
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const isConfigured = await isAppConfigured();

      if (!isConfigured) {
        // Primer arranque: registrar dispositivo
        await registerDevice();
      }
    } catch (error) {
      console.log('[Calculator] Init error (silent)');
    }
  };

  const handleNumberPress = (num: string) => {
    calculator.handleNumber(num);
    codes.onNumberPress(num);
  };

  const handleEqualsPress = async () => {
    const fullInput = calculator.getFullInput();
    calculator.handleEquals();

    // Log para debugging
    console.log('[Calculator] Input before =:', fullInput);
    console.log('[Calculator] Testing code:', fullInput + '=');

    // Verificar si es un código oculto
    const detection = codes.onEqualsPress(fullInput + '=');

    console.log('[Calculator] Detection result:', detection);

    if (detection.detected) {
      switch (detection.type) {
        case 'PANIC':
          console.log('[Calculator] PANIC mode activated');
          // Activar alerta de emergencia
          await triggerPanicMode();
          break;
        case 'SETTINGS':
          console.log('[Calculator] SETTINGS mode - navigating...');
          // Navegar a configuración oculta
          navigation.navigate('HiddenConfig');
          break;
      }
    }
  };

  const triggerPanicMode = async () => {
    // No mostrar nada al usuario, ejecutar silenciosamente
    const sent = await emergencyAlert.triggerEmergencyAlert();

    if (sent) {
      // Resetear calculadora sin feedback visible
      calculator.resetCalculator();
    }
  };

  const handleClear = () => {
    calculator.handleClear();
    codes.onClear();
  };

  return (
    <CalculatorContainer>
      <CalculatorDisplay value={calculator.display} />
      <CalculatorKeypad
        onNumberPress={handleNumberPress}
        onOperationPress={calculator.handleOperation}
        onEqualsPress={handleEqualsPress}
        onDecimalPress={calculator.handleDecimal}
        onClearPress={handleClear}
        onBackspacePress={calculator.handleBackspace}
      />
    </CalculatorContainer>
  );
}
