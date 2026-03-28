import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Card } from '../types';
import { applySrsToCard, type SrsRating } from '../utils/srs';

function newCardId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

let rehydrateOnce: Promise<void> | null = null;

type CardsState = {
  cards: Card[];
  isHydrated: boolean;
  init: () => Promise<void>;
  addCard: (payload: Omit<Card, 'id'> & { id?: string }) => void;
  updateCard: (card: Card) => void;
  deleteCard: (id: string) => void;
  getDueCards: () => Card[];
  reviewCard: (id: string, rating: SrsRating) => void;
};

export const useCardStore = create<CardsState>()(
  persist(
    (set, get) => ({
      cards: [],
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
        return get()
          .cards.filter((c) => c.dueDate <= now)
          .slice()
          .sort((a, b) => a.dueDate - b.dueDate);
      },

      reviewCard: (id, rating) => {
        const reviewedAt = Date.now();
        set((s) => ({
          cards: s.cards.map((c) =>
            c.id === id ? applySrsToCard(c, rating, reviewedAt) : c,
          ),
        }));
      },
    }),
    {
      name: 'card-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ cards: state.cards }),
      skipHydration: true,
    },
  ),
);
