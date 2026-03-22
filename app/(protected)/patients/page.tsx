import { fetchPatients } from "@/services/patientService";
import PatientsClient from "@/components/patients/PatientsClient";
import { cookies } from "next/headers";

async function getDoctorId() {
  const raw = (await cookies()).get("auth-storage")?.value;
  if (!raw) return "";
  try { return JSON.parse(decodeURIComponent(raw))?.state?.user?.uid ?? ""; }
  catch { return ""; }
}

export default async function PatientsPage() {
  const doctorId = await getDoctorId();
  const patients = await fetchPatients(doctorId);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 500, color: "var(--color-text-primary)" }}>Patients</h1>
      <PatientsClient patients={patients} />
    </div>
  );
}