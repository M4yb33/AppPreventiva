import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/ui/Button';
import { getAppConfig, saveAppConfig } from '../storage/secureStorage';
import { DEFAULT_PANIC_CODE, DEFAULT_SETTINGS_CODE } from '../lib/constants';

export function HiddenConfigScreen({ navigation }: any) {
  const [alias, setAlias] = useState('');
  const [panicCode, setPanicCode] = useState(DEFAULT_PANIC_CODE);
  const [settingsCode, setSettingsCode] = useState(DEFAULT_SETTINGS_CODE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = await getAppConfig();

      if (config) {
        setAlias(config.alias || '');
        setPanicCode(config.panicCode || DEFAULT_PANIC_CODE);
        setSettingsCode(config.settingsCode || DEFAULT_SETTINGS_CODE);
      } else {
        // Si no hay configuración, usar defaults
        setAlias('');
        setPanicCode(DEFAULT_PANIC_CODE);
        setSettingsCode(DEFAULT_SETTINGS_CODE);
      }
    } catch (err) {
      console.error('[HiddenConfig] Error loading config:', err);
      setError('Error loading configuration');
      // Usar valores por defecto en caso de error
      setAlias('');
      setPanicCode(DEFAULT_PANIC_CODE);
      setSettingsCode(DEFAULT_SETTINGS_CODE);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!panicCode.trim() || !settingsCode.trim()) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (panicCode === settingsCode) {
      Alert.alert('Error', 'Codes must be different');
      return;
    }

    setLoading(true);

    try {
      await saveAppConfig(panicCode, settingsCode, alias);
      Alert.alert('Success', 'Configuration saved');
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      console.error('[HiddenConfig] Error saving config:', error);
      Alert.alert('Error', 'Failed to save configuration');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading configuration...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Device Configuration</Text>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.label}>Device Alias</Text>
          <TextInput
            style={styles.input}
            placeholder="Default: Untitled"
            placeholderTextColor="#999"
            value={alias}
            onChangeText={setAlias}
            editable={!loading}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Emergency Code</Text>
          <Text style={styles.hint}>
            Enter this code + = to trigger emergency alert
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Default: 2580"
            placeholderTextColor="#999"
            value={panicCode}
            onChangeText={setPanicCode}
            keyboardType="number-pad"
            editable={!loading}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Settings Code</Text>
          <Text style={styles.hint}>
            Enter this code + = to access configuration
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Default: 0000"
            placeholderTextColor="#999"
            value={settingsCode}
            onChangeText={setSettingsCode}
            keyboardType="number-pad"
            editable={!loading}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>
            • Dial emergency code + = to send alert{'\n'}
            • Dial settings code + = to open this screen{'\n'}
            • All data is stored securely
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Cancel"
          variant="secondary"
          onPress={() => navigation.goBack()}
          disabled={loading}
        />
        <Button
          title="Save"
          variant="primary"
          onPress={handleSave}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: '#000',
  },
  errorBox: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#000',
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    marginVertical: 24,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#1565C0',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
