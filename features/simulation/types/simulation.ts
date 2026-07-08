export type SimulationStatus = "running" | "paused" | "stopped"

export type EventSeverity = "info" | "warning" | "critical" | "emergency"
export type EventCategory = "security" | "medical" | "weather" | "crowd" | "transport" | "infrastructure" | "system"

export interface SimulationEvent {
  id: string
  scenarioId?: string
  timestamp: string // ISO string of simulation time
  title: string
  description: string
  severity: EventSeverity
  category: EventCategory
  affectedZones: string[]
  status: "active" | "resolved"
}

export interface SimulationMetrics {
  attendance: number
  crowdDensity: number // 0-100%
  weather: {
    condition: "Sunny" | "Cloudy" | "Rain" | "Storm"
    temperature: number // Celsius
    windSpeed: number // km/h
  }
  parkingAvailability: number // 0-100%
  publicTransportStatus: "Nominal" | "Delayed" | "Disrupted"
  medicalIncidents: number
  securityAlerts: number
  volunteerAvailability: number // 0-100%
  foodQueueAvgStatus: "Low" | "Moderate" | "High" | "Critical"
  restroomQueueAvgStatus: "Low" | "Moderate" | "High" | "Critical"
  emergencyStatus: "None" | "Elevated" | "Critical"
  energyUsage: number // MW
  waterConsumption: number // kL
  carbonSavings: number // tons
}

export interface Zone {
  id: string
  name: string
  type: "Gate" | "Parking" | "Concourse" | "VIP" | "Medical" | "Transport" | "Food" | "Security" | "Restroom" | "Volunteer" | "Media" | "Fan" | "Emergency"
  occupancy: number
  capacity: number
  status: "Nominal" | "Congested" | "Critical" | "Closed"
  activeAlerts: number
}

export interface GlobalSimulationState {
  status: SimulationStatus
  speed: number // Multiplier (1x, 2x, etc)
  simulationTime: string // ISO string mapping to match timeline
  matchTime: number // minutes into the match (0-90+)
  
  metrics: SimulationMetrics
  zones: Record<string, Zone>
  events: SimulationEvent[]
  activeScenarios: string[]
}
