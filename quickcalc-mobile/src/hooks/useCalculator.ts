import { useState, useCallback } from 'react';
import { formatDisplayNumber } from '../lib/utils';

interface CalculatorState {
  display: string;
  previousValue: string | null;
  operation: string | null;
  newNumber: boolean;
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    newNumber: true,
  });

  const handleNumber = useCallback((num: string) => {
    setState((prevState) => {
      if (prevState.newNumber) {
        return {
          ...prevState,
          display: num,
          newNumber: false,
        };
      }

      if (prevState.display === '0') {
        return {
          ...prevState,
          display: num,
        };
      }

      return {
        ...prevState,
        display: prevState.display + num,
      };
    });
  }, []);

  const handleOperation = useCallback((op: string) => {
    setState((prevState) => {
      if (prevState.operation === null) {
        return {
          ...prevState,
          previousValue: prevState.display,
          operation: op,
          newNumber: true,
        };
      }

      if (prevState.newNumber) {
        return {
          ...prevState,
          operation: op,
        };
      }

      const result = calculate(
        prevState.previousValue || '0',
        prevState.display,
        prevState.operation
      );

      return {
        ...prevState,
        display: result,
        previousValue: result,
        operation: op,
        newNumber: true,
      };
    });
  }, []);

  const handleEquals = useCallback(() => {
    setState((prevState) => {
      if (prevState.operation === null || prevState.previousValue === null) {
        return prevState;
      }

      const result = calculate(
        prevState.previousValue,
        prevState.display,
        prevState.operation
      );

      return {
        display: result,
        previousValue: null,
        operation: null,
        newNumber: true,
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState((prevState) => {
      if (prevState.newNumber) {
        return {
          ...prevState,
          display: '0.',
          newNumber: false,
        };
      }

      if (prevState.display.includes('.')) {
        return prevState;
      }

      return {
        ...prevState,
        display: prevState.display + '.',
      };
    });
  }, []);

  const handleClear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      newNumber: true,
    });
  }, []);

  const handleBackspace = useCallback(() => {
    setState((prevState) => {
      if (prevState.display.length === 1 || prevState.display === '0') {
        return {
          ...prevState,
          display: '0',
        };
      }

      return {
        ...prevState,
        display: prevState.display.slice(0, -1),
      };
    });
  }, []);

  const getFullInput = useCallback((): string => {
    return state.display;
  }, [state.display]);

  const resetCalculator = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      newNumber: true,
    });
  }, []);

  return {
    display: state.display,
    handleNumber,
    handleOperation,
    handleEquals,
    handleDecimal,
    handleClear,
    handleBackspace,
    getFullInput,
    resetCalculator,
  };
}

function calculate(prev: string, current: string, operation: string): string {
  const a = parseFloat(prev);
  const b = parseFloat(current);

  if (isNaN(a) || isNaN(b)) return '0';

  switch (operation) {
    case '+':
      return String(a + b);
    case '-':
      return String(a - b);
    case '×':
      return String(a * b);
    case '÷':
      return b === 0 ? '0' : String(a / b);
    default:
      return current;
  }
}
