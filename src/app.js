import { useState} from "react";
import LocationStep from './components/location';
import HospitalsStep from './components/hospital';
import SymptomsStep from './components/symptom';
import RecommendationStep from './components/recommendation';
import TokenStep from './components/token';
import FontLink from "./styles/globalStyles";
// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep]   = useState(0);
  const [data, setData]   = useState({});

  const steps = ["Location","Hospitals","Symptoms","Recommendation","Token"];

  return (
    <>
      <FontLink />
      <div className="scanlines grid-bg" style={{ minHeight: "100vh" }}>
        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(3,13,26,0.95)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "12px 24px", display: "flex", alignItems: "center", gap: 16
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1.3rem" }}>⚕️</span>
            <span style={{ fontFamily: "Orbitron", fontWeight: 900, color: "var(--cyan)", fontSize: "1rem", letterSpacing: "0.1em" }}>
              AUTHEN<span style={{ color: "var(--green)" }}>X</span>
            </span>
          </div>
          {/* Step progress */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <div className={`step-dot ${i === step ? "active" : i < step ? "done" : ""}`} />
                  <span style={{ fontSize: "0.6rem", color: i === step ? "var(--cyan)" : i < step ? "var(--green)" : "var(--muted)" }}>
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 24, height: 1, background: i < step ? "var(--green)" : "var(--border)", marginBottom: 12 }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
            <span className="live-dot" style={{ marginRight: 5 }} />
            LIVE
          </div>
        </div>

        {/* Main content */}
        <div style={{ paddingBottom: 60 }}>
          {step === 0 && <LocationStep onNext={loc => { setData(d => ({ ...d, location: loc })); setStep(1); }} />}
          {step === 1 && (
            <HospitalsStep location={data.location}
              onNext={hospitals => { setData(d => ({ ...d, hospitals })); setStep(2); }}
              onBack={() => setStep(0)} />
          )}
          {step === 2 && (
            <SymptomsStep hospitals={data.hospitals}
              onNext={sd => { setData(d => ({ ...d, ...sd })); setStep(3); }}
              onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <RecommendationStep data={{ symptoms: data.symptoms, analysis: data.analysis, hospitals: data.hospitals }}
              onNext={rd => { setData(d => ({ ...d, ...rd })); setStep(4); }}
              onBack={() => setStep(2)} />
          )}
          {step === 4 && (
            <TokenStep
              data={{ hospital: data.hospital, analysis: data.analysis, avail: data.avail }}
              onRestart={() => { setData({}); setStep(0); }} />
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "20px", borderTop: "1px solid var(--border)", fontSize: "0.72rem", color: "var(--muted)" }}>
          AuthenX AI Healthcare Platform •  Real Hospital Data via OpenStreetMap (OSM) + Overpass API
        </div>
      </div>
    </>
  );
}
