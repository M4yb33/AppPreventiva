import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CalculatorDisplayProps {
  value: string;
}

export function CalculatorDisplay({ value }: CalculatorDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.display}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: 100,
  },
  display: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'right',
  },
});
