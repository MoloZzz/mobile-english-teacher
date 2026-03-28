import { create } from 'zustand';

export type AppScreen = 'home' | 'create' | 'training';

type ScreenState = {
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
};

export const useScreenStore = create<ScreenState>((set) => ({
  currentScreen: 'home',
  setScreen: (screen) => set({ currentScreen: screen }),
}));
