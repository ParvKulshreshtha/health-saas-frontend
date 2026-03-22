"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const weeklyData = [
  { day: "Mon", appointments: 4 },
  { day: "Tue", appointments: 7 },
  { day: "Wed", appointments: 5 },
  { day: "Thu", appointments: 9 },
  { day: "Fri", appointments: 6 },
  { day: "Sat", appointments: 3 },
  { day: "Sun", appointments: 1 },
];

export default function AppointmentsChart() {
  return (
    <div style={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "24px" }}>
      <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "20px", color: "var(--color-text-primary)" }}>Appointments this week</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeklyData} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-secondary)", borderRadius: "8px", fontSize: "13px" }} />
          <Bar dataKey="appointments" fill="#7F77DD" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}