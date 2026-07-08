import { create } from "zustand"

export type ExecutiveWorkspaceView = 
  | "overview" 
  | "analytics" 
  | "sustainability" 
  | "postmatch"

export type SimulationScenario = 
  | "Normal Match Day"
  | "Heavy Rain"
  | "Gate Closure"
  | "Transport Disruption"
  | "Security Incident"
  | "High Attendance Final"
  | "Family Day"

interface ExecutiveState {
  activeWorkspace: ExecutiveWorkspaceView
  activeScenario: SimulationScenario
  
  setActiveWorkspace: (workspace: ExecutiveWorkspaceView) => void
  setActiveScenario: (scenario: SimulationScenario) => void
}

export const useExecutiveStore = create<ExecutiveState>((set) => ({
  activeWorkspace: "overview",
  activeScenario: "Normal Match Day",
  
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
  setActiveScenario: (scenario) => set({ activeScenario: scenario }),
}))
