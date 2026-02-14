// ─── Injected Google Font ───────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Sora:wght@300;400;500;600&display=swap');

    :root {
      --bg:        #030d1a;
      --surface:   #071628;
      --card:      #0c2040;
      --border:    #0e3d6a;
      --cyan:      #00d4ff;
      --green:     #00ff9d;
      --amber:     #ffb800;
      --red:       #ff2d55;
      --text:      #c8e8f8;
      --muted:     #3a6a9a;
      --glow-c:    rgba(0,212,255,0.18);
      --glow-g:    rgba(0,255,157,0.15);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { height: 100%; background: var(--bg); }
    body { font-family: 'Sora', sans-serif; color: var(--text); overflow-x: hidden; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--surface); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

    /* Scanline bg effect */
    .scanlines::before {
      content: ''; pointer-events: none;
      position: fixed; inset: 0; z-index: 999;
      background: repeating-linear-gradient(
        to bottom,
        transparent 0px, transparent 3px,
        rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
      );
    }

    /* Grid bg */
    .grid-bg {
      background-image:
        linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    /* Pulse animation */
    @keyframes pulse-ring {
      0%   { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    @keyframes float-up {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
    @keyframes slide-in-right {
      from { transform: translateX(40px); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes slide-in-up {
      from { transform: translateY(30px); opacity: 0; }
      to   { transform: translateY(0); opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes progress-fill {
      from { width: 0%; }
    }

    .float-up   { animation: float-up 0.5s ease forwards; }
    .slide-right{ animation: slide-in-right 0.4s ease forwards; }
    .slide-up   { animation: slide-in-up 0.4s ease forwards; }

    /* Buttons */
    .btn-primary {
      background: linear-gradient(135deg, var(--cyan), #007acc);
      border: none; border-radius: 8px;
      color: #fff; cursor: pointer;
      font-family: 'Sora', sans-serif;
      font-weight: 600; letter-spacing: 0.03em;
      padding: 12px 28px; font-size: 0.95rem;
      transition: all 0.2s;
      box-shadow: 0 0 16px rgba(0,212,255,0.3);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 28px rgba(0,212,255,0.5); }
    .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    .btn-secondary {
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 8px; color: var(--text);
      cursor: pointer; font-family: 'Sora', sans-serif;
      font-size: 0.9rem; padding: 10px 22px;
      transition: all 0.2s;
    }
    .btn-secondary:hover { border-color: var(--cyan); color: var(--cyan); }

    /* Card */
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      position: relative; overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    }

    /* Input */
    .input-field {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 8px; color: var(--text);
      font-family: 'Sora', sans-serif; font-size: 0.95rem;
      padding: 12px 16px; width: 100%;
      transition: border-color 0.2s;
      outline: none;
    }
    .input-field:focus { border-color: var(--cyan); box-shadow: 0 0 0 3px rgba(0,212,255,0.1); }
    .input-field::placeholder { color: var(--muted); }

    /* Risk badges */
    .badge-critical { background: rgba(255,45,85,0.15); color: var(--red);   border: 1px solid rgba(255,45,85,0.4); }
    .badge-high     { background: rgba(255,184,0,0.15);  color: var(--amber); border: 1px solid rgba(255,184,0,0.4); }
    .badge-medium   { background: rgba(0,212,255,0.12);  color: var(--cyan);  border: 1px solid rgba(0,212,255,0.4); }
    .badge-low      { background: rgba(0,255,157,0.12);  color: var(--green); border: 1px solid rgba(0,255,157,0.4); }

    .badge {
      display: inline-flex; align-items: center; gap: 5px;
      border-radius: 20px; font-size: 0.75rem;
      font-weight: 600; padding: 3px 10px; letter-spacing: 0.05em;
    }

    /* Progress bar */
    .progress-bar {
      background: var(--border); border-radius: 4px;
      height: 6px; overflow: hidden;
    }
    .progress-fill {
      height: 100%; border-radius: 4px;
      animation: progress-fill 1s ease;
    }

    /* Hospital card hover */
    .hospital-card { cursor: pointer; transition: all 0.2s; }
    .hospital-card:hover { border-color: var(--cyan); transform: translateY(-2px); }
    .hospital-card.selected { border-color: var(--cyan); background: rgba(0,212,255,0.07); }

    /* Token display */
    .token-number {
      font-family: 'Orbitron', sans-serif;
      font-size: 5rem; font-weight: 900;
      background: linear-gradient(135deg, var(--cyan), var(--green));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      line-height: 1;
      filter: drop-shadow(0 0 20px rgba(0,212,255,0.5));
    }

    /* Live indicator */
    .live-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--green);
      animation: blink 1.5s infinite;
      box-shadow: 0 0 8px var(--green);
      display: inline-block;
    }

    /* Step indicator */
    .step-dot {
      width: 10px; height: 10px; border-radius: 50%;
      border: 2px solid var(--border);
      transition: all 0.3s;
    }
    .step-dot.active { background: var(--cyan); border-color: var(--cyan); box-shadow: 0 0 8px var(--cyan); }
    .step-dot.done { background: var(--green); border-color: var(--green); }

    /* Map simulation */
    .map-container {
      background: radial-gradient(ellipse at center, #071e38 0%, var(--bg) 70%);
      border: 1px solid var(--border);
      border-radius: 12px; position: relative;
      overflow: hidden;
    }
    .map-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px);
      background-size: 32px 32px;
    }
    .map-pin {
      position: absolute;
      transform: translate(-50%, -50%);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .map-pin:hover { transform: translate(-50%, -55%) scale(1.2); }

    /* Spinner */
    .spinner {
      width: 40px; height: 40px;
      border: 3px solid var(--border);
      border-top-color: var(--cyan);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    /* Queue row */
    .queue-row { transition: all 0.3s; }
    .queue-row:hover { background: rgba(0,212,255,0.04); }

    /* Textarea */
    textarea.input-field { resize: vertical; min-height: 100px; }

    /* Nav */
    .nav-tab {
      background: transparent; border: none;
      color: var(--muted); cursor: pointer;
      font-family: 'Sora', sans-serif; font-size: 0.85rem;
      padding: 8px 16px; border-radius: 6px;
      transition: all 0.2s;
    }
    .nav-tab.active { color: var(--cyan); background: rgba(0,212,255,0.08); }

    /* Score bar */
    .score-bar { height: 4px; background: var(--border); border-radius: 2px; }
    .score-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--cyan), var(--green)); }

    /* Glow divider */
    .glow-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border), transparent);
      margin: 16px 0;
    }
  `}</style>
);

export default FontLink;
