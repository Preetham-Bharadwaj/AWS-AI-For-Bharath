// ─── Utilities ───────────────────────────────────────────────────────────────
export function getTimeMinutes(timeStr = "") {
  const [h, m] = timeStr.split(":").map(Number);
  console.log(`Hours is {h} and minutes is {m}`);
  return h * 60 + m;
}

export function nowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export default function checkHospitalAvailability(hospital) {
  // const now = nowMinutes();
  // // const open  = getTimeMinutes(hospital.openTime);
  // // const close = getTimeMinutes(hospital.closeTime);

  // // if (now < open || now > close) {
  // //   return { available: false, reason: "Closed", next: hospital.openTime };
  // // }
  // if (hospital.lunchBreak) {
  //   const ls = getTimeMinutes(hospital.lunchBreak.start);
  //   const le = getTimeMinutes(hospital.lunchBreak.end);
  //   if (now >= ls && now <= le) {
  //     return { available: false, reason: "Lunch Break", next: hospital.lunchBreak.end };
  //   }
  // }
  // if (hospital.teaBreak) {
  //   const ts = getTimeMinutes(hospital.teaBreak.start);
  //   const te = getTimeMinutes(hospital.teaBreak.end);
  //   if (now >= ts && now <= te) {
  //     return { available: false, reason: "Tea Break", next: hospital.teaBreak.end };
  //   }
  // }
  return { available: true };
}

export function getRiskColor(risk) {
  const map = { critical: "var(--red)", high: "var(--amber)", medium: "var(--cyan)", low: "var(--green)" };
  return map[risk?.toLowerCase()] || "var(--muted)";
}

export function getRiskBadgeClass(risk) {
  const map = { critical: "badge-critical", high: "badge-high", medium: "badge-medium", low: "badge-low" };
  return map[risk?.toLowerCase()] || "badge-medium";
}

export function getRiskPriority(risk) {
  const map = { critical: 4, high: 3, medium: 2, low: 1 };
  return map[risk?.toLowerCase()] || 1;
}
