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
  const learningGoal = useCardStore((s) => s.learningGoal);
  const learnedCount = useCardStore((s) => s.learnedCardIds.length);
  const progress = useCardStore((s) => s.getProgress());
  const cards = useCardStore((s) => s.cards);
  const hasCards = useCardStore((s) => s.cards.length > 0);
  const importStarterCards = useCardStore((s) => s.importStarterCards);
  const goTo = useScreenStore((s) => s.goTo);

  function getTopicStats(topic: string) {
    if (topic === "All") {
      return {
        total: cards.length,
        learned: cards.filter((c) => c.isLearned).length,
      };
    } else if (topic === "Custom") {
      const filtered = cards.filter((c) => c.source === "user");
      return {
        total: filtered.length,
        learned: filtered.filter((c) => c.isLearned).length,
      };
    } else {
      const filtered = cards.filter((c) => c.topic === topic);
      return {
        total: filtered.length,
        learned: filtered.filter((c) => c.isLearned).length,
      };
    }
  }

  const topicStats = getTopicStats(selectedTopic);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={typography.title}>Sentence Trainer</Text>

        <Card style={styles.progressCard}>
          <Text style={typography.subtitle}>
            Goal: {learningGoal} collocations
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </View>
          <Text style={typography.secondary}>
            {learnedCount} / {learningGoal} learned
          </Text>
        </Card>

        <Card style={styles.topicCard}>
          <Text style={typography.subtitle}>
            Selected topic: {selectedTopic}
          </Text>
          <Text style={typography.secondary}>
            Progress: {topicStats.learned} / {topicStats.total}
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

          <SecondaryButton onPress={() => goTo("analytics")}>
            Analytics
          </SecondaryButton>

          {!hasCards && (
            <SecondaryButton onPress={importStarterCards}>
              Import Starter Pack
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
  progressCard: {
    marginBottom: 16,
    minWidth: 280,
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#1E293B",
    borderRadius: 4,
    marginVertical: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10B981",
    borderRadius: 4,
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
