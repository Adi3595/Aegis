import { EventCategory, EventSeverity } from "./simulation"

export interface ScenarioDefinition {
  id: string
  title: string
  description: string
  severity: EventSeverity
  category: EventCategory
  defaultDurationMinutes: number
  affectedZones: string[] // 'all' or specific zone IDs
  recommendedActions: string[]
}

export const PREDEFINED_SCENARIOS: Record<string, ScenarioDefinition> = {
  "heavy-rain": {
    id: "heavy-rain",
    title: "Sudden Downpour",
    description: "Unexpected heavy rainfall detected. Open-air concourses are getting slippery.",
    severity: "warning",
    category: "weather",
    defaultDurationMinutes: 45,
    affectedZones: ["concourse-north", "concourse-south", "gate-east"],
    recommendedActions: [
      "Deploy slip-hazard signage",
      "Reroute foot traffic to covered areas",
      "Alert medical for potential slip/fall increases"
    ]
  },
  "medical-emergency": {
    id: "medical-emergency",
    title: "Cardiac Event",
    description: "Spectator reported unconscious in Sector 4.",
    severity: "emergency",
    category: "medical",
    defaultDurationMinutes: 30,
    affectedZones: ["sector-4"],
    recommendedActions: [
      "Dispatch nearest medical team",
      "Clear pathway to Medical Center Alpha",
      "Prepare AED equipment"
    ]
  },
  "gate-congestion": {
    id: "gate-congestion",
    title: "Critical Gate Congestion",
    description: "Crowd density at South Gate has exceeded 95% capacity.",
    severity: "critical",
    category: "crowd",
    defaultDurationMinutes: 20,
    affectedZones: ["gate-south"],
    recommendedActions: [
      "Open auxiliary gates S-1 and S-2",
      "Dispatch crowd control volunteers",
      "Update digital signage to redirect traffic"
    ]
  },
  "metro-delay": {
    id: "metro-delay",
    title: "Metro System Disruption",
    description: "City transit reports 20-minute delays on Red Line.",
    severity: "warning",
    category: "transport",
    defaultDurationMinutes: 60,
    affectedZones: ["transport-hub"],
    recommendedActions: [
      "Notify exiting fans via mobile app",
      "Coordinate with local taxi/rideshare for surge capacity",
      "Hold gates open longer post-match"
    ]
  },
  "power-failure": {
    id: "power-failure",
    title: "Partial Power Failure",
    description: "Grid fluctuation caused power loss in West Wing concessions.",
    severity: "critical",
    category: "infrastructure",
    defaultDurationMinutes: 15,
    affectedZones: ["vip-west", "food-court-west"],
    recommendedActions: [
      "Initialize backup generators",
      "Dispatch engineering team",
      "Pause point-of-sale systems gracefully"
    ]
  }
}
