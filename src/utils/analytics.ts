import type { Attempt, Card } from "../types";

export function getOverallStats(attempts: Attempt[]) {
  const stats = { correct: 0, almost: 0, wrong: 0 };
  for (const attempt of attempts) {
    stats[attempt.result]++;
  }
  return stats;
}

export function getTopicStats(attempts: Attempt[]) {
  const topicStats: Record<
    string,
    { correct: number; almost: number; wrong: number }
  > = {};
  for (const attempt of attempts) {
    if (!topicStats[attempt.topic]) {
      topicStats[attempt.topic] = { correct: 0, almost: 0, wrong: 0 };
    }
    topicStats[attempt.topic][attempt.result]++;
  }
  return topicStats;
}

export function getWeakCards(attempts: Attempt[], cards: Card[]) {
  const wrongCounts: Record<string, number> = {};
  for (const attempt of attempts) {
    if (attempt.result === "wrong") {
      wrongCounts[attempt.cardId] = (wrongCounts[attempt.cardId] || 0) + 1;
    }
  }
  const weakCards = [];
  for (const card of cards) {
    const wrongCount = wrongCounts[card.id] || 0;
    if (wrongCount >= 3) {
      weakCards.push({ context: card.context, wrongCount });
    }
  }
  return weakCards;
}
