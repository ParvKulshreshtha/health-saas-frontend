import Link from "next/link";
import { Patient } from "@/types/index.type";

const statusColor = (s: string) => s === "active" ? { bg: "#E1F5EE", text: "#0F6E56" } : { bg: "#F1EFE8", text: "#5F5E5A" };

export default function PatientGrid({ patients }: { patients: Patient[] }) {
  if (patients.length === 0)
    return <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>No patients found.</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
      {patients.map(p => {
        const sc = statusColor(p.status);
        return (
          <Link key={p.id} href={`/patients/${p.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "var(--color-background-primary)",
              border: "1px solid var(--color-border-tertiary)",
              borderRadius: "var(--border-radius-lg)",
              padding: "20px",
              display: "flex", flexDirection: "column", gap: "12px",
              cursor: "pointer", transition: "border-color 0.15s",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "var(--color-background-secondary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", fontWeight: 500, color: "var(--color-text-secondary)",
              }}>
                {p.name.charAt(0)}
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "2px" }}>{p.name}</p>
                <p style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{p.age} yrs · {p.gender}</p>
              </div>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{p.condition}</p>
              <span style={{
                alignSelf: "flex-start", fontSize: "11px", fontWeight: 500,
                padding: "3px 10px", borderRadius: "20px",
                background: sc.bg, color: sc.text,
              }}>
                {p.status}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}