"use client";
import { useEffect } from "react";
import { subscribeToAuthChanges } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";

export const useAuth = () => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      if (firebaseUser) {
        // Refresh cookie on every auth state change
        const token = await firebaseUser.getIdToken();
        document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Strict`;
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
      } else {
        document.cookie = `auth-token=; path=/; max-age=0`;
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
};