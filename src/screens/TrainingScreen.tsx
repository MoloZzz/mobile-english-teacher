import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import type { Card } from "../types";
import {
  Card as CardComponent,
  PrimaryButton,
  ScreenContainer,
  SecondaryButton,
} from "../components";
import { layout, typography } from "../styles/shared";
import { useCardStore, useScreenStore } from "../store";

type Step = "answer" | "revealed";

export function TrainingScreen() {
  const updateCard = useCardStore((s) => s.updateCard);
  const goTo = useScreenStore((s) => s.goTo);

  const [dueQueue, setDueQueue] = useState<Card[]>([]);
  const [cursor, setCursor] = useState(0);
  const [step, setStep] = useState<Step>("answer");
  const [draftAnswer, setDraftAnswer] = useState("");

  useEffect(() => {
    setDueQueue(useCardStore.getState().getDueCards());
    setCursor(0);
    setStep("answer");
    setDraftAnswer("");
  }, []);

  const done = dueQueue.length === 0 || cursor >= dueQueue.length;
  const card = done ? undefined : dueQueue[cursor];

  function markLearned() {
    if (!card) return;
    updateCard({ ...card, isLearned: true });
    useCardStore.getState().learnedCardIds.push(card.id);
    nextCard();
  }

  function nextCard() {
    const next = cursor + 1;
    setCursor(next);
    if (next < dueQueue.length) {
      setStep("answer");
      setDraftAnswer("");
    }
  }

  if (done) {
    return (
      <ScreenContainer>
        <View style={styles.centered}>
          <Text style={typography.title}>Done for today</Text>
          <SecondaryButton onPress={() => goTo("home")}>
            Back to Home
          </SecondaryButton>
        </View>
      </ScreenContainer>
    );
  }

  if (!card) {
    return null;
  }

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <CardComponent style={styles.contextCard}>
          <Text style={typography.context}>{card.context}</Text>
        </CardComponent>

        {step === "answer" && (
          <View style={styles.answerSection}>
            <TextInput
              multiline
              onChangeText={setDraftAnswer}
              placeholder="Type your answer..."
              placeholderTextColor="#94A3B8"
              style={styles.input}
              textAlignVertical="top"
              value={draftAnswer}
            />
            <View style={layout.buttonRow}>
              <SecondaryButton onPress={() => goTo("home")}>
                Back
              </SecondaryButton>
              <PrimaryButton onPress={() => setStep("revealed")}>
                Show Answer
              </PrimaryButton>
            </View>
          </View>
        )}

        {step === "revealed" && (
          <View style={styles.revealedSection}>
            <CardComponent style={styles.answerCard}>
              <Text style={typography.answer}>{card.answer}</Text>
              {card.variations && card.variations.length > 0 && (
                <Text style={[typography.secondary, styles.variations]}>
                  {card.variations.join(", ")}
                </Text>
              )}
            </CardComponent>

            <View style={styles.actionButtons}>
              <SecondaryButton onPress={nextCard}>Next</SecondaryButton>
              <PrimaryButton onPress={markLearned}>
                Already learned
              </PrimaryButton>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contextCard: {
    marginBottom: 24,
  },
  answerSection: {
    gap: 16,
  },
  input: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    minHeight: 120,
    padding: 16,
    fontSize: 16,
    color: "#E2E8F0",
    textAlignVertical: "top",
  },
  revealedSection: {
    gap: 24,
  },
  answerCard: {
    marginBottom: 0,
  },
  variations: {
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
});
