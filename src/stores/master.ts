import { create } from "zustand";

interface IMasterKeyStore {
  masterKey: string;
  isVerify: boolean;
  setIsVerify: (bol: boolean) => void;
  setMasterKey: (key: string) => void;
  clearMasterKey: () => void;
}

/**
 * MasterKey digunakan untuk enkripsi/dekripsi item vault.
 * Disimpan secara lokal agar tidak dikirim ke server.
 */
export const useMasterKey = create<IMasterKeyStore>((set) => ({
  masterKey: "",
  isVerify: false,

  setIsVerify: (isVerify) => set({ isVerify }),
  setMasterKey: (key) => set({ masterKey: key }),
  clearMasterKey: () => set({ masterKey: "" }),
}));
