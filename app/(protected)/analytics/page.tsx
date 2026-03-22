import { fetchAppointmentsForAnalytics } from "@/services/dashboardService";
import { fetchPatients } from "@/services/patientService";
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts";
import { cookies } from "next/headers";

async function getDoctorId() {
  const raw = (await cookies()).get("auth-storage")?.value;
  if (!raw) return "";
  try { return JSON.parse(decodeURIComponent(raw))?.state?.user?.uid ?? ""; }
  catch { return ""; }
}

export default async function AnalyticsPage() {
  const doctorId = await getDoctorId();
  const [appointments, patients] = await Promise.all([
    fetchAppointmentsForAnalytics(doctorId),
    fetchPatients(doctorId),
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 500, color: "var(--color-text-primary)" }}>Analytics</h1>
      <AnalyticsCharts appointments={appointments} patients={patients} />
    </div>
  );
}