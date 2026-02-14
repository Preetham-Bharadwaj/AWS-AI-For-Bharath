// ─── Token Store ─────────────────────────────────────────────────────────────
import { getRiskPriority } from "./hospitalUtils";
const tokenDB = {};
export default function generateTokenForHospital(hospitalId, riskLevel) {
  if (!tokenDB[hospitalId]) {
    tokenDB[hospitalId] = {
      queue: [], currentToken: 0, nextToken: 1
    };
  }
  const db = tokenDB[hospitalId];
  const token = {
    id: db.nextToken++,
    risk: riskLevel,
    priority: getRiskPriority(riskLevel),
    time: new Date(),
    waitMins: 0
  };
  db.queue.push(token);
  db.queue.sort((a, b) => b.priority - a.priority || a.time - b.time);
  const pos = db.queue.findIndex(t => t.id === token.id);
  token.waitMins = pos * 12;
  return { token, position: pos + 1, total: db.queue.length, queue: [...db.queue] };
}