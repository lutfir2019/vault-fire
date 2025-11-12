/**
 * Generate secure random bytes
 */
export function randomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return arr;
}

export async function deriveMasterKey(
  password: string,
  salt: string,
): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + salt);
  const hash = await crypto.subtle.digest("SHA-256", data);
  // Convert hash ke Base64 agar bisa disimpan string
  const bytes = new Uint8Array(hash);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

// Utility helper: Base64 ⇄ ArrayBuffer
export function bufToB64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000; // hindari stack overflow untuk data besar

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
  }

  return btoa(binary);
}

export function b64ToBuf(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// ================================================
// 🔐  Fungsi utama: Enkripsi & Dekripsi JSON
// ================================================

// 🔹 Konversi masterKey string menjadi CryptoKey
async function importCryptoKeyFromString(
  masterKey: string,
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyData = await crypto.subtle.digest("SHA-256", enc.encode(masterKey)); // derive 256-bit key
  return crypto.subtle.importKey("raw", keyData, "AES-GCM", false, [
    "encrypt",
    "decrypt",
  ]);
}

// ================================================
// ✅ ENCRYPT JSON
// ================================================
export async function encryptJSON(masterKey: string, data: unknown) {
  const key = await importCryptoKeyFromString(masterKey);

  // Buat IV acak (12 byte)
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encoded = encoder.encode(JSON.stringify(data));

  const cipherBuf = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded,
  );

  return {
    iv: bufToB64(iv.buffer), // ✅ gunakan .buffer di sini
    ciphertext: bufToB64(cipherBuf),
  };
}

// ================================================
// ✅ DECRYPT JSON
// ================================================
export async function decryptJSON(
  masterKey: string,
  ivB64: string,
  cipherB64: string,
) {
  const key = await importCryptoKeyFromString(masterKey);
  const iv = new Uint8Array(b64ToBuf(ivB64));
  const cipherBuf = b64ToBuf(cipherB64);

  const plainBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    cipherBuf,
  );
  const decoder = new TextDecoder();
  const decoded = decoder.decode(plainBuf);
  return JSON.parse(decoded);
}
