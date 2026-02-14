import { useState , useEffect } from "react";
import scoreHospital from '../utilities/scoring';
import { getRiskBadgeClass } from "../utilities/hospitalUtils";
import checkHospitalAvailability from "../utilities/hospitalUtils";
// ─── STEP 4: Analysis + Recommendation ───────────────────────────────────────
export default function RecommendationStep({ data, onNext, onBack }) {
  const { symptoms, analysis, hospitals } = data;
  const [selected, setSelected] = useState(null);

  const filtered = hospitals
    .map(h => ({ ...h, score: scoreHospital(h, analysis.specialization, analysis.riskLevel) }))
    .filter(h => h.specializations.some(s =>
      s.toLowerCase().includes(analysis.specialization.toLowerCase().split(" ")[0])
    ) || true)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const best = filtered[0];
  const maxScore = Math.max(...filtered.map(h => h.score));

  useEffect(() => { setSelected(best?.id); }, []);

  const urgencyColors = { immediate: "var(--red)", urgent: "var(--amber)", "semi-urgent": "var(--cyan)", "non-urgent": "var(--green)" };
  const uColor = urgencyColors[analysis.urgency] || "var(--cyan)";

  return (
    <div className="slide-up" style={{ maxWidth: 680, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button className="btn-secondary" onClick={onBack} style={{ padding: "8px 14px" }}>←</button>
        <div>
          <h2 style={{ fontFamily: "Orbitron", fontSize: "1rem", letterSpacing: "0.1em", color: "var(--cyan)" }}>
            AI ANALYSIS COMPLETE
          </h2>
          <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Claude AI Medical Triage Result</div>
        </div>
      </div>

      {/* AI Result Card */}
      <div className="card" style={{ padding: 24, marginBottom: 20, background: "rgba(0,255,157,0.04)", borderColor: "rgba(0,255,157,0.2)" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 4, letterSpacing: "0.1em" }}>DIAGNOSIS INDICATORS</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              <span className={`badge ${getRiskBadgeClass(analysis.riskLevel)}`}>
                ⚠ {analysis.riskLevel} Risk
              </span>
              <span className="badge" style={{ background: "rgba(0,255,157,0.1)", color: "var(--green)", border: "1px solid rgba(0,255,157,0.3)" }}>
                🏥 {analysis.specialization}
              </span>
              <span className="badge" style={{ background: `rgba(0,0,0,0.3)`, color: uColor, border: `1px solid ${uColor}44` }}>
                ⏱ {analysis.urgency}
              </span>
            </div>
            <div style={{ fontSize: "0.83rem", color: "var(--text)", marginBottom: 8 }}>
              {analysis.reasoning}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
              💊 {analysis.recommendation}
            </div>
          </div>
          {analysis.conditions?.length > 0 && (
            <div style={{ minWidth: 160 }}>
              <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginBottom: 8, letterSpacing: "0.1em" }}>POSSIBLE CONDITIONS</div>
              {analysis.conditions.map(c => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.82rem" }}>{c}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hospital Recommendations */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "Orbitron", fontSize: "0.82rem", color: "var(--cyan)", letterSpacing: "0.1em", marginBottom: 12 }}>
          🏆 RANKED HOSPITAL MATCHES
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((h, i) => {
            const avail = checkHospitalAvailability(h);
            const scorePercent = (h.score / maxScore) * 100;
            const isSelected = selected === h.id;
            return (
              <div key={h.id} className={`card hospital-card ${isSelected ? "selected" : ""}`}
                onClick={() => setSelected(h.id)}
                style={{ padding: "14px 18px", opacity: avail.available ? 1 : 0.6 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: i === 0 ? "linear-gradient(135deg,#ffd700,#ff8c00)" : "var(--surface)",
                    border: `1px solid ${i === 0 ? "#ffd700" : "var(--border)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Orbitron", fontWeight: 700, fontSize: "0.85rem",
                    color: i === 0 ? "#fff" : "var(--muted)", flexShrink: 0
                  }}>
                    {i === 0 ? "★" : i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 6 }}>
                      <span style={{ fontWeight: 600 }}>{h.name}</span>
                      <div style={{ display: "flex", gap: 6 }}>
                        {i === 0 && <span className="badge badge-low" style={{ fontSize: "0.7rem" }}>⭐ Best Match</span>}
                        {!avail.available && <span className="badge badge-critical" style={{ fontSize: "0.7rem" }}>{avail.reason}</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 14, fontSize: "0.8rem", color: "var(--muted)", marginBottom: 8, flexWrap: "wrap" }}>
                      <span>★ {h.rating}</span>
                      <span>📍 {h.distance} km</span>
                      <span>💬 {h.reviews.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="score-bar" style={{ flex: 1 }}>
                        <div className="score-fill" style={{ width: `${scorePercent}%`, transition: "width 0.8s ease" }} />
                      </div>
                      <span style={{ fontSize: "0.78rem", color: "var(--cyan)", fontWeight: 700, minWidth: 36 }}>
                        { h.score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ padding: "16px 20px", background: "rgba(0,212,255,0.04)" }}>
        <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: 12 }}>
          {selected
            ? <span>Generating token for: <strong style={{ color: "var(--cyan)" }}>{filtered.find(h => h.id === selected)?.name}</strong></span>
            : "Select a hospital above"}
        </div>
        <button className="btn-primary" disabled={!selected}
          onClick={() => {
            const hospital = filtered.find(h => h.id === selected);
            const avail = checkHospitalAvailability(hospital);
            onNext({ hospital, analysis, avail });
          }} style={{ width: "100%" }}>
          🎫 Generate Priority Token →
        </button>
      </div>
    </div>
  );
}