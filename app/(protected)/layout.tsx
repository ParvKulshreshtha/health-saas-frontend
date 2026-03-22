import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{
          flex: 1,
          padding: "32px",
          background: "var(--color-background-tertiary)",
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}