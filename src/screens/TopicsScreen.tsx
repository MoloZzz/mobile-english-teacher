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

const topics = ["All", "Backend", "Meetings", "Daily", "Custom"];

export function TopicsScreen() {
  const selectedTopic = useCardStore((s) => s.selectedTopic);
  const setSelectedTopic = useCardStore((s) => s.setSelectedTopic);
  const goTo = useScreenStore((s) => s.goTo);

  function selectTopic(topic: string) {
    setSelectedTopic(topic);
    goTo("home");
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={typography.title}>Select Topic</Text>

        <View style={styles.topics}>
          {topics.map((topic) => (
            <Card
              key={topic}
              style={[
                styles.topicCard,
                selectedTopic === topic && styles.selectedTopic,
              ]}
            >
              <PrimaryButton
                onPress={() => selectTopic(topic)}
                style={styles.topicButton}
              >
                <Text style={[selectedTopic === topic && styles.selectedText]}>
                  {topic}
                </Text>
              </PrimaryButton>
            </Card>
          ))}
        </View>

        <SecondaryButton onPress={() => goTo("home")}>
          Back to Home
        </SecondaryButton>
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
  topics: {
    width: "100%",
    maxWidth: 280,
    gap: 12,
  },
  topicCard: {
    alignItems: "center",
  },
  selectedTopic: {
    backgroundColor: "#1E293B",
  },
  topicButton: {
    width: "100%",
  },
  selectedText: {
    color: "#3B82F6",
  },
});
