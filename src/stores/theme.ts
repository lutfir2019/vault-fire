import { create } from "zustand";

interface IThemeStore {
  loading: boolean;
  setLoading: (bol: boolean) => void;
}

export const useTheme = create<IThemeStore>((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
}));
