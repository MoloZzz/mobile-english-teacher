import type { Card } from '../types';

const DAY_MS = 86_400_000;

export type SrsRating = 'again' | 'good' | 'easy';

/** Next interval in days after applying SRS rules. */
export function nextIntervalDays(currentIntervalDays: number, rating: SrsRating): number {
  switch (rating) {
    case 'again':
      return 1;
    case 'good':
      return Math.max(3, currentIntervalDays * 2);
    case 'easy':
      return Math.max(7, currentIntervalDays * 3);
  }
}

/** Next due timestamp (ms) from now for a given interval in days. */
export function dueDateAfterInterval(fromTimeMs: number, intervalDays: number): number {
  return fromTimeMs + intervalDays * DAY_MS;
}

/** Apply SRS to a card: updates `interval` and `dueDate` from review time. */
export function applySrsToCard(card: Card, rating: SrsRating, reviewedAtMs: number): Card {
  const interval = nextIntervalDays(card.interval, rating);
  const dueDate = dueDateAfterInterval(reviewedAtMs, interval);
  return { ...card, interval, dueDate };
}
