import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CalculatorScreen } from './src/screens/CalculatorScreen';
import { HiddenConfigScreen } from './src/screens/HiddenConfigScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#000000' },
          }}
        >
          <Stack.Screen
            name="Calculator"
            component={CalculatorScreen}
            options={{ animationEnabled: false }}
          />
          <Stack.Screen
            name="HiddenConfig"
            component={HiddenConfigScreen}
            options={{
              animationEnabled: true,
              animationTypeForReplace: 'fade',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
