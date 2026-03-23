import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalculatorButton } from './CalculatorButton';

interface CalculatorKeypadProps {
  onNumberPress: (num: string) => void;
  onOperationPress: (op: string) => void;
  onEqualsPress: () => void;
  onDecimalPress: () => void;
  onClearPress: () => void;
  onBackspacePress: () => void;
}

export function CalculatorKeypad({
  onNumberPress,
  onOperationPress,
  onEqualsPress,
  onDecimalPress,
  onClearPress,
  onBackspacePress,
}: CalculatorKeypadProps) {
  return (
    <View style={styles.container}>
      {/* Fila 1: C, Backspace, ÷ */}
      <View style={styles.row}>
        <CalculatorButton
          label="C"
          onPress={onClearPress}
          type="clear"
        />
        <CalculatorButton
          label="⌫"
          onPress={onBackspacePress}
          type="delete"
        />
        <CalculatorButton
          label="÷"
          onPress={() => onOperationPress('÷')}
          type="operator"
        />
      </View>

      {/* Fila 2: 7, 8, 9, × */}
      <View style={styles.row}>
        <CalculatorButton
          label="7"
          onPress={() => onNumberPress('7')}
        />
        <CalculatorButton
          label="8"
          onPress={() => onNumberPress('8')}
        />
        <CalculatorButton
          label="9"
          onPress={() => onNumberPress('9')}
        />
        <CalculatorButton
          label="×"
          onPress={() => onOperationPress('×')}
          type="operator"
        />
      </View>

      {/* Fila 3: 4, 5, 6, − */}
      <View style={styles.row}>
        <CalculatorButton
          label="4"
          onPress={() => onNumberPress('4')}
        />
        <CalculatorButton
          label="5"
          onPress={() => onNumberPress('5')}
        />
        <CalculatorButton
          label="6"
          onPress={() => onNumberPress('6')}
        />
        <CalculatorButton
          label="−"
          onPress={() => onOperationPress('-')}
          type="operator"
        />
      </View>

      {/* Fila 4: 1, 2, 3, + */}
      <View style={styles.row}>
        <CalculatorButton
          label="1"
          onPress={() => onNumberPress('1')}
        />
        <CalculatorButton
          label="2"
          onPress={() => onNumberPress('2')}
        />
        <CalculatorButton
          label="3"
          onPress={() => onNumberPress('3')}
        />
        <CalculatorButton
          label="+"
          onPress={() => onOperationPress('+')}
          type="operator"
        />
      </View>

      {/* Fila 5: 0, ., = */}
      <View style={styles.row}>
        <View style={styles.zeroButtonContainer}>
          <CalculatorButton
            label="0"
            onPress={() => onNumberPress('0')}
          />
        </View>
        <CalculatorButton
          label=","
          onPress={onDecimalPress}
        />
        <CalculatorButton
          label="="
          onPress={onEqualsPress}
          type="equals"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  zeroButtonContainer: {
    flex: 2,
  },
});
