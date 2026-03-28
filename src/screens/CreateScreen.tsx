import { useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';

import { layout } from '../styles/shared';
import { useCardStore, useScreenStore } from '../store';
import { splitCommaSeparated } from '../utils/text';

export function CreateScreen() {
  const addCard = useCardStore((s) => s.addCard);
  const goTo = useScreenStore((s) => s.goTo);
  const [context, setContext] = useState('');
  const [answer, setAnswer] = useState('');
  const [variationsRaw, setVariationsRaw] = useState('');

  const canSave =
    context.trim().length > 0 && answer.trim().length > 0;

  function save() {
    if (!canSave) return;
    const now = Date.now();
    const variations = splitCommaSeparated(variationsRaw);
    addCard({
      context: context.trim(),
      answer: answer.trim(),
      ...(variations.length > 0 ? { variations } : {}),
      createdAt: now,
      dueDate: now,
      interval: 1,
    });
    goTo('home');
  }

  return (
    <ScrollView
      contentContainerStyle={layout.scrollContent}
      keyboardShouldPersistTaps="handled"
      style={layout.screen}
    >
      <Text style={layout.fieldLabel}>Context</Text>
      <TextInput
        multiline
        onChangeText={setContext}
        placeholder="Sentence context"
        style={layout.inputMultiline}
        textAlignVertical="top"
        value={context}
      />
      <Text style={layout.fieldLabel}>Answer</Text>
      <TextInput
        multiline
        onChangeText={setAnswer}
        placeholder="Correct answer"
        style={layout.inputMultiline}
        textAlignVertical="top"
        value={answer}
      />
      <Text style={layout.fieldLabel}>Variations (optional)</Text>
      <TextInput
        onChangeText={setVariationsRaw}
        placeholder="synonym1, synonym2"
        style={layout.inputSingle}
        value={variationsRaw}
      />
      <View style={layout.buttonRow}>
        <Button title="Back" onPress={() => goTo('home')} />
        <View style={layout.hGap} />
        <Button disabled={!canSave} onPress={save} title="Save" />
      </View>
    </ScrollView>
  );
}
