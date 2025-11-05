export type TKey = {
  id?: string;
  username?: string;
  password?: string;
  url?: string;
  description?: string;
  type?: string;
  createdBy?: string | null;
};

export type TVaultItemRecord = {
  ownerUid?: string;
  createdAt: number;
  updatedAt: number;
  encrypted: {
    iv: string;
    ciphertext: string;
  };
  title?: string;
};
