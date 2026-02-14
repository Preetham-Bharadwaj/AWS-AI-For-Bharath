import { useState } from "react";
import analyzeSymptoms   from './symptomAnalyser'
 // ─── STEP 3: Symptoms ─────────────────────────────────────────────────────────
export default function SymptomsStep({ hospitals, onNext, onBack }) {
  const [symptoms, setSymptoms] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const PRESETS = [
    ["Chest Pain / Breathing", "chest pain, shortness of breath, heart palpitations"],
    ["Fever & Headache",       "high fever, severe headache, body ache, chills"],
    ["Skin Rash / Itching",    "skin rash, severe itching, redness, inflammation"],
    ["Bone / Joint Pain",      "severe knee pain, joint swelling, difficulty walking"],
    ["Stomach Issues",         "severe abdominal pain, nausea, vomiting, diarrhea"],
    ["Dizziness / Neuro",      "dizziness, vision blur, numbness in hands, confusion"],
  ];

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    setAnalyzing(true);
    const analysis = await analyzeSymptoms(symptoms);
    setAnalyzing(false);
    onNext({ symptoms, analysis, hospitals });
  };

  return (
    <div className="slide-up" style={{ maxWidth: 600, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <button className="btn-secondary" onClick={onBack} style={{ padding: "8px 14px" }}>←</button>
        <div>
          <h2 style={{ fontFamily: "Orbitron", fontSize: "1rem", letterSpacing: "0.1em", color: "var(--cyan)" }}>
            SYMPTOM ANALYSIS
          </h2>
          <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Powered by Claude AI • Real-time medical triage</div>
        </div>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text)", marginBottom: 8, fontWeight: 600 }}>
            🩺 Describe Your Symptoms
          </label>
          <textarea className="input-field" placeholder="e.g. I have severe chest pain, shortness of breath, and my left arm feels numb since 30 minutes..."
            value={symptoms} onChange={e => setSymptoms(e.target.value)} rows={4}
            style={{ minHeight: 110 }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: 10 }}>⚡ Quick Select:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {PRESETS.map(([label, value]) => (
              <button key={label} onClick={() => setSymptoms(value)}
                style={{
                  background: symptoms === value ? "rgba(0,212,255,0.12)" : "transparent",
                  border: `1px solid ${symptoms === value ? "var(--cyan)" : "var(--border)"}`,
                  borderRadius: 8, color: symptoms === value ? "var(--cyan)" : "var(--muted)",
                  cursor: "pointer", fontSize: "0.78rem", fontFamily: "Sora",
                  padding: "8px 10px", textAlign: "left", transition: "all 0.2s"
                }}>{label}</button>
            ))}
          </div>
        </div>

        {analyzing ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "20px 0" }}>
            <div className="spinner" style={{ borderTopColor: "var(--green)" }} />
            <div style={{ fontFamily: "Orbitron", fontSize: "0.8rem", color: "var(--green)", letterSpacing: "0.15em", animation: "blink 1.2s infinite" }}>
              AI ANALYZING SYMPTOMS…
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>Consulting medical knowledge base</div>
          </div>
        ) : (
          <button className="btn-primary" onClick={handleAnalyze} disabled={!symptoms.trim()} style={{ width: "100%" }}>
            🤖 Analyze with AI → Get Recommendations
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {[["Critical","chest pain, difficulty breathing","var(--red)"],
          ["High","severe pain, high fever","var(--amber)"],
          ["Medium","moderate symptoms","var(--cyan)"],
          ["Low","mild discomfort","var(--green)"]].map(([r,e,c]) => (
          <div key={r} className="card" style={{ padding: "10px 12px", borderColor: c.replace("var(--","rgba(").replace(")",",0.3)") }}>
            <div style={{ color: c, fontSize: "0.75rem", fontWeight: 700, marginBottom: 3 }}>{r}</div>
            <div style={{ color: "var(--muted)", fontSize: "0.7rem" }}>{e}</div>
          </div>
        ))}
      </div>
    </div>
  );
}