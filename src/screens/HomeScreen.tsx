import { Button, StyleSheet, Text, View } from "react-native";

import { layout } from "../styles/shared";
import { useCardStore, useScreenStore } from "../store";

export function HomeScreen() {
  const dueCount = useCardStore((s) => s.getDueCards().length);
  const hasCards = useCardStore((s) => s.cards.length > 0);
  const importStarterCards = useCardStore((s) => s.importStarterCards);
  const clearCards = useCardStore((s) => s.clearCards);
  const goTo = useScreenStore((s) => s.goTo);

  console.log("HomeScreen render, hasCards:", hasCards, "dueCount:", dueCount);

  return (
    <View style={layout.centered}>
      <Text style={styles.title}>Sentence Trainer</Text>
      <Text style={styles.dueLine}>Due cards: {dueCount}</Text>
      <View style={styles.actions}>
        <Button title="Start Training" onPress={() => goTo("training")} />
        <View style={styles.vGap} />
        {!hasCards && (
          <>
            <Button title="Import starter pack" onPress={importStarterCards} />
            <View style={styles.vGap} />
          </>
        )}
        {hasCards && (
          <>
            <Button title="Clear Cards (Debug)" onPress={clearCards} />
            <View style={styles.vGap} />
          </>
        )}
        <Button title="Add Card" onPress={() => goTo("create")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  dueLine: {
    fontSize: 16,
    marginBottom: 24,
  },
  actions: {
    width: "100%",
    maxWidth: 280,
  },
  vGap: {
    height: 12,
  },
});
