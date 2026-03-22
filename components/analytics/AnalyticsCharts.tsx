"use client";
import { Patient, Appointment } from "@/types/index.type";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const COLORS = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD", "#888780"];

const card = {
  background: "var(--color-background-primary)",
  border: "1px solid var(--color-border-tertiary)",
  borderRadius: "var(--border-radius-lg)",
  padding: "24px",
};

const tooltipStyle = {
  contentStyle: {
    background: "var(--color-background-primary)",
    border: "1px solid var(--color-border-secondary)",
    borderRadius: "8px", fontSize: "13px",
  }
};

export default function AnalyticsCharts({ appointments, patients }: { appointments: Appointment[]; patients: Patient[] }) {
  // Patient growth by month
  const patientGrowth = MONTHS.map((month, i) => ({
    month,
    patients: patients.filter(p => new Date(p.createdAt).getMonth() === i).length,
  }));

  // Cumulative growth
  let cumulative = 0;
  const cumulativeGrowth = patientGrowth.map(d => {
    cumulative += d.patients;
    return { month: d.month, total: cumulative };
  });

  // Appointments trend by month
  const apptTrend = MONTHS.map((month, i) => ({
    month,
    scheduled: appointments.filter(a => new Date(a.date).getMonth() === i && a.status === "scheduled").length,
    completed: appointments.filter(a => new Date(a.date).getMonth() === i && a.status === "completed").length,
    cancelled: appointments.filter(a => new Date(a.date).getMonth() === i && a.status === "cancelled").length,
  }));

  // Appointment types breakdown
  const typeCount: Record<string, number> = {};
  appointments.forEach(a => { typeCount[a.type] = (typeCount[a.type] || 0) + 1; });
  const typeData = Object.entries(typeCount).map(([name, value]) => ({ name, value }));

  // Condition breakdown
  const condCount: Record<string, number> = {};
  patients.forEach(p => { condCount[p.condition] = (condCount[p.condition] || 0) + 1; });
  const condData = Object.entries(condCount).map(([name, value]) => ({ name, value }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Row 1 — Patient growth */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={card}>
          <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "20px", color: "var(--color-text-primary)" }}>New patients per month</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={patientGrowth} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="patients" fill="#7F77DD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={card}>
          <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "20px", color: "var(--color-text-primary)" }}>Cumulative patient growth</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={cumulativeGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="total" stroke="#1D9E75" fill="#E1F5EE" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2 — Appointments trend */}
      <div style={card}>
        <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "20px", color: "var(--color-text-primary)" }}>Appointments trend</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={apptTrend} barSize={16}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip {...tooltipStyle} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="scheduled" fill="#378ADD" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" fill="#1D9E75" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cancelled" fill="#D85A30" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Row 3 — Breakdowns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={card}>
          <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "20px", color: "var(--color-text-primary)" }}>Appointment types</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={typeData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                {typeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={card}>
          <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "20px", color: "var(--color-text-primary)" }}>Conditions breakdown</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={condData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                {condData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}