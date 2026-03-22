interface Props { label: string; value: number; sub: string; accent: string; }

export default function StatCard({ label, value, sub, accent }: Props) {
  return (
    <div style={{
      background: "var(--color-background-primary)",
      border: "1px solid var(--color-border-tertiary)",
      borderRadius: "var(--border-radius-lg)",
      borderTop: `3px solid ${accent}`,
      padding: "24px",
      display: "flex", flexDirection: "column", gap: "8px",
    }}>
      <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{label}</span>
      <span style={{ fontSize: "32px", fontWeight: 500, lineHeight: 1, color: "var(--color-text-primary)" }}>{value}</span>
      <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>{sub}</span>
    </div>
  );
}