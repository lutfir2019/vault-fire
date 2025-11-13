import { auth } from "@/firebase/config";
import { signOut, type User } from "firebase/auth";
import { create } from "zustand";

interface IThemeStore {
  user: User | null;

  setUser: (val: User | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<IThemeStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("expSession");
      window.location.href = "/auth/login"; // redirect manual agar clear state
      return Promise.resolve();
    } catch (err) {
      console.error("Logout failed:", err);
      throw new Error("Logout failed");
    }
  },
}));
