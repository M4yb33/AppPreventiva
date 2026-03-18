import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CalculatorContainerProps {
  children: React.ReactNode;
}

export function CalculatorContainer({ children }: CalculatorContainerProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: 'flex-end',
  },
});
