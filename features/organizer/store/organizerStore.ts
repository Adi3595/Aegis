import { create } from "zustand"

export type WorkspaceView = 
  | "operations" 
  | "incidents" 
  | "resources" 
  | "communications" 
  | "sustainability" 
  | "insights"

interface OrganizerState {
  activeWorkspace: WorkspaceView
  setActiveWorkspace: (workspace: WorkspaceView) => void
}

export const useOrganizerStore = create<OrganizerState>((set) => ({
  activeWorkspace: "operations",
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
}))
