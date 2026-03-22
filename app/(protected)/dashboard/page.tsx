import { cookies } from "next/headers";
import { fetchDashboardStats, fetchUpcomingAppointments } from "@/services/dashboardService";
import StatCard from "@/components/dashboard/StatCard";
import AppointmentsChart from "@/components/dashboard/AppointmentsChart";
import ConditionsChart from "@/components/dashboard/ConditionsChart";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import { seedDoctorData } from "@/utils/seedData";

// Get doctorId from auth store via cookie — in production use Firebase Admin to verify token
async function getDoctorId(): Promise<string> {
  const raw = (await cookies()).get("auth-storage")?.value;
  if (!raw) return "";
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    return parsed?.state?.user?.uid ?? "";
  } catch { return ""; }
}

export default async function DashboardPage() {
  const doctorId = await getDoctorId();

  // ⚠️ Run once to seed data, then remove these two lines
//   await seedDoctorData(doctorId);

  const [stats, appointments] = await Promise.all([
    fetchDashboardStats(doctorId),
    fetchUpcomingAppointments(doctorId),
  ]);

  const statCards = [
    { label: "Total patients",        value: stats.totalPatients,         sub: "All registered patients",  accent: "#7F77DD" },
    { label: "Active cases",          value: stats.activePatients,        sub: "Currently under care",     accent: "#1D9E75" },
    { label: "Upcoming appointments", value: stats.upcomingAppointments,  sub: "Scheduled visits",         accent: "#378ADD" },
    { label: "Completed this month",  value: stats.completedAppointments, sub: "Appointments wrapped up",  accent: "#D85A30" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 500, color: "var(--color-text-primary)" }}>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {statCards.map(card => <StatCard key={card.label} {...card} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
        <AppointmentsChart />
        <ConditionsChart />
      </div>

      <UpcomingAppointments appointments={appointments} />
    </div>
  );
}