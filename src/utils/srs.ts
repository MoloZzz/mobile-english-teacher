import type { Card } from "../types";

const DAY_MS = 86_400_000;

export type SrsRating = "dontKnow" | "know";

/** Next interval in days after applying SRS rules. */
export function nextIntervalDays(
  currentIntervalDays: number,
  rating: SrsRating,
): number {
  switch (rating) {
    case "dontKnow":
      return 1;
    case "know":
      return currentIntervalDays * 2;
  }
}

/** Next due timestamp (ms) from now for a given interval in days. */
export function dueDateAfterInterval(
  fromTimeMs: number,
  intervalDays: number,
): number {
  return fromTimeMs + intervalDays * DAY_MS;
}

/** Apply SRS to a card: updates `interval` and `dueDate` from review time. */
export function applySrsToCard(
  card: Card,
  rating: SrsRating,
  reviewedAtMs: number,
): Card {
  const interval = nextIntervalDays(card.interval, rating);
  const dueDate = dueDateAfterInterval(reviewedAtMs, interval);
  return { ...card, interval, dueDate };
}
