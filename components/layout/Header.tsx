"use client";
import { useRouter } from "next/navigation";
import { signOut } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";

export default function Header() {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <header style={{
      height: "60px",
      borderBottom: "1px solid var(--color-border-tertiary)",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "16px",
      background: "var(--color-background-primary)",
    }}>
      <span style={{
        fontSize: "13px",
        color: "var(--color-text-secondary)",
      }}>
        {user?.email}
      </span>

      <button
        onClick={handleLogout}
        style={{
          fontSize: "13px",
          padding: "6px 14px",
          borderRadius: "var(--border-radius-md)",
          border: "1px solid var(--color-border-secondary)",
          background: "transparent",
          color: "var(--color-text-secondary)",
          cursor: "pointer",
        }}
      >
        Sign out
      </button>
    </header>
  );
}