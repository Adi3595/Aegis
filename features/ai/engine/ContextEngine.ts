import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { useDigitalTwinStore } from "@/features/digital-twin/store/digitalTwinStore"
import { useAuthStore } from "@/features/auth/store/authStore"
import { OrchestrationContext } from "../types/ai"

export class ContextEngine {
  
  /**
   * Builds the current context object by reading directly from Zustand stores.
   * This ensures the AI always has the latest telemetry before executing a prompt.
   */
  static buildContext(): OrchestrationContext {
    const simState = useSimulationStore.getState()
    const twinState = useDigitalTwinStore.getState()
    const authState = useAuthStore.getState()
    
    return {
      userId: authState.user?.id || "unknown",
      userRole: authState.user?.role || "Operator",
      language: "en-US", // Default for now
      simulationStatus: simState.status,
      simulationTime: simState.simulationTime,
      matchTime: simState.matchTime,
      selectedZoneId: twinState.selectedZoneId,
      activeAlerts: simState.events.filter(e => e.status === "active"),
      weatherCondition: simState.metrics.weather.condition,
      recentEvents: simState.events.slice(0, 5)
    }
  }

}
