import { fetchPatientById, fetchPatientAppointments } from "@/services/patientService";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PatientDetailPage({ params }: { params: { id: string } }) {
    console.log(params)
    const param = await params
  const [patient, appointments] = await Promise.all([
    fetchPatientById(param?.id),
    fetchPatientAppointments(param?.id),
  ]);

  if (!patient) notFound();

  const sc = patient.status === "active"
    ? { bg: "#E1F5EE", text: "#0F6E56" }
    : { bg: "#F1EFE8",  text: "#5F5E5A" };

  const card = {
    background: "var(--color-background-primary)",
    border: "1px solid var(--color-border-tertiary)",
    borderRadius: "var(--border-radius-lg)",
    padding: "24px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/patients" style={{ fontSize: "13px", color: "var(--color-text-secondary)", textDecoration: "none" }}>
          ← Patients
        </Link>
      </div>

      {/* Profile header */}
      <div style={{ ...card, display: "flex", gap: "20px", alignItems: "center" }}>
        <div style={{
          width: "64px", height: "64px", borderRadius: "50%",
          background: "var(--color-background-secondary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px", fontWeight: 500, color: "var(--color-text-secondary)",
          flexShrink: 0,
        }}>
          {patient.name.charAt(0)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 500, color: "var(--color-text-primary)" }}>{patient.name}</h2>
            <span style={{ fontSize: "11px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", background: sc.bg, color: sc.text }}>
              {patient.status}
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
            {patient.age} yrs · {patient.gender} · Patient since {patient.createdAt}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Medical info */}
        <div style={card}>
          <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "16px", color: "var(--color-text-primary)" }}>Medical info</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              ["Condition",   patient.condition],
              ["Status",      patient.status],
              ["Last visit",  appointments.filter(a => a.status === "completed").at(-1)?.date ?? "—"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
                <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div style={card}>
          <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "16px", color: "var(--color-text-primary)" }}>Contact</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              ["Email", patient.email],
              ["Phone", patient.phone],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
                <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments history */}
      <div style={card}>
        <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "16px", color: "var(--color-text-primary)" }}>
          Appointment history
        </p>
        {appointments.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--color-text-tertiary)" }}>No appointments found.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--color-border-tertiary)", borderRadius: "8px", overflow: "hidden" }}>
            {appointments.sort((a, b) => b.date.localeCompare(a.date)).map(appt => {
              const asc = appt.status === "completed"
                ? { bg: "#E1F5EE", text: "#0F6E56" }
                : appt.status === "scheduled"
                ? { bg: "#E6F1FB", text: "#185FA5" }
                : { bg: "#FAECE7", text: "#993C1D" };
              return (
                <div key={appt.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 16px", background: "var(--color-background-primary)", fontSize: "13px",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{appt.type}</span>
                    <span style={{ color: "var(--color-text-tertiary)" }}>{appt.date} · {appt.time}</span>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", background: asc.bg, color: asc.text }}>
                    {appt.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
