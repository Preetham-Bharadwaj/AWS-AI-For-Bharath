// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function HexIcon({ icon, color = "var(--cyan)", size = 40 }) {
  return (
    <div style={{
      width: size, height: size,
      background: `rgba(0,0,0,0.3)`,
      border: `1px solid ${color}`,
      borderRadius: 10, display: "flex",
      alignItems: "center", justifyContent: "center",
      boxShadow: `0 0 12px ${color}33`,
      fontSize: size * 0.45, flexShrink: 0
    }}>{icon}</div>
  );
}

export default HexIcon;
