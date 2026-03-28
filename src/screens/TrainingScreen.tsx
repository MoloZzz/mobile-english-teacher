import { useEffect, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { Card } from '../types';
import { layout } from '../styles/shared';
import { useCardStore, useScreenStore } from '../store';
import type { SrsRating } from '../utils/srs';

type Step = 'answer' | 'rate';

export function TrainingScreen() {
  const reviewCard = useCardStore((s) => s.reviewCard);
  const goTo = useScreenStore((s) => s.goTo);

  const [dueQueue, setDueQueue] = useState<Card[]>([]);
  const [cursor, setCursor] = useState(0);
  const [step, setStep] = useState<Step>('answer');
  const [draftAnswer, setDraftAnswer] = useState('');

  useEffect(() => {
    setDueQueue(useCardStore.getState().getDueCards());
    setCursor(0);
    setStep('answer');
    setDraftAnswer('');
  }, []);

  const done = dueQueue.length === 0 || cursor >= dueQueue.length;
  const card = done ? undefined : dueQueue[cursor];

  function submitRating(rating: SrsRating) {
    if (!card) return;
    reviewCard(card.id, rating);
    const next = cursor + 1;
    setCursor(next);
    if (next < dueQueue.length) {
      setStep('answer');
      setDraftAnswer('');
    }
  }

  if (done) {
    return (
      <View style={layout.centered}>
        <Text style={styles.doneLine}>Done for today</Text>
        <Button title="Back" onPress={() => goTo('home')} />
      </View>
    );
  }

  if (!card) {
    return null;
  }

  return (
    <View style={layout.screen}>
      <ScrollView
        contentContainerStyle={layout.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={layout.fieldLabel}>Context</Text>
        <Text style={styles.contextBody}>{card.context}</Text>

        {step === 'answer' && (
          <>
            <Text style={layout.fieldLabel}>Your answer</Text>
            <TextInput
              multiline
              onChangeText={setDraftAnswer}
              placeholder="Type your answer"
              style={layout.inputMultiline}
              textAlignVertical="top"
              value={draftAnswer}
            />
            <View style={layout.buttonRow}>
              <Button title="Back" onPress={() => goTo('home')} />
              <View style={layout.hGap} />
              <Button title="Show Answer" onPress={() => setStep('rate')} />
            </View>
          </>
        )}

        {step === 'rate' && (
          <>
            <Text style={layout.fieldLabel}>Correct answer</Text>
            <Text style={styles.reveal}>{card.answer}</Text>
            {card.variations && card.variations.length > 0 && (
              <>
                <Text style={layout.fieldLabel}>Variations</Text>
                <Text style={styles.reveal}>{card.variations.join(', ')}</Text>
              </>
            )}
            <View style={[styles.rateRow, styles.rateRowFirst]}>
              <Button title="Again" onPress={() => submitRating('again')} />
            </View>
            <View style={styles.rateRow}>
              <Button title="Good" onPress={() => submitRating('good')} />
            </View>
            <View style={styles.rateRow}>
              <Button title="Easy" onPress={() => submitRating('easy')} />
            </View>
            <Button title="Back" onPress={() => goTo('home')} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contextBody: {
    fontSize: 18,
    marginBottom: 16,
  },
  reveal: {
    fontSize: 16,
    marginBottom: 16,
  },
  rateRow: {
    marginBottom: 8,
  },
  rateRowFirst: {
    marginTop: 8,
  },
  doneLine: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
