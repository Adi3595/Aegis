import { create } from "zustand"

export interface ResponseTeam {
  id: string
  type: "Security" | "Medical" | "Fire" | "Maintenance"
  status: "Available" | "Dispatched" | "Busy"
  assignedZone: string | null
  currentIncidentId: string | null
  eta: number | null // minutes
}

interface ResponderState {
  activePlaybook: string | null
  teams: ResponseTeam[]
  
  setActivePlaybook: (id: string | null) => void
  updateTeamStatus: (teamId: string, status: ResponseTeam["status"], incidentId?: string, zone?: string) => void
}

const INITIAL_TEAMS: ResponseTeam[] = [
  { id: "sec-1", type: "Security", status: "Available", assignedZone: null, currentIncidentId: null, eta: null },
  { id: "sec-2", type: "Security", status: "Busy", assignedZone: "gate-north", currentIncidentId: "evt-123", eta: 2 },
  { id: "med-1", type: "Medical", status: "Available", assignedZone: "medical-center", currentIncidentId: null, eta: null },
  { id: "med-2", type: "Medical", status: "Dispatched", assignedZone: "food-court-a", currentIncidentId: "evt-456", eta: 4 },
  { id: "fire-1", type: "Fire", status: "Available", assignedZone: "pitch", currentIncidentId: null, eta: null },
]

export const useResponderStore = create<ResponderState>((set) => ({
  activePlaybook: null,
  teams: INITIAL_TEAMS,

  setActivePlaybook: (id) => set({ activePlaybook: id }),
  
  updateTeamStatus: (teamId, status, incidentId, zone) => set((state) => ({
    teams: state.teams.map(t => 
      t.id === teamId 
        ? { ...t, status, currentIncidentId: incidentId || t.currentIncidentId, assignedZone: zone || t.assignedZone }
        : t
    )
  })),
}))
