import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

import {
  Card,
  PrimaryButton,
  ScreenContainer,
  SecondaryButton,
} from "../components";
import { layout, typography } from "../styles/shared";
import { useCardStore, useScreenStore } from "../store";
import { splitCommaSeparated } from "../utils/text";

export function CreateScreen() {
  const addCard = useCardStore((s) => s.addCard);
  const goTo = useScreenStore((s) => s.goTo);
  const [context, setContext] = useState("");
  const [answer, setAnswer] = useState("");
  const [variationsRaw, setVariationsRaw] = useState("");

  const canSave = context.trim().length > 0 && answer.trim().length > 0;

  function save() {
    if (!canSave) return;
    const now = Date.now();
    const variations = splitCommaSeparated(variationsRaw);
    addCard({
      context: context.trim(),
      answer: answer.trim(),
      ...(variations.length > 0 ? { variations } : {}),
      topic: "custom",
      source: "user",
      createdAt: now,
      dueDate: now,
      interval: 1,
    });
    goTo("home");
  }

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.formCard}>
          <Text style={typography.fieldLabel}>Context</Text>
          <TextInput
            multiline
            onChangeText={setContext}
            placeholder="Sentence context"
            placeholderTextColor="#94A3B8"
            style={styles.inputMultiline}
            textAlignVertical="top"
            value={context}
          />

          <Text style={typography.fieldLabel}>Answer</Text>
          <TextInput
            multiline
            onChangeText={setAnswer}
            placeholder="Correct answer"
            placeholderTextColor="#94A3B8"
            style={styles.inputMultiline}
            textAlignVertical="top"
            value={answer}
          />

          <Text style={typography.fieldLabel}>Variations (optional)</Text>
          <TextInput
            onChangeText={setVariationsRaw}
            placeholder="synonym1, synonym2"
            placeholderTextColor="#94A3B8"
            style={styles.inputSingle}
            value={variationsRaw}
          />

          <View style={styles.buttonRow}>
            <SecondaryButton onPress={() => goTo("home")}>Back</SecondaryButton>
            <PrimaryButton disabled={!canSave} onPress={save}>
              Save Card
            </PrimaryButton>
          </View>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  formCard: {
    marginBottom: 0,
  },
  inputMultiline: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    minHeight: 96,
    marginBottom: 16,
    padding: 16,
    fontSize: 16,
    color: "#E2E8F0",
    textAlignVertical: "top",
  },
  inputSingle: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    marginBottom: 24,
    padding: 16,
    fontSize: 16,
    color: "#E2E8F0",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
