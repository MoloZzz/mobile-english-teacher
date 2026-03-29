import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Card } from "../types";
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
  isHydrated: boolean;
  init: () => Promise<void>;
  addCard: (payload: Omit<Card, "id"> & { id?: string }) => void;
  updateCard: (card: Card) => void;
  deleteCard: (id: string) => void;
  getDueCards: () => Card[];
  reviewCard: (id: string, rating: SrsRating) => void;
  importStarterCards: () => void;
  clearCards: () => void;
  setSelectedTopic: (topic: string) => void;
};

export const useCardStore = create<CardsState>()(
  persist(
    (set, get) => ({
      cards: [],
      selectedTopic: "All",
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
        set((s) => ({ cards: s.cards.filter((c) => c.id !== id) }));
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
        set((s) => ({
          cards: s.cards.map((c) =>
            c.id === id ? applySrsToCard(c, rating, reviewedAt) : c,
          ),
        }));
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

      clearCards: () => {
        set({ cards: [] });
      },

      setSelectedTopic: (topic) => {
        set({ selectedTopic: topic });
      },
    }),
    {
      name: "card-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cards: state.cards,
        selectedTopic: state.selectedTopic,
      }),
      skipHydration: true,
    },
  ),
);
