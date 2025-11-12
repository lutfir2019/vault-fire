import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getError(error: unknown): string | undefined {
  if (!error || typeof error !== "object") return undefined;

  const err = error as { code?: string };

  const ERROR_MAP: Record<string, string> = {
    "auth/email-already-in-use": "Email already in use.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-not-found": "User not found.",
    "auth/weak-password": "Password is too weak.",
    "auth/network-request-failed": "Network error. Please try again.",
  };

  return err?.code
    ? (ERROR_MAP[err?.code] ?? "An unexpected error occurred.")
    : undefined;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  // Simpan ID timer agar bisa dibatalkan jika fungsi dipanggil ulang dalam waktu cepat
  let timer: ReturnType<typeof setTimeout> | null = null;

  // Kembalikan fungsi baru yang membungkus fungsi asli dengan logika debounce
  return function (this: any, ...args: Parameters<T>): void {
    /* eslint-disable @typescript-eslint/no-this-alias */
    const context = this; // Simpan konteks `this` agar tetap konsisten jika digunakan dalam class

    // Jika masih ada timer sebelumnya, batalkan dulu
    if (timer) clearTimeout(timer);

    // Buat timer baru untuk menjalankan fungsi setelah `delay` milidetik
    timer = setTimeout(() => {
      func.apply(context, args); // Panggil fungsi dengan `this` dan argumen yang sesuai
    }, delay);
  };
}
