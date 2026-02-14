import { useState } from "react";

// ─── STEP 1: Location ─────────────────────────────────────────────────────────
export default function LocationStep({ onNext }) {
  const [mode, setMode]       = useState("auto");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [manual, setManual]   = useState({ lat: "12.9716", lng: "77.5946", city: "Bengaluru, Karnataka" });

  const handleAuto = () => {
    setLoading(true); setError(null);
    navigator.geolocation.getCurrentPosition(
      pos => { setLoading(false); onNext({ lat: pos.coords.latitude, lng: pos.coords.longitude, city: "Your Location" }); },
      () => { setLoading(false); setError("GPS access denied. Use manual input."); setMode("manual"); }
    );
  };

  const handleManual = () => {
    onNext({ lat: parseFloat(manual.lat), lng: parseFloat(manual.lng), city: manual.city });
  };

  return (
    <div className="float-up" style={{ maxWidth: 520, margin: "0 auto", padding: "40px 20px" }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 50, height: 50, background: "linear-gradient(135deg,var(--cyan),var(--green))",
            borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, boxShadow: "0 0 24px rgba(0,212,255,0.4)"
          }}>⚕️</div>
          <div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--cyan)", letterSpacing: "0.1em" }}>
              AUTHEN<span style={{ color: "var(--green)" }}>X</span>
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.2em" }}>AI-POWERED HEALTHCARE TRIAGE</div>
          </div>
        </div>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: 360, margin: "0 auto" }}>
          Intelligent hospital recommendation & priority queue system
        </p>
      </div>

      <div className="card" style={{ padding: 32 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "Orbitron", fontSize: "1rem", letterSpacing: "0.12em", color: "var(--cyan)", marginBottom: 6 }}>
            📍 LOCATE YOU
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>We need your location to find nearby hospitals</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["auto","manual"].map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{
                flex: 1, padding: "10px 0", border: "1px solid",
                borderColor: mode === m ? "var(--cyan)" : "var(--border)",
                borderRadius: 8, background: mode === m ? "rgba(0,212,255,0.1)" : "transparent",
                color: mode === m ? "var(--cyan)" : "var(--muted)",
                cursor: "pointer", fontSize: "0.85rem", fontFamily: "Sora", fontWeight: 600,
                transition: "all 0.2s"
              }}>
              {m === "auto" ? "🌐 Auto-Detect" : "📌 Manual Entry"}
            </button>
          ))}
        </div>

        {mode === "auto" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 20px" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "linear-gradient(135deg,var(--cyan),var(--green))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2rem", position: "relative", zIndex: 1,
                boxShadow: "0 0 20px rgba(0,212,255,0.4)"
              }}>📍</div>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  border: "2px solid var(--cyan)",
                  animation: `pulse-ring ${1.5 + i * 0.4}s ease-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  opacity: 0
                }} />
              ))}
            </div>
            {error && <p style={{ color: "var(--red)", fontSize: "0.85rem", marginBottom: 16 }}>{error}</p>}
            <button className="btn-primary" onClick={handleAuto} disabled={loading} style={{ width: "100%" }}>
              {loading ? "Detecting Location…" : "Detect My Location"}
            </button>
          </div>
        )}

        {mode === "manual" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input className="input-field" placeholder="City / Area (e.g. Bengaluru, Karnataka)"
              value={manual.city} onChange={e => setManual(p => ({ ...p, city: e.target.value }))} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input className="input-field" placeholder="Latitude"
                value={manual.lat} onChange={e => setManual(p => ({ ...p, lat: e.target.value }))} />
              <input className="input-field" placeholder="Longitude"
                value={manual.lng} onChange={e => setManual(p => ({ ...p, lng: e.target.value }))} />
            </div>
            <button className="btn-primary" onClick={handleManual}>Find Hospitals →</button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 20 }}>
        {[["🏥","Real Hospital Data"],["🤖","AI Triage"],["🎫","Smart Queue"]].map(([icon, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.4rem", marginBottom: 4 }}>{icon}</div>
            <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}