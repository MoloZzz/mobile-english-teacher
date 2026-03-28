import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AppState = {
  launchCount: number;
  incrementLaunchCount: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      launchCount: 0,
      incrementLaunchCount: () =>
        set((s) => ({ launchCount: s.launchCount + 1 })),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ launchCount: state.launchCount }),
    },
  ),
);
