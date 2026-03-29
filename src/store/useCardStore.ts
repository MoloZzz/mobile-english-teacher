import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Card, Attempt } from "../types";
import { applySrsToCard, type SrsRating } from "../utils/srs";
import { cards as backendCards } from "../data/backend";
import { cards as meetingsCards } from "../data/meetings";
import { cards as dailyCards } from "../data/daily";

function newCardId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

let rehydrateOnce: Promise<void> | null = null;

type CardsState = {
  cards: Card[];
  selectedTopic: string;
  learningGoal: number;
  learnedCardIds: string[];
  attempts: Attempt[];
  isHydrated: boolean;
  init: () => Promise<void>;
  addCard: (payload: Omit<Card, "id" | "isLearned"> & { id?: string }) => void;
  updateCard: (card: Card) => void;
  deleteCard: (id: string) => void;
  getDueCards: () => Card[];
  reviewCard: (id: string, rating: SrsRating) => void;
  importStarterCards: () => void;
  setSelectedTopic: (topic: string) => void;
  setLearningGoal: (goal: number) => void;
  getProgress: () => number;
  getTopicStats: (topic: string) => { learned: number; total: number };
  addAttempt: (attempt: Attempt) => void;
};

export const useCardStore = create<CardsState>()(
  persist(
    (set, get) => ({
      cards: [],
      selectedTopic: "All",
      learningGoal: 3000,
      learnedCardIds: [],
      attempts: [],
      isHydrated: false,

      init: async () => {
        if (get().isHydrated) return;
        if (!rehydrateOnce) {
          rehydrateOnce = (async () => {
            try {
              await useCardStore.persist.rehydrate();
            } finally {
              set({ isHydrated: true });
            }
          })();
        }
        await rehydrateOnce;
      },

      addCard: (payload) => {
        const card: Card = {
          id: payload.id ?? newCardId(),
          context: payload.context,
          answer: payload.answer,
          variations: payload.variations,
          topic: payload.topic ?? "custom",
          source: payload.source ?? "user",
          isLearned: false,
          createdAt: payload.createdAt,
          dueDate: payload.dueDate,
          interval: payload.interval,
        };
        set((s) => ({ cards: [...s.cards, card] }));
      },

      updateCard: (card) => {
        set((s) => ({
          cards: s.cards.map((c) => (c.id === card.id ? card : c)),
        }));
      },

      deleteCard: (id) => {
        set((s) => ({
          cards: s.cards.filter((c) => c.id !== id),
          learnedCardIds: s.learnedCardIds.filter(
            (learnedId) => learnedId !== id,
          ),
        }));
      },

      getDueCards: () => {
        const now = Date.now();
        const { selectedTopic, cards } = get();
        let filteredCards = cards.filter((c) => c.dueDate <= now);
        if (selectedTopic === "All") {
          // Shuffle for mixed deck
          filteredCards = filteredCards.sort(() => Math.random() - 0.5);
        } else if (selectedTopic === "Custom") {
          filteredCards = filteredCards.filter((c) => c.source === "user");
        } else {
          filteredCards = filteredCards.filter(
            (c) => c.topic === selectedTopic,
          );
        }
        return filteredCards.slice().sort((a, b) => a.dueDate - b.dueDate);
      },

      reviewCard: (id, rating) => {
        const reviewedAt = Date.now();
        set((s) => {
          const updatedCards = s.cards.map((c) =>
            c.id === id
              ? {
                  ...applySrsToCard(c, rating, reviewedAt),
                  isLearned: rating === "know",
                }
              : c,
          );
          let newLearnedCardIds = s.learnedCardIds;
          if (rating === "know" && !s.learnedCardIds.includes(id)) {
            newLearnedCardIds = [...s.learnedCardIds, id];
          } else if (rating === "dontKnow" && s.learnedCardIds.includes(id)) {
            newLearnedCardIds = s.learnedCardIds.filter(
              (learnedId) => learnedId !== id,
            );
          }
          return {
            cards: updatedCards,
            learnedCardIds: newLearnedCardIds,
          };
        });
      },

      importStarterCards: () => {
        const { cards } = get();
        if (cards.length > 0) return;
        const now = Date.now();
        const allStarterCards = [
          ...backendCards.map((card) => ({
            ...card,
            topic: "Backend",
            source: "starter" as const,
          })),
          ...meetingsCards.map((card) => ({
            ...card,
            topic: "Meetings",
            source: "starter" as const,
          })),
          ...dailyCards.map((card) => ({
            ...card,
            topic: "Daily",
            source: "starter" as const,
          })),
        ];
        allStarterCards.forEach((starterCard) => {
          get().addCard({
            context: starterCard.context,
            answer: starterCard.answer,
            variations: starterCard.variations,
            topic: starterCard.topic,
            source: starterCard.source,
            createdAt: now,
            dueDate: now,
            interval: 1,
          });
        });
      },

      setSelectedTopic: (topic) => {
        set({ selectedTopic: topic });
      },

      setLearningGoal: (goal) => {
        set({ learningGoal: goal });
      },

      getProgress: () => {
        const { learnedCardIds, learningGoal } = get();
        return learnedCardIds.length / learningGoal;
      },

      getTopicStats: (topic) => {
        const { cards } = get();
        if (topic === "All") {
          return {
            total: cards.length,
            learned: cards.filter((c) => c.isLearned).length,
          };
        } else if (topic === "Custom") {
          const filtered = cards.filter((c) => c.source === "user");
          return {
            total: filtered.length,
            learned: filtered.filter((c) => c.isLearned).length,
          };
        } else {
          const filtered = cards.filter((c) => c.topic === topic);
          return {
            total: filtered.length,
            learned: filtered.filter((c) => c.isLearned).length,
          };
        }
      },

      addAttempt: (attempt) => {
        set((s) => ({ attempts: [...s.attempts, attempt] }));
      },
    }),
    {
      name: "card-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cards: state.cards,
        selectedTopic: state.selectedTopic,
        learningGoal: state.learningGoal,
        learnedCardIds: state.learnedCardIds,
        attempts: state.attempts,
      }),
      skipHydration: true,
    },
  ),
);
