import { AIProvider, OrchestrationContext, Recommendation } from "../types/ai"

// Helper to simulate network/processing latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class MockProvider implements AIProvider {
  async generateResponse(prompt: string, context: OrchestrationContext): Promise<string> {
    await delay(800 + Math.random() * 1000) // Simulate 0.8s - 1.8s latency
    return `Simulated response for: "${prompt.substring(0, 50)}..." based on context.`
  }

  async classifyIntent(query: string): Promise<string[]> {
    await delay(300 + Math.random() * 200) // Fast intent classification
    const q = query.toLowerCase()
    const intents: string[] = []
    
    if (q.includes("gate") || q.includes("route") || q.includes("fastest") || q.includes("path")) intents.push("navigation")
    if (q.includes("crowd") || q.includes("busy") || q.includes("congestion")) intents.push("crowd")
    if (q.includes("emergency") || q.includes("fire") || q.includes("exit")) intents.push("emergency")
    if (q.includes("wheelchair") || q.includes("access")) intents.push("accessibility")
    if (q.includes("park") || q.includes("metro") || q.includes("bus") || q.includes("train")) intents.push("transportation")
    if (q.includes("weather") || q.includes("rain") || q.includes("storm")) intents.push("weather")
    if (q.includes("medical") || q.includes("hurt") || q.includes("sick") || q.includes("doctor")) intents.push("medical")
    if (q.includes("security") || q.includes("fight") || q.includes("police")) intents.push("security")
    if (q.includes("volunteer") || q.includes("help") || q.includes("staff")) intents.push("volunteer")
    if (q.includes("power") || q.includes("energy") || q.includes("water") || q.includes("sustainability")) intents.push("sustainability")
    if (q.includes("food") || q.includes("eat") || q.includes("drink") || q.includes("hungry") || q.includes("queue")) intents.push("food")
    if (q.includes("translate") || q.includes("language") || q.includes("spanish") || q.includes("french")) intents.push("translation")
    
    // Fallback to operations if nothing specific
    if (intents.length === 0) intents.push("operations")
    
    return intents
  }

  async summarize(text: string): Promise<string> {
    await delay(500)
    return "Summarized text output."
  }

  async reason(agentsOutput: string[], context: OrchestrationContext): Promise<Recommendation> {
    await delay(1500 + Math.random() * 1500) // Deep reasoning simulation (1.5s - 3s)
    
    // Extract hints from context or agents output to build a somewhat relevant mock recommendation
    const isEmergency = agentsOutput.some(o => o.includes("emergency"))
    
    return {
      id: `rec-${Date.now()}`,
      title: isEmergency ? "Emergency Route Optimization" : "Operational Optimization Plan",
      summary: "Based on multi-agent synthesis, we have identified an optimal path forward considering current telemetry.",
      reasoning: [
        "Synthesized inputs from active agents.",
        "Cross-referenced with real-time Simulation Engine telemetry.",
        "Validated against strict safety protocols."
      ],
      supportingFactors: [
        "Current crowd density allows for efficient rerouting.",
        `Match time: ${context.matchTime}m dictates specific behavioral patterns.`,
        "Weather conditions are currently factored in."
      ],
      alternativeOptions: [
        "Maintain current operational posture and monitor.",
        "Deploy additional volunteer staff to congested nodes."
      ],
      confidenceScore: Math.floor(80 + Math.random() * 18), // 80-97%
      affectedZones: context.selectedZoneId ? [context.selectedZoneId, "adjacent-concourses"] : ["gate-north", "fan-zone"],
      priority: isEmergency ? "Critical" : "High",
      estimatedImpact: "Expected to reduce wait times by 14% and normalize crowd distribution within 8 minutes.",
      contributingAgents: [] // Will be populated by the Orchestrator
    }
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    await delay(400)
    return `[Translated to ${targetLanguage}]: ${text}`
  }
}

export const mockProvider = new MockProvider()
