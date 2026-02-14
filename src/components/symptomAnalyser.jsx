//import { useState } from "react";

// ─── AI Symptom Analysis ─────────────────────────────────────────────────────
export default async function analyzeSymptoms(symptoms) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `You are a medical triage AI. Analyze the following symptoms and return a JSON object only (no markdown, no explanation):
Symptoms: "${symptoms}"

Return exactly this JSON structure:
{
  "specialization": "the medical specialty needed (e.g. Cardiology, General Medicine, Dermatology, Orthopedics, Neurology, Pediatrics, Gynecology, Gastroenterology, ENT, Ophthalmology, Psychiatry)",
  "riskLevel": "Critical|High|Medium|Low",
  "conditions": ["possible condition 1", "possible condition 2"],
  "reasoning": "one sentence explanation",
  "urgency": "immediate|urgent|semi-urgent|non-urgent",
  "recommendation": "brief triage recommendation"
}`
        }]
      })
    });
    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    // Fallback local logic
    const s = symptoms.toLowerCase();
    if (s.includes("chest") || s.includes("heart") || s.includes("breath"))
      return { specialization: "Cardiology", riskLevel: "Critical", conditions: ["Possible cardiac event"], reasoning: "Chest/breathing symptoms require immediate attention.", urgency: "immediate", recommendation: "Go to emergency immediately." };
    if (s.includes("fever") || s.includes("cold") || s.includes("cough"))
      return { specialization: "General Medicine", riskLevel: "Medium", conditions: ["Viral infection","Flu"], reasoning: "Fever symptoms suggest viral or bacterial infection.", urgency: "urgent", recommendation: "See a general physician soon." };
    if (s.includes("skin") || s.includes("rash") || s.includes("itch"))
      return { specialization: "Dermatology", riskLevel: "Low", conditions: ["Dermatitis","Allergic reaction"], reasoning: "Skin symptoms are generally non-urgent.", urgency: "non-urgent", recommendation: "Schedule a dermatology appointment." };
    if (s.includes("bone") || s.includes("joint") || s.includes("fracture"))
      return { specialization: "Orthopedics", riskLevel: "High", conditions: ["Fracture","Joint disorder"], reasoning: "Bone/joint pain needs prompt evaluation.", urgency: "urgent", recommendation: "Get an X-ray and orthopedic consultation." };
    if (s.includes("head") || s.includes("dizz") || s.includes("neuro"))
      return { specialization: "Neurology", riskLevel: "High", conditions: ["Migraine","Neurological disorder"], reasoning: "Neurological symptoms require evaluation.", urgency: "urgent", recommendation: "See a neurologist." };
    return { specialization: "General Medicine", riskLevel: "Medium", conditions: ["Unspecified condition"], reasoning: "General symptoms assessed.", urgency: "semi-urgent", recommendation: "Consult a general physician." };
  }
}
