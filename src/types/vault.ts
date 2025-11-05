export type TKey = {
  id?: string;
  username?: string;
  password?: string;
  url?: string;
  description?: string;
  type?: string;
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
