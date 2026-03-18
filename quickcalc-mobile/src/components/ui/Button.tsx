import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'calculator';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        styles[variant],
        styles[`size_${size}`],
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${variant}`],
          styles[`textSize_${size}`],
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Variantes
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#E8E8E8',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  calculator: {
    backgroundColor: '#E8E8E8',
    flex: 1,
    margin: 6,
    borderRadius: 10,
  },
  // Tamaños
  size_small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  size_medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  size_large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  // Textos
  text: {
    fontWeight: '600',
  },
  text_primary: {
    color: '#FFFFFF',
  },
  text_secondary: {
    color: '#333333',
  },
  text_danger: {
    color: '#FFFFFF',
  },
  text_calculator: {
    color: '#333333',
  },
  textSize_small: {
    fontSize: 14,
  },
  textSize_medium: {
    fontSize: 16,
  },
  textSize_large: {
    fontSize: 18,
  },
  // Deshabilitado
  disabled: {
    opacity: 0.5,
  },
});
