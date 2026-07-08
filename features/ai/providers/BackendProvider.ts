import { AIProvider, OrchestrationContext, Recommendation } from "../types/ai"
import { useAuthStore } from "@/features/auth/store/authStore"

export class BackendAIProvider implements AIProvider {
  private getHeaders() {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : "mock"
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  private get apiUrl() {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
  }

  async generateResponse(prompt: string, context: OrchestrationContext): Promise<string> {
    throw new Error("Direct generateResponse is deprecated. Use the full orchestration via /chat.")
  }

  async classifyIntent(query: string): Promise<string[]> {
    throw new Error("Direct classifyIntent is deprecated. Handled by LangGraph on backend.")
  }

  async summarize(text: string): Promise<string> {
    const res = await fetch(`${this.apiUrl}/ai/summarize`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ text })
    })
    const data = await res.json()
    return data.summary
  }

  async reason(agentsOutput: string[], context: OrchestrationContext): Promise<Recommendation> {
    throw new Error("Direct reason is deprecated. Handled by LangGraph on backend.")
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    const res = await fetch(`${this.apiUrl}/ai/translate`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ text, target_language: targetLanguage })
    })
    const data = await res.json()
    return data.translated
  }

  // New method to trigger the full backend LangGraph pipeline
  async chatOrchestration(query: string, context: OrchestrationContext): Promise<Recommendation> {
    const res = await fetch(`${this.apiUrl}/ai/chat`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ query, context })
    })
    if (!res.ok) {
        throw new Error("Backend AI orchestration failed")
    }
    const data = await res.json()
    return data
  }
}

export const backendProvider = new BackendAIProvider()
