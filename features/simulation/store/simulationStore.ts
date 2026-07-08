import { create } from "zustand"
import { useNotificationStore } from "@/features/notifications/store/notificationStore"
import { useAuthStore } from "@/features/auth/store/authStore"
import { GlobalSimulationState, SimulationEvent, SimulationMetrics, Zone } from "../types/simulation"

const INITIAL_METRICS: SimulationMetrics = {
  attendance: 45200,
  crowdDensity: 42,
  weather: { condition: "Sunny", temperature: 24, windSpeed: 12 },
  parkingAvailability: 78,
  publicTransportStatus: "Nominal",
  medicalIncidents: 0,
  securityAlerts: 0,
  volunteerAvailability: 95,
  foodQueueAvgStatus: "Low",
  restroomQueueAvgStatus: "Low",
  emergencyStatus: "None",
  energyUsage: 14.2,
  waterConsumption: 5.1,
  carbonSavings: 120,
}

const INITIAL_ZONES: Record<string, Zone> = {
  "gate-north": { id: "gate-north", name: "North Gate", type: "Gate", occupancy: 1200, capacity: 5000, status: "Nominal", activeAlerts: 0 },
  "gate-south": { id: "gate-south", name: "South Gate", type: "Gate", occupancy: 3400, capacity: 5000, status: "Congested", activeAlerts: 0 },
  "gate-east": { id: "gate-east", name: "East Gate", type: "Gate", occupancy: 800, capacity: 4000, status: "Nominal", activeAlerts: 0 },
  "gate-west": { id: "gate-west", name: "West Gate", type: "Gate", occupancy: 400, capacity: 4000, status: "Nominal", activeAlerts: 0 },
  "vip-entrance": { id: "vip-entrance", name: "VIP Entrance", type: "VIP", occupancy: 50, capacity: 200, status: "Nominal", activeAlerts: 0 },
  "parking-a": { id: "parking-a", name: "Parking A", type: "Parking", occupancy: 4500, capacity: 5000, status: "Congested", activeAlerts: 0 },
  "parking-b": { id: "parking-b", name: "Parking B", type: "Parking", occupancy: 2000, capacity: 5000, status: "Nominal", activeAlerts: 0 },
  "parking-c": { id: "parking-c", name: "Parking C", type: "Parking", occupancy: 500, capacity: 5000, status: "Nominal", activeAlerts: 0 },
  "food-court-a": { id: "food-court-a", name: "Food Court A", type: "Food", occupancy: 1200, capacity: 1500, status: "Congested", activeAlerts: 0 },
  "food-court-b": { id: "food-court-b", name: "Food Court B", type: "Food", occupancy: 300, capacity: 1500, status: "Nominal", activeAlerts: 0 },
  "medical-center": { id: "medical-center", name: "Medical Center", type: "Medical", occupancy: 12, capacity: 50, status: "Nominal", activeAlerts: 0 },
  "security-office": { id: "security-office", name: "Security Office", type: "Security", occupancy: 25, capacity: 100, status: "Nominal", activeAlerts: 0 },
  "restrooms": { id: "restrooms", name: "Central Restrooms", type: "Restroom", occupancy: 150, capacity: 200, status: "Congested", activeAlerts: 0 },
  "metro-station": { id: "metro-station", name: "Metro Station", type: "Transport", occupancy: 400, capacity: 10000, status: "Nominal", activeAlerts: 0 },
  "bus-terminal": { id: "bus-terminal", name: "Bus Terminal", type: "Transport", occupancy: 150, capacity: 2000, status: "Nominal", activeAlerts: 0 },
  "volunteer-hub": { id: "volunteer-hub", name: "Volunteer Hub", type: "Volunteer", occupancy: 80, capacity: 150, status: "Nominal", activeAlerts: 0 },
  "media-zone": { id: "media-zone", name: "Media Zone", type: "Media", occupancy: 60, capacity: 100, status: "Nominal", activeAlerts: 0 },
  "fan-zone": { id: "fan-zone", name: "Fan Zone", type: "Fan", occupancy: 8500, capacity: 10000, status: "Nominal", activeAlerts: 0 },
  "emergency-exit": { id: "emergency-exit", name: "Emergency Exit North", type: "Emergency", occupancy: 0, capacity: 1000, status: "Nominal", activeAlerts: 0 },
}

interface SimulationActions {
  // State sync from WebSockets
  _setFullState: (payload: any) => void
  _setPartialUpdate: (payload: any) => void
  resolveEventByScenario: (scenarioId: string) => void
  
  // Public Actions
  setStatus: (status: GlobalSimulationState["status"]) => void
  setSpeed: (speed: number) => void
  addEvent: (event: SimulationEvent) => void
  resolveEvent: (eventId: string) => void
  addScenario: (scenarioId: string) => void
  removeScenario: (scenarioId: string) => void
  reset: () => void
}

export type SimulationStore = GlobalSimulationState & SimulationActions

export const useSimulationStore = create<SimulationStore>((set) => ({
  status: "stopped",
  speed: 1,
  simulationTime: new Date().toISOString(),
  matchTime: 0,
  
  metrics: INITIAL_METRICS,
  zones: INITIAL_ZONES,
  events: [],
  activeScenarios: [],

  // State sync from WebSockets
  _setFullState: (payload) => set({
    status: payload.status,
    speed: payload.speed,
    simulationTime: payload.simulationTime,
    matchTime: payload.matchTime,
    metrics: payload.metrics,
    zones: payload.zones,
    events: payload.events,
    activeScenarios: payload.activeScenarios,
  }),
  
  _setPartialUpdate: (payload) => set((state) => ({
    simulationTime: payload.simulationTime,
    matchTime: payload.matchTime,
    metrics: payload.metrics,
    zones: payload.zones,
  })),

  resolveEventByScenario: (scenarioId) => set((state) => ({
    events: state.events.map((e) => 
      (e.scenarioId === scenarioId && e.status === "active") 
        ? { ...e, status: "resolved" } 
        : e
    )
  })),

  // Public Actions
  setStatus: (status) => set({ status }),
  setSpeed: (speed) => set({ speed }),
  
  addEvent: (event) => 
    set((state) => ({ events: [event, ...state.events] })),
    
  resolveEvent: (eventId) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === eventId ? { ...e, status: "resolved" } : e
      )
    })),

  addScenario: (scenarioId) => 
    set((state) => ({
      activeScenarios: state.activeScenarios.includes(scenarioId)
        ? state.activeScenarios
        : [...state.activeScenarios, scenarioId]
    })),
    
  removeScenario: (scenarioId) => 
    set((state) => ({
      activeScenarios: state.activeScenarios.filter((id) => id !== scenarioId)
    })),

  reset: () => set({
    status: "stopped",
    speed: 1,
    simulationTime: new Date().toISOString(),
    matchTime: 0,
    metrics: INITIAL_METRICS,
    zones: INITIAL_ZONES,
    events: [],
    activeScenarios: [],
  })
}))
