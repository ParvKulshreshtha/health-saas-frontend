"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Hypertension", value: 2 },
  { name: "Diabetes",     value: 2 },
  { name: "Asthma",       value: 1 },
  { name: "Migraine",     value: 1 },
  { name: "Other",        value: 4 },
];
const COLORS = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD", "#888780"];

export default function ConditionsChart() {
  return (
    <div style={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "24px" }}>
      <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "20px", color: "var(--color-text-primary)" }}>Conditions breakdown</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: "var(--color-background-primary)", border: "1px solid var(--color-border-secondary)", borderRadius: "8px", fontSize: "13px" }} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}