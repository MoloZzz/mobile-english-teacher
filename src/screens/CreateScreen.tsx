import { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useCardStore, useScreenStore } from '../store';

export function CreateScreen() {
  const addCard = useCardStore((s) => s.addCard);
  const setScreen = useScreenStore((s) => s.setScreen);
  const [context, setContext] = useState('');
  const [answer, setAnswer] = useState('');
  const [variationsText, setVariationsText] = useState('');

  const contextOk = context.trim().length > 0;
  const answerOk = answer.trim().length > 0;
  const canSave = contextOk && answerOk;

  function handleSave() {
    if (!canSave) return;
    const now = Date.now();
    const parts = variationsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    addCard({
      context: context.trim(),
      answer: answer.trim(),
      ...(parts.length > 0 ? { variations: parts } : {}),
      createdAt: now,
      dueDate: now,
      interval: 1,
    });
    setScreen('home');
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
      style={styles.root}
    >
      <Text style={styles.label}>Context</Text>
      <TextInput
        multiline
        onChangeText={setContext}
        placeholder="Sentence context"
        style={styles.inputMultiline}
        textAlignVertical="top"
        value={context}
      />
      <Text style={styles.label}>Answer</Text>
      <TextInput
        multiline
        onChangeText={setAnswer}
        placeholder="Correct answer"
        style={styles.inputMultiline}
        textAlignVertical="top"
        value={answer}
      />
      <Text style={styles.label}>Variations (optional)</Text>
      <TextInput
        onChangeText={setVariationsText}
        placeholder="synonym1, synonym2"
        style={styles.inputSingle}
        value={variationsText}
      />
      <View style={styles.actions}>
        <Button title="Back" onPress={() => setScreen('home')} />
        <View style={styles.spacer} />
        <Button
          disabled={!canSave}
          onPress={handleSave}
          title="Save"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputMultiline: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    minHeight: 96,
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
  inputSingle: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    marginBottom: 24,
    padding: 8,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 16,
  },
});
