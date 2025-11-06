import { db } from "@/firebase/config";
import { decryptJSON } from "@/lib/crypto-utils";
import type { TKey } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_HASH_KEY ?? "PUBLIC_KEY";

/**
 * Ambil semua item milik user (dan dekripsi)
 */
export async function getVaultPublicItems({ src }: { src?: string }) {
  const q = query(collection(db, "vaultItems"), where("type", "==", "public"));
  const snapshot = await getDocs(q);

  const items = [];
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const decrypted = await decryptJSON(PUBLIC_KEY, data.iv, data.ciphertext);
    items.push({
      id: docSnap.id,
      ...decrypted,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  if (src && src.trim() !== "") {
    const keyword = src.toLowerCase();
    return items.filter((item) =>
      [item.username, item.url, item.description]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(keyword))
    );
  }

  return items as TKey[];
}
