"use client";
import { useAuth } from "@/hooks/useAuth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuth(); // runs the Firebase listener
  return <>{children}</>;
}