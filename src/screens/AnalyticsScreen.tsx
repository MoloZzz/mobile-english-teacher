import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card, ScreenContainer, SecondaryButton } from "../components";
import { layout, typography } from "../styles/shared";
import { useCardStore, useScreenStore } from "../store";
import {
  getOverallStats,
  getTopicStats,
  getWeakCards,
} from "../utils/analytics";

export function AnalyticsScreen() {
  const attempts = useCardStore((s) => s.attempts);
  const cards = useCardStore((s) => s.cards);
  const goTo = useScreenStore((s) => s.goTo);

  const overallStats = getOverallStats(attempts);
  const topicStats = getTopicStats(attempts);
  const weakCards = getWeakCards(attempts, cards);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={typography.title}>Analytics</Text>

        <Card style={styles.section}>
          <Text style={typography.subtitle}>Overall Stats</Text>
          <Text style={typography.secondary}>
            Correct: {overallStats.correct}
          </Text>
          <Text style={typography.secondary}>
            Almost: {overallStats.almost}
          </Text>
          <Text style={typography.secondary}>Wrong: {overallStats.wrong}</Text>
        </Card>

        <Card style={styles.section}>
          <Text style={typography.subtitle}>Per Topic Stats</Text>
          {Object.entries(topicStats).map(([topic, stats]) => (
            <View key={topic} style={styles.topicStat}>
              <Text style={typography.secondary}>{topic}:</Text>
              <Text style={typography.secondary}>
                correct: {stats.correct}, almost: {stats.almost}, wrong:{" "}
                {stats.wrong}
              </Text>
            </View>
          ))}
        </Card>

        <Card style={styles.section}>
          <Text style={typography.subtitle}>Weak Cards (3+ wrongs)</Text>
          {weakCards.length === 0 ? (
            <Text style={typography.secondary}>No weak cards</Text>
          ) : (
            weakCards.map((card, index) => (
              <View key={index} style={styles.weakCard}>
                <Text style={typography.secondary}>{card.context}</Text>
                <Text style={typography.secondary}>
                  Wrongs: {card.wrongCount}
                </Text>
              </View>
            ))
          )}
        </Card>

        <SecondaryButton onPress={() => goTo("home")}>
          Back to Home
        </SecondaryButton>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 20,
  },
  topicStat: {
    marginBottom: 8,
  },
  weakCard: {
    marginBottom: 12,
  },
});
