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
import { useCardStore, useScreenStore } from '../store';
import type { SrsRating } from '../utils/srs';

type Phase = 'typing' | 'rating';

export function TrainingScreen() {
  const reviewCard = useCardStore((s) => s.reviewCard);
  const setScreen = useScreenStore((s) => s.setScreen);

  const [queue, setQueue] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    const due = useCardStore.getState().getDueCards();
    setQueue(due);
    setIndex(0);
    setPhase('typing');
    setUserAnswer('');
  }, []);

  const currentCard = index < queue.length ? queue[index] : undefined;
  const finished = queue.length === 0 || index >= queue.length;

  function handleShowAnswer() {
    setPhase('rating');
  }

  function handleRating(rating: SrsRating) {
    if (!currentCard) return;
    reviewCard(currentCard.id, rating);
    const next = index + 1;
    if (next >= queue.length) {
      setIndex(next);
      return;
    }
    setIndex(next);
    setPhase('typing');
    setUserAnswer('');
  }

  if (finished) {
    return (
      <View style={styles.centered}>
        <Text style={styles.doneText}>Done for today</Text>
        <Button title="Back" onPress={() => setScreen('home')} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.contextLabel}>Context</Text>
        <Text style={styles.context}>{currentCard!.context}</Text>

        {phase === 'typing' && (
          <>
            <Text style={styles.fieldLabel}>Your answer</Text>
            <TextInput
              multiline
              onChangeText={setUserAnswer}
              placeholder="Type your answer"
              style={styles.input}
              textAlignVertical="top"
              value={userAnswer}
            />
            <View style={styles.row}>
              <Button title="Back" onPress={() => setScreen('home')} />
              <View style={styles.hSpacer} />
              <Button title="Show Answer" onPress={handleShowAnswer} />
            </View>
          </>
        )}

        {phase === 'rating' && currentCard && (
          <>
            <Text style={styles.fieldLabel}>Correct answer</Text>
            <Text style={styles.reveal}>{currentCard.answer}</Text>
            {currentCard.variations && currentCard.variations.length > 0 && (
              <>
                <Text style={styles.fieldLabel}>Variations</Text>
                <Text style={styles.reveal}>
                  {currentCard.variations.join(', ')}
                </Text>
              </>
            )}
            <View style={[styles.rateRow, styles.rateRowTop]}>
              <Button title="Again" onPress={() => handleRating('again')} />
            </View>
            <View style={styles.rateRow}>
              <Button title="Good" onPress={() => handleRating('good')} />
            </View>
            <View style={styles.rateRow}>
              <Button title="Easy" onPress={() => handleRating('easy')} />
            </View>
            <Button title="Back" onPress={() => setScreen('home')} />
          </>
        )}
      </ScrollView>
    </View>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  doneText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  contextLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  context: {
    fontSize: 18,
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    minHeight: 100,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  reveal: {
    fontSize: 16,
    marginBottom: 16,
  },
  rateRow: {
    marginBottom: 8,
  },
  rateRowTop: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  hSpacer: {
    width: 16,
  },
});
