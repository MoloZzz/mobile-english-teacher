import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CreateScreen } from './src/screens/CreateScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { TrainingScreen } from './src/screens/TrainingScreen';
import { layout } from './src/styles/shared';
import { useCardStore, useScreenStore } from './src/store';

export default function App() {
  const isHydrated = useCardStore((s) => s.isHydrated);
  const screen = useScreenStore((s) => s.screen);

  useEffect(() => {
    void useCardStore.getState().init();
  }, []);

  return (
    <View style={layout.screen}>
      {!isHydrated ? (
        <View style={layout.centered}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          {screen === 'home' && <HomeScreen />}
          {screen === 'create' && <CreateScreen />}
          {screen === 'training' && <TrainingScreen />}
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 18,
  },
});
