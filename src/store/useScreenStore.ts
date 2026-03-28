import { create } from 'zustand';

export type AppScreen = 'home' | 'create' | 'training';

type ScreenStore = {
  screen: AppScreen;
  goTo: (screen: AppScreen) => void;
};

export const useScreenStore = create<ScreenStore>((set) => ({
  screen: 'home',
  goTo: (screen) => set({ screen }),
}));
