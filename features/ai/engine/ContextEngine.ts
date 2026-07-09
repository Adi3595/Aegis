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
      userRole: authState.user?.role || "Fan",
      language: "en-US", // Default for now
      simulationStatus: simState.status,
      simulationTime: simState.simulationTime,
      matchTime: simState.matchTime,
      selectedZoneId: twinState.selectedZoneId,
      activeAlerts: simState.events.filter(e => e.status === "active"),
      weatherCondition: simState.metrics.weather.condition,
      recentEvents: simState.events.slice(0, 5),
      ...ContextEngine.getRoleSpecificContext(authState.user?.role || "Fan")
    }
  }

  private static getRoleSpecificContext(role: string): any {
    switch (role) {
      case "Fan":
        return {
          ticketInfo: { section: "104", row: "G", seat: "12", gate: "B" },
          currentLocation: "Concourse near Gate B"
        }
      case "Volunteer":
        return {
          assignedZone: "Zone C",
          currentTask: "Direct traffic at Gate B",
          shift: "14:00 - 20:00",
          nearbyIncidents: ["Minor slip and fall near Restroom 4"]
        }
      case "Organizer":
        return {
          stadiumState: "Operational",
          resources: { staffActive: 120, securityActive: 45, medicalActive: 15 },
          kpis: { attendance: "85%", sentiment: "Positive" }
        }
      case "Security":
        return {
          activeIncidents: 3,
          teamLocations: { alpha: "Gate A", bravo: "Zone C" },
          emergencyStatus: "Normal"
        }
      case "Executive":
        return {
          kpis: { revenue: "$1.2M", sustainabilityScore: 92 },
          forecasts: { projectedAttendance: "98%" }
        }
      default:
        return {}
    }
  }

}
