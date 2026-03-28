import { Button, StyleSheet, Text, View } from 'react-native';

import { useCardStore, useScreenStore } from '../store';

export function HomeScreen() {
  const dueCount = useCardStore((s) => s.getDueCards().length);
  const setScreen = useScreenStore((s) => s.setScreen);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sentence Trainer</Text>
      <Text style={styles.due}>Due cards: {dueCount}</Text>
      <View style={styles.buttons}>
        <Button title="Start Training" onPress={() => setScreen('training')} />
        <View style={styles.spacer} />
        <Button title="Add Card" onPress={() => setScreen('create')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  due: {
    fontSize: 16,
    marginBottom: 24,
  },
  buttons: {
    width: '100%',
    maxWidth: 280,
  },
  spacer: {
    height: 12,
  },
});
