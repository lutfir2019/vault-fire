// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { useMutation } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";
import type { IAuthLogin } from "@/types";
import { bufToB64, deriveMasterKey, randomBytes } from "@/lib/crypto-utils";
import { useMasterKey } from "@/stores/master";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}

export function useLogin() {
  const { setMasterKey } = useMasterKey();

  return useMutation({
    mutationFn: async ({ email, password }: IAuthLogin) => {
      const cred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Simpan sementara di store
      setMasterKey(password);

      // 2. Update data login terakhir di Firestore
      const userRef = doc(db, "users", cred.user.uid);
      await setDoc(userRef, { lastLoginAt: Date.now() }, { merge: true });
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: async ({ email, password }: IAuthLogin) => {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const salt = randomBytes(16);
      const saltB64 = bufToB64(salt.buffer as ArrayBuffer);

      const masterKey = await deriveMasterKey(password, saltB64);

      const userRef = doc(db, "users", cred.user.uid);
      await setDoc(userRef, {
        email: cred.user.email,
        salt: saltB64,
        masterKey,
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
      });
    },
  });
}
