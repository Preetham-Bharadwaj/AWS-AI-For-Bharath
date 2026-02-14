import { useState , useEffect } from "react";
import { getRiskColor } from "../utilities/hospitalUtils";
import generateTokenForHospital from "../utilities/tokenSystem";
import { getRiskBadgeClass } from "../utilities/hospitalUtils";

// ─── STEP 5: Token + Queue ────────────────────────────────────────────────────
export default function TokenStep({ data, onRestart }) {
  const { hospital, analysis, avail } = data;
  const [tokenData, setTokenData]   = useState(null);
  const [tab, setTab]               = useState("token");
  const [tick, setTick]             = useState(0);

  useEffect(() => {
    if (avail.available) {
      const result = generateTokenForHospital(hospital.id, analysis.riskLevel);
      setTokenData(result);
    }
    const t = setInterval(() => setTick(n => n + 1), 30000);
    return () => clearInterval(t);
  }, []);

  const riskColor = getRiskColor(analysis.riskLevel);

  if (!avail.available) return (
    <div className="slide-up" style={{ maxWidth: 540, margin: "0 auto", padding: "40px 20px" }}>
      <div className="card" style={{ padding: 32, textAlign: "center", borderColor: "rgba(255,45,85,0.3)" }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🚫</div>
        <h2 style={{ fontFamily: "Orbitron", color: "var(--red)", marginBottom: 8 }}>UNAVAILABLE</h2>
        <p style={{ color: "var(--muted)", marginBottom: 20 }}>
          {hospital.name} is currently on <strong style={{ color: "var(--amber)" }}>{avail.reason}</strong>
        </p>
        <div className="card" style={{ padding: 16, marginBottom: 24, background: "rgba(0,212,255,0.06)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Next Available Slot</div>
          <div style={{ fontFamily: "Orbitron", color: "var(--cyan)", fontSize: "1.5rem", marginTop: 4 }}>
            {avail.next}
          </div>
        </div>
        <button className="btn-primary" onClick={onRestart} style={{ width: "100%" }}>
          ← Choose Another Hospital
        </button>
      </div>
    </div>
  );

  if (!tokenData) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
      <div className="spinner" />
    </div>
  );

  const { token, position, total, queue } = tokenData;

  return (
    <div className="slide-up" style={{ maxWidth: 620, margin: "0 auto", padding: "24px 20px" }}>
      {/* Success Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontFamily: "Orbitron", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--green)", marginBottom: 8 }}>
          ✅ TOKEN GENERATED SUCCESSFULLY
        </div>
        <h1 style={{ fontFamily: "Orbitron", color: "var(--text)", fontSize: "1.2rem" }}>{hospital.name}</h1>
        <div style={{ color: "var(--muted)", fontSize: "0.82rem", marginTop: 4 }}>{hospital.address}</div>
      </div>

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, background: "var(--surface)", padding: 4, borderRadius: 10 }}>
        {["token","queue","details"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              flex: 1, padding: "8px 0", border: "none", borderRadius: 7, cursor: "pointer",
              background: tab === t ? "var(--card)" : "transparent",
              color: tab === t ? "var(--cyan)" : "var(--muted)",
              fontFamily: "Sora", fontSize: "0.85rem", fontWeight: 600,
              boxShadow: tab === t ? "0 0 8px rgba(0,212,255,0.15)" : "none",
              transition: "all 0.2s"
            }}>
            {t === "token" ? "🎫 Token" : t === "queue" ? "📋 Queue" : "🏥 Details"}
          </button>
        ))}
      </div>

      {tab === "token" && (
        <div className="slide-up">
          {/* Token card */}
          <div className="card" style={{ padding: 32, textAlign: "center", marginBottom: 16, background: "radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 70%)" }}>
            <div style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.15em", marginBottom: 8 }}>TOKEN NUMBER</div>
            <div className="token-number">T{String(token.id).padStart(3,"0")}</div>
            <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <span className={`badge ${getRiskBadgeClass(analysis.riskLevel)}`}>
                ⚠ {analysis.riskLevel} Priority
              </span>
              <span className="badge badge-low">🏥 {analysis.specialization}</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
            {[
              ["Position in Queue", `${position} of ${total}`, "📍"],
              ["Est. Wait Time", token.waitMins ? `~${token.waitMins} min` : "<5 min", "⏱"],
              ["Priority Level", analysis.riskLevel, "🔥"]
            ].map(([label, val, icon]) => (
              <div key={label} className="card" style={{ padding: "14px 12px", textAlign: "center" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>{icon}</div>
                <div style={{ fontFamily: "Orbitron", fontSize: "1rem", color: "var(--cyan)", fontWeight: 700 }}>{val}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Live indicator */}
          <div className="card" style={{ padding: 14, display: "flex", alignItems: "center", gap: 10, marginBottom: 16, background: "rgba(0,255,157,0.04)" }}>
            <span className="live-dot" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text)", fontWeight: 600 }}>Live Queue Tracking Active</div>
              <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>Updates every 30 seconds • Show this token at reception</div>
            </div>
            <div style={{ fontFamily: "Orbitron", fontSize: "0.75rem", color: "var(--green)" }}>LIVE</div>
          </div>

          {analysis.riskLevel === "Critical" && (
            <div className="card" style={{ padding: 14, background: "rgba(255,45,85,0.08)", borderColor: "rgba(255,45,85,0.4)", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: "1.5rem" }}>🚨</span>
                <div>
                  <div style={{ color: "var(--red)", fontWeight: 700, fontSize: "0.9rem" }}>CRITICAL — Immediate Attention Required</div>
                  <div style={{ color: "var(--muted)", fontSize: "0.78rem" }}>Please proceed to emergency immediately. Inform staff of your critical status.</div>
                </div>
              </div>
            </div>
          )}

          <button className="btn-secondary" onClick={onRestart} style={{ width: "100%", marginTop: 4 }}>
            + Register New Patient
          </button>
        </div>
      )}

      {tab === "queue" && (
        <div className="slide-up">
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
              <span className="live-dot" />
              <span style={{ fontFamily: "Orbitron", fontSize: "0.82rem", letterSpacing: "0.1em", color: "var(--cyan)" }}>
                LIVE PRIORITY QUEUE — {hospital.name}
              </span>
              <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--muted)" }}>{total} patients</span>
            </div>
            {queue.slice(0, 8).map((q, i) => {
              const isCurrent = i === 0;
              const isMine    = q.id === token.id;
              return (
                <div key={q.id} className="queue-row" style={{
                  padding: "12px 18px", borderBottom: "1px solid rgba(14,61,106,0.5)",
                  background: isMine ? "rgba(0,212,255,0.07)" : isCurrent ? "rgba(0,255,157,0.04)" : "transparent",
                  display: "flex", alignItems: "center", gap: 12
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: isCurrent ? "var(--green)" : "var(--surface)",
                    border: `1px solid ${isCurrent ? "var(--green)" : "var(--border)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Orbitron", fontSize: "0.8rem", fontWeight: 700,
                    color: isCurrent ? "var(--bg)" : "var(--muted)",
                    flexShrink: 0
                  }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontFamily: "Orbitron", color: isMine ? "var(--cyan)" : "var(--text)", fontSize: "0.9rem" }}>
                        T{String(q.id).padStart(3,"0")}
                      </span>
                      <span className={`badge ${getRiskBadgeClass(q.risk)}`}>{q.risk}</span>
                      {isMine && <span className="badge badge-medium">← You</span>}
                      {isCurrent && <span className="badge badge-low">▶ Now Serving</span>}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: 2 }}>
                      Wait: ~{(i * 12)} min • Registered: {new Date(q.time).toLocaleTimeString()}
                    </div>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%",
                    background: getRiskColor(q.risk),
                    boxShadow: `0 0 6px ${getRiskColor(q.risk)}`
                  }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {[["Critical","var(--red)"],["High","var(--amber)"],["Medium","var(--cyan)"],["Low","var(--green)"]].map(([r,c]) => {
              const count = queue.filter(q => q.risk === r).length;
              return (
                <div key={r} className="card" style={{ padding: "10px", textAlign: "center", borderColor: `${c}44` }}>
                  <div style={{ color: c, fontFamily: "Orbitron", fontSize: "1.2rem", fontWeight: 700 }}>{count}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{r}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "details" && (
        <div className="slide-up">
          <div className="card" style={{ padding: 20, marginBottom: 12 }}>
            <div style={{ fontFamily: "Orbitron", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.1em", marginBottom: 12 }}>HOSPITAL INFORMATION</div>
            {[
              ["Name", hospital.name, "🏥"],
              ["Type", hospital.type, "🏢"],
              ["Address", hospital.address, "📍"],
              ["Phone", hospital.phone, "📞"],
              ["Rating", `${hospital.rating} ★  (${hospital.reviews.toLocaleString()} reviews)`, "⭐"],
              ["Distance", `${hospital.distance} km`, "🛣"],
              ["Total Beds", hospital.beds, "🛏"],
              ["Emergency", hospital.emergency ? "Available 24/7" : "Not Available", "🚨"],
            ].map(([k,v,icon]) => (
              <div key={k} style={{ display: "flex", gap: 12, paddingTop: 8, paddingBottom: 8, borderBottom: "1px solid rgba(14,61,106,0.4)" }}>
                <span style={{ fontSize: "1rem", width: 24 }}>{icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{k}</div>
                  <div style={{ fontSize: "0.9rem" }}>{v}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontFamily: "Orbitron", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.1em", marginBottom: 12 }}>OPERATING SCHEDULE</div>
            {[
              ["Hours", `${hospital.openTime} – ${hospital.closeTime}`],
              ["Lunch", hospital.lunchBreak ? `${hospital.lunchBreak.start} – ${hospital.lunchBreak.end}` : "No break"],
              ["Tea", hospital.teaBreak ? `${hospital.teaBreak.start} – ${hospital.teaBreak.end}` : "No break"],
            ].map(([k,v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(14,61,106,0.4)" }}>
                <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{k}</span>
                <span style={{ fontSize: "0.85rem" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}