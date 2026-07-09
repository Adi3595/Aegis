import { AIProvider } from "../types/ai"
import { backendProvider, BackendAIProvider } from "../providers/BackendProvider"
import { ContextEngine } from "./ContextEngine"
import { useAIStore } from "../store/aiStore"

export class AIOrchestrator {
  private provider: BackendAIProvider

  constructor(provider: BackendAIProvider = backendProvider) {
    this.provider = provider
  }

  /**
   * Main entrypoint for user queries
   */
  async ask(query: string) {
    const store = useAIStore.getState()
    
    // Add User Message
    store.addMessage({
      id: `msg-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toISOString()
    })

    store.setIsGenerating(true)
    store.setActiveMilestone(null)
    store.setMetadata(null)

    try {
      const context = ContextEngine.buildContext()
      
      const wsUrl = (process.env.NEXT_PUBLIC_WS_URL || process.env.NEXT_PUBLIC_API_URL?.replace("http", "ws") || "ws://localhost:8000/api/v1") + "/ai/ws"
      const ws = new WebSocket(wsUrl)
      
      // Temporary message ID
      const botMsgId = `msg-${Date.now() + 1}`
      let currentContent = ""
      let recommendationObj: any = null

      store.addMessage({
        id: botMsgId,
        role: "assistant",
        content: "",
        timestamp: new Date().toISOString()
      })

      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: "stream_request",
          query,
          context
        }))
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        
        if (data.type === "milestone") {
          store.setActiveMilestone(data.milestone)
          if (data.metadata) {
            store.setMetadata(data.metadata)
            // Mock a recommendation object for UI rendering
            recommendationObj = {
              title: "AI Analysis Complete",
              summary: currentContent,
              reasoning: ["Synthesized context.", "Applied dynamic agents."],
              priority: "High",
              confidenceScore: Math.round((data.metadata.confidence || 0.9) * 100),
              contributingAgents: data.metadata.agents
            }
            store.setActiveAgents(data.metadata.agents)
          }
        } else if (data.type === "stream_chunk") {
          currentContent += data.chunk
          
          // Update the message in store
          useAIStore.setState((s) => ({
            messages: s.messages.map(m => 
              m.id === botMsgId ? { ...m, content: currentContent } : m
            )
          }))
        } else if (data.type === "stream_end") {
          // Finalize recommendation object
          if (recommendationObj) {
            recommendationObj.summary = currentContent
            useAIStore.setState((s) => ({
              messages: s.messages.map(m => 
                m.id === botMsgId ? { ...m, recommendation: recommendationObj, metadata: store.metadata } : m
              )
            }))
          }
          store.setIsGenerating(false)
          ws.close()
        }
      }

      ws.onerror = (e) => {
        console.error("AI WS Error:", e)
        store.setIsGenerating(false)
      }

    } catch (error) {
      console.error("AI Orchestration Error:", error)
      store.addMessage({
        id: `msg-err-${Date.now()}`,
        role: "system",
        content: "The AI Orchestration layer encountered an error processing your request.",
        timestamp: new Date().toISOString()
      })
      store.setIsGenerating(false)
    }
  }
}

export const orchestrator = new AIOrchestrator()
