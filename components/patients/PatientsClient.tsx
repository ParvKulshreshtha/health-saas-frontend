"use client";
import { useState } from "react";
import { Patient } from "@/types/index.type";
import { usePatientsStore } from "@/store/usePatientsStore";
import PatientGrid from "./PatientGrid";
import PatientList from "./PatientList";

export default function PatientsClient({ patients }: { patients: Patient[] }) {
  const { viewMode, setViewMode } = usePatientsStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.condition.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search patients or conditions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, padding: "8px 12px", fontSize: "13px",
            border: "1px solid var(--color-border-secondary)",
            borderRadius: "var(--border-radius-md)",
            background: "var(--color-background-primary)",
            color: "var(--color-text-primary)",
            outline: "none",
          }}
        />

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as any)}
          style={{
            padding: "8px 12px", fontSize: "13px",
            border: "1px solid var(--color-border-secondary)",
            borderRadius: "var(--border-radius-md)",
            background: "var(--color-background-primary)",
            color: "var(--color-text-primary)",
            cursor: "pointer",
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* View toggle */}
        <div style={{
          display: "flex", border: "1px solid var(--color-border-secondary)",
          borderRadius: "var(--border-radius-md)", overflow: "hidden",
        }}>
          {(["grid", "list"] as const).map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)} style={{
              padding: "8px 14px", fontSize: "13px", cursor: "pointer",
              border: "none", borderRight: mode === "grid" ? "1px solid var(--color-border-secondary)" : "none",
              background: viewMode === mode ? "var(--color-background-secondary)" : "var(--color-background-primary)",
              color: viewMode === mode ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              fontWeight: viewMode === mode ? 500 : 400,
            }}>
              {mode === "grid" ? "⊞ Grid" : "☰ List"}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
        {filtered.length} patient{filtered.length !== 1 ? "s" : ""}
      </p>

      {viewMode === "grid" ? <PatientGrid patients={filtered} /> : <PatientList patients={filtered} />}
    </div>
  );
}