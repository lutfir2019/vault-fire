import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/*
  VaultFire - single-file React + TypeScript demo
  - Concept: Vaultwarden-like self-hosted vault, but using Firebase as backend
  - Client-side E2EE: master password derives an encryption key (PBKDF2) and all vault items are encrypted before sent to Firestore
  - Uses shadcn/Tailwind-friendly classNames (assumes your project already has shadcn UI + Tailwind set up)

  IMPORTANT:
  - Replace firebaseConfig with your project's values or use environment variables
  - This is a demo scaffold: for production, harden PBKDF2 iterations, implement proper key rotation, backup, rate-limiting, and security reviews
*/

// ------------------------
// Firebase config (replace with env variables)
// ------------------------
const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain:
    import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId:
    import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket:
    import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_BUCKET",
  messagingSenderId:
    import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "SENDER_ID",
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID || "APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
