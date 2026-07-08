import { PREDEFINED_SCENARIOS } from "../types/scenarios"
import { useAuthStore } from "@/features/auth/store/authStore"

/**
 * REST API Client for the Simulation Engine.
 * Replaces the old client-side local simulation loop.
 * Actions here dispatch POST requests to the backend.
 */
class SimulationEngine {
  private getHeaders() {
    const token = useAuthStore.getState().accessToken
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  private get apiUrl() {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
  }

  public async start() {
    try {
      await fetch(`${this.apiUrl}/simulation/start`, {
        method: "POST",
        headers: this.getHeaders()
      })
    } catch (e) {
      console.error("Failed to start simulation", e)
    }
  }

  public async pause() {
    try {
      await fetch(`${this.apiUrl}/simulation/pause`, {
        method: "POST",
        headers: this.getHeaders()
      })
    } catch (e) {
      console.error("Failed to pause simulation", e)
    }
  }

  public async reset() {
    try {
      await fetch(`${this.apiUrl}/simulation/reset`, {
        method: "POST",
        headers: this.getHeaders()
      })
    } catch (e) {
      console.error("Failed to reset simulation", e)
    }
  }

  public async setSpeed(multiplier: number) {
    try {
      await fetch(`${this.apiUrl}/simulation/speed`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ speed: multiplier })
      })
    } catch (e) {
      console.error("Failed to set speed", e)
    }
  }

  public async triggerScenario(scenarioId: string) {
    const scenario = PREDEFINED_SCENARIOS[scenarioId]
    if (!scenario) return

    try {
      await fetch(`${this.apiUrl}/simulation/scenarios/${scenarioId}/trigger`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          title: scenario.title,
          description: scenario.description,
          severity: scenario.severity,
          category: scenario.category,
          affectedZones: scenario.affectedZones
        })
      })
    } catch (e) {
      console.error("Failed to trigger scenario", e)
    }
  }

  public async resolveScenario(scenarioId: string) {
    try {
      await fetch(`${this.apiUrl}/simulation/scenarios/${scenarioId}/resolve`, {
        method: "POST",
        headers: this.getHeaders()
      })
    } catch (e) {
      console.error("Failed to resolve scenario", e)
    }
  }
}

// Export singleton instance
export const engine = new SimulationEngine()
