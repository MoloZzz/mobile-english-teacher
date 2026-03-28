import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CreateScreen } from './src/screens/CreateScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { TrainingScreen } from './src/screens/TrainingScreen';
import { useCardStore, useScreenStore } from './src/store';

export default function App() {
  const isHydrated = useCardStore((s) => s.isHydrated);
  const currentScreen = useScreenStore((s) => s.currentScreen);

  useEffect(() => {
    void useCardStore.getState().init();
  }, []);

  if (!isHydrated) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <>
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'create' && <CreateScreen />}
      {currentScreen === 'training' && <TrainingScreen />}
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
  },
});
