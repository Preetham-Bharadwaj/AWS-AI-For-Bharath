import { useState , useEffect } from "react";
import checkHospitalAvailability from '../utilities/hospitalUtils';
import HexIcon from './common/hexIcon';
//import MOCK_HOSPITALS from '../data/hospitals_DB';
import getNearbyHospitalsFree  from "../servers/getHospitals";
// ─── STEP 2: Hospitals ────────────────────────────────────────────────────────
export default function HospitalsStep({ location, onNext, onBack }) {
  const [loading, setLoading]     = useState(true);
  const [hospitals, setHospitals] = useState([]);
  const [tab, setTab]             = useState("list");
  const [selected, setSelected]   = useState(null);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const data = await getNearbyHospitalsFree(latitude, longitude);
      setHospitals(data);
      setLoading(false);
    });
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const sorted = MOCK_HOSPITALS
  //       .map(h => ({ ...h, distVar: h.distance + (Math.random() * 0.4 - 0.2) }))
  //       .sort((a, b) => a.distVar - b.distVar);
  //     setHospitals(sorted);
  //     setLoading(false);
  //   }, 1800);
  // }, []);

  const renderMapPins = () => {
    const bounds = { minLat: 12.88, maxLat: 13.01, minLng: 77.57, maxLng: 77.71 };
    return hospitals.map((h, i) => {
      const left = ((h.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
      const top  = (1 - (h.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
      const avail = checkHospitalAvailability(h);
      return (
        <div key={h.id} className="map-pin"
          onClick={() => { setSelected(h.id); setTab("list"); }}
          style={{ left: `${Math.min(90,Math.max(10,left))}%`, top: `${Math.min(90,Math.max(10,top))}%` }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)",
            background: selected === h.id ? "var(--cyan)" : avail.available ? "var(--green)" : "var(--red)",
            border: "2px solid rgba(255,255,255,0.3)",
            boxShadow: `0 0 12px ${selected === h.id ? "var(--cyan)" : avail.available ? "var(--green)" : "var(--red)"}`,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ transform: "rotate(45deg)", fontSize: "0.8rem" }}>🏥</span>
          </div>
          <div style={{
            position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.85)", border: "1px solid var(--border)",
            borderRadius: 4, padding: "2px 8px", fontSize: "0.7rem",
            whiteSpace: "nowrap", color: "var(--text)"
          }}>{h.name}</div>
        </div>
      );
    });
  };

  if (loading) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, gap: 20 }}>
      <div className="spinner" />
      <div style={{ fontFamily: "Orbitron", fontSize: "0.85rem", color: "var(--cyan)", letterSpacing: "0.15em" }}>
        FETCHING NEARBY HOSPITALS…
      </div>
      <div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
        📍 {location.city} • Scanning {hospitals.length} facilities
      </div>
    </div>
  );

  return (
    <div className="slide-up" style={{ maxWidth: 700, margin: "0 auto", padding: "24px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button className="btn-secondary" onClick={onBack} style={{ padding: "8px 14px" }}>←</button>
        <div>
          <h2 style={{ fontFamily: "Orbitron", fontSize: "1rem", letterSpacing: "0.1em", color: "var(--cyan)" }}>
            NEARBY HOSPITALS
          </h2>
          <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
            📍 {location.city} • {hospitals.length} facilities found
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {["list","map"].map(t => (
            <button key={t} className={`nav-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t === "list" ? "☰ List" : "🗺 Map"}
            </button>
          ))}
        </div>
      </div>

      {tab === "map" && (
        <div className="map-container" style={{ height: 320, marginBottom: 20 }}>
          <div className="map-grid" />
          <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.7)", padding: "6px 12px", borderRadius: 6, fontSize: "0.72rem", color: "var(--muted)" }}>
            <span className="live-dot" style={{ marginRight: 6 }} />LIVE MAP VIEW
          </div>
          {/* User pin */}
          <div className="map-pin" style={{ left: "50%", top: "50%" }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              background: "var(--cyan)", border: "3px solid white",
              boxShadow: "0 0 16px var(--cyan)"
            }} />
          </div>
          {renderMapPins()}
          <div style={{ position: "absolute", bottom: 10, right: 10, fontSize: "0.7rem", color: "var(--muted)", display: "flex", gap: 12 }}>
            <span><span style={{ color: "var(--green)" }}>● </span>Open</span>
            <span><span style={{ color: "var(--red)" }}>● </span>Unavailable</span>
            <span><span style={{ color: "var(--cyan)" }}>● </span>Selected</span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {hospitals.map((h, i) => {
          const avail = checkHospitalAvailability(h);
          const isSelected = selected === h.id;
          return (
            <div key={h.id} className={`card hospital-card ${isSelected ? "selected" : ""}`}
              onClick={() => setSelected(isSelected ? null : h.id)}
              style={{ padding: "14px 18px", animationDelay: `${i * 0.06}s` }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <HexIcon icon="🏥" color={avail.available ? "var(--green)" : "var(--red)"} size={44} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{h.name}</span>
                    {!avail.available && (
                      <span className="badge badge-critical" style={{ fontSize: "0.7rem" }}>
                        {avail.reason} • Opens {avail.next}
                      </span>
                    )}
                    {avail.available && <span className="badge badge-low" style={{ fontSize: "0.7rem" }}>● Open</span>}
                    {h.emergency && <span className="badge" style={{ background: "rgba(255,45,85,0.1)", color: "var(--red)", border: "1px solid rgba(255,45,85,0.3)", fontSize: "0.7rem" }}>🚨 Emergency</span>}
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "0.8rem", marginBottom: 6 }}>{h.address}</div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <span style={{ color: "var(--amber)", fontSize: "0.82rem" }}>★ {h.rating}</span>
                    <span style={{ color: "var(--muted)", fontSize: "0.82rem" }}>💬 {h.reviews.toLocaleString()} reviews</span>
                    <span style={{ color: "var(--cyan)", fontSize: "0.82rem" }}>📍 {h.distance} km</span>
                    <span style={{ color: "var(--muted)", fontSize: "0.82rem" }}>🏢 {h.beds} beds</span>
                  </div>
                  {isSelected && (
                    <div style={{ marginTop: 10 }}>
                      <div className="glow-divider" />
                      <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: 6 }}>Specializations:</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {h.specializations.map(s => (
                          <span key={s} style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 4, padding: "2px 8px", fontSize: "0.75rem", color: "var(--cyan)" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ padding: "16px 20px", background: "rgba(0,212,255,0.04)" }}>
        <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: 10 }}>
          💡 Now enter your symptoms so we can find the <strong style={{ color: "var(--cyan)" }}>best matched hospital</strong> for you
        </div>
        <button className="btn-primary" onClick={() => onNext(hospitals)} style={{ width: "100%" }}>
          Enter Symptoms & Get AI Recommendation →
        </button>
      </div>
    </div>
  );
}