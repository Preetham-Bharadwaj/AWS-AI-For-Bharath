import {getRiskPriority}from './hospitalUtils';

export default function scoreHospital(hospital, specialization, riskLevel) {
  const riskP = getRiskPriority(riskLevel);
  const distScore = Math.max(0, 10 - hospital.distance);
  const ratingScore = hospital.rating * 2;
  const reviewScore = Math.min(hospital.reviews / 1000, 3);
  const specMatch = hospital.specializations.some(s =>
    s.toLowerCase().includes(specialization?.toLowerCase() || "")
  ) ? 5 : 0;
  const total = (riskP * 3) + distScore + ratingScore + reviewScore + specMatch;
  return Math.round(total * 10) / 10;
}