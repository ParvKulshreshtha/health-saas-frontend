import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

const setAuthCookie = (value: string) => {
  document.cookie = `auth-token=${value}; path=/; max-age=86400; SameSite=Strict`;
};

const clearAuthCookie = () => {
  document.cookie = `auth-token=; path=/; max-age=0`;
};

export const signUp = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const token = await result.user.getIdToken();
  setAuthCookie(token);
  return result;
};

export const signIn = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const token = await result.user.getIdToken();
  setAuthCookie(token);
  return result;
};

export const signOut = async () => {
  clearAuthCookie();
  return firebaseSignOut(auth);
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);