import { auth, db } from "@/firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { decryptJSON, encryptJSON } from "@/lib/crypto-utils";
import { useMasterKey } from "@/stores/master";
import type { TKey } from "@/types";

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_HASH_KEY ?? "PUBLIC_KEY";

/**
 * Tambah item baru (terenkripsi)
 */
export async function addVaultItem(uid: string, data: TKey) {
  const user = auth.currentUser;
  const key =
    data.type === "public" ? PUBLIC_KEY : useMasterKey.getState().masterKey;
  if (!key) throw new Error("Vault terkunci. Master key tidak tersedia.");

  const encrypted = await encryptJSON(key, data);

  await addDoc(collection(db, "vaultItems"), {
    uid,
    iv: encrypted.iv,
    ownerUid: user?.uid,
    type: data.type,
    ciphertext: encrypted.ciphertext,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Ambil semua item milik user (dan dekripsi)
 */
export async function getVaultItems({
  masterKey,
  uid,
  src,
}: {
  uid?: string;
  masterKey?: string;
  src?: string;
}) {
  if (!masterKey) throw new Error("Vault terkunci. Master key tidak tersedia.");

  const q = query(collection(db, "vaultItems"), where("ownerUid", "==", uid));

  const snapshot = await getDocs(q);

  const items = [];
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const key = data.type === "public" ? PUBLIC_KEY : masterKey;
    const decrypted = await decryptJSON(key, data.iv, data.ciphertext);
    items.push({
      id: docSnap.id,
      ...decrypted,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  // 🔍 Filter berdasarkan search
  if (src && src.trim() !== "") {
    const keyword = src.toLowerCase();
    return items.filter((item) =>
      [item.username, item.url, item.description]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(keyword)),
    );
  }

  return items as TKey[];
}

/**
 * Update item vault (terenkripsi ulang)
 * @param itemId ID dokumen Firestore
 * @param newData data baru yang ingin disimpan
 */
export async function updateVaultItem(itemId: string, newData: TKey) {
  const key =
    newData.type === "public" ? PUBLIC_KEY : useMasterKey.getState().masterKey;
  if (!key) throw new Error("Vault terkunci. Master key tidak tersedia.");

  const encrypted = await encryptJSON(key, newData);

  const itemRef = doc(db, "vaultItems", itemId);
  await updateDoc(itemRef, {
    iv: encrypted.iv,
    ciphertext: encrypted.ciphertext,
    type: newData.type,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Hapus item vault berdasarkan ID
 */
export async function deleteVaultItem(itemId: string) {
  const itemRef = doc(db, "vaultItems", itemId);
  await deleteDoc(itemRef);
}
