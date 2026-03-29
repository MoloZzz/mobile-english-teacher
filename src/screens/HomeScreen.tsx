import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

import {
  Card,
  PrimaryButton,
  ScreenContainer,
  SecondaryButton,
} from "../components";
import { layout, typography } from "../styles/shared";
import { useCardStore, useScreenStore } from "../store";

export function HomeScreen() {
  const dueCount = useCardStore((s) => s.getDueCards().length);
  const selectedTopic = useCardStore((s) => s.selectedTopic);
  const hasCards = useCardStore((s) => s.cards.length > 0);
  const importStarterCards = useCardStore((s) => s.importStarterCards);
  const clearCards = useCardStore((s) => s.clearCards);
  const goTo = useScreenStore((s) => s.goTo);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={typography.title}>Sentence Trainer</Text>

        <Card style={styles.topicCard}>
          <Text style={typography.subtitle}>
            Selected topic: {selectedTopic}
          </Text>
        </Card>

        <Card style={styles.dueCard}>
          <Text style={typography.subtitle}>Due cards: {dueCount}</Text>
        </Card>

        <View style={styles.actions}>
          <PrimaryButton onPress={() => goTo("training")}>
            Start Training
          </PrimaryButton>

          <SecondaryButton onPress={() => goTo("topics")}>
            Topics
          </SecondaryButton>

          {!hasCards && (
            <SecondaryButton onPress={importStarterCards}>
              Import Starter Pack
            </SecondaryButton>
          )}

          {hasCards && (
            <SecondaryButton onPress={clearCards}>
              Clear Cards (Debug)
            </SecondaryButton>
          )}

          <SecondaryButton onPress={() => goTo("create")}>
            Add Card
          </SecondaryButton>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topicCard: {
    marginBottom: 16,
    minWidth: 200,
    alignItems: "center",
  },
  dueCard: {
    marginBottom: 32,
    minWidth: 200,
    alignItems: "center",
  },
  actions: {
    width: "100%",
    maxWidth: 280,
    gap: 12,
  },
});
