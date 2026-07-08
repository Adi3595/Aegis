import { AIAgent, AgentRole } from "../types/ai"

// A helper to quickly scaffold mock agents
const createAgent = (id: string, role: AgentRole, name: string, description: string, focusKeywords: string[]): AIAgent => ({
  id,
  role,
  name,
  description,
  evaluateRelevance: (intent: string) => {
    // If the classified intent exactly matches the role, highly relevant
    if (intent === role) return 1.0
    // If the intent contains focus keywords, somewhat relevant
    const match = focusKeywords.some(keyword => intent.includes(keyword))
    return match ? 0.6 : 0.0
  }
})

export const agentRegistry: AIAgent[] = [
  createAgent("agent-nav", "navigation", "Navigation Agent", "Suggests optimal routes considering congestion and accessibility.", ["route", "path", "fastest", "gate"]),
  createAgent("agent-crowd", "crowd", "Crowd Intelligence Agent", "Analyzes density and predicts congestion zones.", ["congestion", "busy", "density"]),
  createAgent("agent-emergency", "emergency", "Emergency Response Agent", "Calculates evacuation routes and safety protocols.", ["fire", "exit", "danger"]),
  createAgent("agent-access", "accessibility", "Accessibility Agent", "Ensures compliance and accessible routing.", ["wheelchair", "disabled"]),
  createAgent("agent-transport", "transportation", "Transportation Agent", "Monitors external transit systems and parking.", ["park", "metro", "bus"]),
  createAgent("agent-weather", "weather", "Weather Agent", "Predicts weather impacts on outdoor zones.", ["rain", "storm", "sun"]),
  createAgent("agent-medical", "medical", "Medical Agent", "Tracks triage loads and medical incidents.", ["hurt", "sick", "doctor"]),
  createAgent("agent-security", "security", "Security Agent", "Evaluates threats and security deployment.", ["fight", "police", "threat"]),
  createAgent("agent-volunteer", "volunteer", "Volunteer Coordination Agent", "Optimizes staff allocation.", ["help", "staff", "allocate"]),
  createAgent("agent-sustain", "sustainability", "Sustainability Agent", "Monitors energy grid and carbon metrics.", ["power", "energy", "water"]),
  createAgent("agent-food", "food", "Food & Amenities Agent", "Optimizes queues for concessions.", ["eat", "drink", "queue"]),
  createAgent("agent-translate", "translation", "Translation Agent", "Handles multi-language dynamic adaptation.", ["language", "spanish", "french"]),
  createAgent("agent-ops", "operations", "Operations Agent", "General oversight and fallback reasoning.", ["general", "ops"]),
]

export function getAgentsByRole(roles: AgentRole[]): AIAgent[] {
  return agentRegistry.filter(a => roles.includes(a.role))
}
