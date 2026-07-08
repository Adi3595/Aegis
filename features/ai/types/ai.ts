export type AgentRole = 
  | "navigation" 
  | "crowd" 
  | "emergency" 
  | "accessibility" 
  | "transportation" 
  | "weather" 
  | "medical" 
  | "security" 
  | "volunteer" 
  | "sustainability" 
  | "food" 
  | "translation" 
  | "operations"

export interface AIAgent {
  id: string
  role: AgentRole
  name: string
  description: string
  // Returns a confidence score (0-1) indicating how relevant this agent is for the given intent
  evaluateRelevance: (intent: string) => number 
}

export interface OrchestrationContext {
  userId: string
  userRole: string
  language: string
  simulationStatus: string
  simulationTime: string
  matchTime: number
  selectedZoneId: string | null
  activeAlerts: any[]
  weatherCondition: string
  recentEvents: any[]
}

export interface Recommendation {
  id: string
  title: string
  summary: string
  reasoning: string[]
  supportingFactors: string[]
  alternativeOptions: string[]
  confidenceScore: number // 0-100
  affectedZones: string[]
  priority: "Low" | "Medium" | "High" | "Critical"
  estimatedImpact: string
  contributingAgents: AgentRole[]
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
  isStreaming?: boolean
  recommendation?: Recommendation
  metadata?: {
    processingTimeMs?: number
    activeAgents?: string[]
  }
}

export interface AIProvider {
  generateResponse(prompt: string, context: OrchestrationContext): Promise<string>
  classifyIntent(query: string): Promise<string[]> // Returns keywords/intents
  summarize(text: string): Promise<string>
  reason(agentsOutput: string[], context: OrchestrationContext): Promise<Recommendation>
  translate(text: string, targetLanguage: string): Promise<string>
}
