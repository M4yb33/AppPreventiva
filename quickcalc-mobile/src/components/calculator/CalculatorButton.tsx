import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CalculatorButtonProps {
  label: string;
  onPress: () => void;
  type?: 'number' | 'operator' | 'equals' | 'delete' | 'clear';
}

export function CalculatorButton({
  label,
  onPress,
  type = 'number',
}: CalculatorButtonProps) {
  const getBackgroundColor = () => {
    switch (type) {
      case 'operator':
        return '#FF9500';
      case 'equals':
        return '#4CAF50';
      case 'delete':
      case 'clear':
        return '#D4D4D4';
      case 'number':
      default:
        return '#323232';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'delete':
      case 'clear':
        return '#000000';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.buttonText,
          { color: getTextColor() },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '400',
  },
});
