/**
 * Ambil salt user dari Firestore berdasarkan email
 * @param email email pengguna
 * @returns Uint8Array salt (hasil decode Base64)
 */

import { db } from "@/firebase/config";
import { deriveMasterKey } from "@/lib/crypto-utils";
import { doc, getDoc } from "firebase/firestore";

/**
 * Ambil salt user dari Firestore berdasarkan email
 * @param email email pengguna
 * @returns Uint8Array salt (hasil decode Base64)
 */
export async function getUserSalt(
  uuid: string
): Promise<{ salt: string; masterKey: string } | null> {
  // Pastikan user sudah login
  if (!uuid) throw new Error("User not authenticated");

  // Karena rules pakai email sebagai ID dokumen
  const userRef = doc(db, "users", uuid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    throw new Error("User not found");
  }

  const userData = snapshot.data();

  if (!userData?.salt) {
    throw new Error("Salt not found for user");
  }

  if (!userData?.masterKey) {
    throw new Error("Master Key not found for user");
  }

  return { salt: userData.salt, masterKey: userData.masterKey };
}

/**
 * Mengecek apakah master key yang dimasukkan sama dengan yang disimpan di Firestore
 */
export async function checkMasterKey(
  uuid: string,
  inputKey: string
): Promise<boolean> {
  const hash = await getUserSalt(uuid);

  if (!hash?.salt || !hash?.masterKey) return false;

  // Derive key dari password
  const key = await deriveMasterKey(inputKey, hash?.salt);

  return key === hash.masterKey;
}
