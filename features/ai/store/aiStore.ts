import { create } from "zustand"
import { ChatMessage, AgentRole } from "../types/ai"

interface AIState {
  messages: ChatMessage[]
  isGenerating: boolean
  activeAgents: AgentRole[] // Used for the Orchestration Monitor UI
  activeMilestone: string | null
  metadata: any | null
  
  addMessage: (msg: ChatMessage) => void
  clearMessages: () => void
  setIsGenerating: (isGenerating: boolean) => void
  setActiveAgents: (roles: AgentRole[]) => void
  setActiveMilestone: (milestone: string | null) => void
  setMetadata: (metadata: any | null) => void
}

export const useAIStore = create<AIState>((set) => ({
  messages: [
    {
      id: "welcome-1",
      role: "system",
      content: "AEGIS Orchestration Layer initialized. Ready to assist with operations.",
      timestamp: new Date().toISOString()
    }
  ],
  isGenerating: false,
  activeAgents: [],
  activeMilestone: null,
  metadata: null,

  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  
  clearMessages: () => set({ messages: [] }),
  
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  setActiveAgents: (activeAgents) => set({ activeAgents }),
  
  setActiveMilestone: (activeMilestone) => set({ activeMilestone }),
  
  setMetadata: (metadata) => set({ metadata })
}))
