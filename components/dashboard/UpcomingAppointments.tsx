import { Appointment } from "@/types/index.type";

export default function UpcomingAppointments({ appointments }: { appointments: Appointment[] }) {
  return (
    <div style={{
      background: "var(--color-background-primary)",
      border: "1px solid var(--color-border-tertiary)",
      borderRadius: "var(--border-radius-lg)",
      padding: "24px",
    }}>
      <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "16px", color: "var(--color-text-primary)" }}>
        Upcoming appointments
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--color-border-tertiary)", borderRadius: "8px", overflow: "hidden" }}>
        {appointments.length === 0 && (
          <p style={{ padding: "16px", fontSize: "13px", color: "var(--color-text-tertiary)" }}>No upcoming appointments</p>
        )}
        {appointments.map(a => (
          <div key={a.id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px", background: "var(--color-background-primary)", fontSize: "13px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{a.patientName}</span>
              <span style={{ color: "var(--color-text-tertiary)" }}>{a.type}</span>
            </div>
            <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ color: "var(--color-text-secondary)" }}>{a.date}</span>
              <span style={{ color: "var(--color-text-tertiary)" }}>{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}