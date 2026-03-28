import { Pressable, StyleSheet, Text } from 'react-native';

import { ScreenContainer } from '../components/ScreenContainer';
import { useAppStore } from '../store';

export function HomeScreen() {
  const launchCount = useAppStore((s) => s.launchCount);
  const incrementLaunchCount = useAppStore((s) => s.incrementLaunchCount);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Mobile English Teacher</Text>
      <Text style={styles.meta}>Persisted opens (demo): {launchCount}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={incrementLaunchCount}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonLabel}>Tap to increment</Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  meta: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonLabel: {
    fontSize: 16,
  },
});
