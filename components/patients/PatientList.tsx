import Link from "next/link";
import { Patient } from "@/types/index.type";

const statusColor = (s: string) => s === "active" ? { bg: "#E1F5EE", text: "#0F6E56" } : { bg: "#F1EFE8", text: "#5F5E5A" };

export default function PatientList({ patients }: { patients: Patient[] }) {
  if (patients.length === 0)
    return <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>No patients found.</p>;

  return (
    <div style={{
      background: "var(--color-background-primary)",
      border: "1px solid var(--color-border-tertiary)",
      borderRadius: "var(--border-radius-lg)",
      overflow: "hidden",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr style={{ background: "var(--color-background-secondary)", borderBottom: "1px solid var(--color-border-tertiary)" }}>
            {["Name", "Age", "Gender", "Condition", "Status"].map(h => (
              <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500, color: "var(--color-text-secondary)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients.map((p, i) => {
            const sc = statusColor(p.status);
            return (
              <tr key={p.id} style={{
                borderBottom: i < patients.length - 1 ? "1px solid var(--color-border-tertiary)" : "none",
              }}>
                <td style={{ padding: "12px 16px" }}>
                  <Link href={`/patients/${p.id}`} style={{ color: "var(--color-text-primary)", fontWeight: 500, textDecoration: "none" }}>
                    {p.name}
                  </Link>
                </td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>{p.age}</td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>{p.gender}</td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>{p.condition}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", background: sc.bg, color: sc.text }}>
                    {p.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}