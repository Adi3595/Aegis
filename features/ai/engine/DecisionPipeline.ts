import { AIProvider, OrchestrationContext, Recommendation, AgentRole } from "../types/ai"
import { agentRegistry } from "./AgentRegistry"

export class DecisionPipeline {
  
  constructor(private provider: AIProvider) {}

  /**
   * Executes the full AI decision pipeline:
   * 1. Classifies intent
   * 2. Selects relevant agents
   * 3. Executes agents in parallel
   * 4. Aggregates and reasons over results
   * 5. Produces final recommendation
   */
  async execute(query: string, context: OrchestrationContext, onAgentActive?: (roles: AgentRole[]) => void): Promise<Recommendation> {
    
    // 1. Intent Classification
    const intents = await this.provider.classifyIntent(query)
    
    // 2. Select Relevant Agents
    const selectedAgents = agentRegistry.filter(agent => 
      intents.some(intent => agent.evaluateRelevance(intent) > 0.5)
    )
    
    // Fallback to Ops agent if none selected
    if (selectedAgents.length === 0) {
      const ops = agentRegistry.find(a => a.role === "operations")
      if (ops) selectedAgents.push(ops)
    }

    const activeRoles = selectedAgents.map(a => a.role)
    if (onAgentActive) onAgentActive(activeRoles)

    // 3. Parallel Execution
    // Each agent uses the provider to generate its specific slice of intelligence
    const agentPromises = selectedAgents.map(agent => 
      this.provider.generateResponse(
        `[Role: ${agent.name}] Analyze this request: "${query}" given the context.`, 
        context
      )
    )
    
    const agentOutputs = await Promise.all(agentPromises)

    // 4 & 5. Reason and Aggregate into final Recommendation
    const recommendation = await this.provider.reason(agentOutputs, context)
    
    // Attach contributing agents
    recommendation.contributingAgents = activeRoles
    
    return recommendation
  }
}
