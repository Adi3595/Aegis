import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TaskStatus = "Pending" | "In Progress" | "Completed"

export interface VolunteerTask {
  id: string
  title: string
  description: string
  zoneId: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status: TaskStatus
  estimatedDuration: number // minutes
}

export interface IncidentReport {
  id: string
  category: string
  description: string
  zoneId: string
  priority: string
  timestamp: string
  synced: boolean
}

interface VolunteerState {
  tasks: VolunteerTask[]
  incidentQueue: IncidentReport[]
  shiftStartTime: string | null
  
  // Actions
  startShift: () => void
  endShift: () => void
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  addIncidentReport: (report: Omit<IncidentReport, "id" | "timestamp" | "synced">) => void
  syncIncidents: () => void
}

const MOCK_INITIAL_TASKS: VolunteerTask[] = [
  {
    id: "task-1",
    title: "Assist Medical Team",
    description: "Guide attendees to Medical Center A",
    zoneId: "gate-north",
    priority: "High",
    status: "Pending",
    estimatedDuration: 15
  },
  {
    id: "task-2",
    title: "Crowd Control",
    description: "Manage queue flow at Food Court B",
    zoneId: "food-court-b",
    priority: "Medium",
    status: "Pending",
    estimatedDuration: 30
  }
]

export const useVolunteerStore = create<VolunteerState>()(
  persist(
    (set, get) => ({
      tasks: MOCK_INITIAL_TASKS,
      incidentQueue: [],
      shiftStartTime: null,

      startShift: () => set({ shiftStartTime: new Date().toISOString() }),
      
      endShift: () => set({ shiftStartTime: null }),
      
      updateTaskStatus: (taskId, status) => set((state) => ({
        tasks: state.tasks.map(t => t.id === taskId ? { ...t, status } : t)
      })),

      addIncidentReport: (report) => set((state) => {
        const newReport: IncidentReport = {
          ...report,
          id: `rep-${Date.now()}`,
          timestamp: new Date().toISOString(),
          synced: navigator.onLine
        }
        return { incidentQueue: [newReport, ...state.incidentQueue] }
      }),

      syncIncidents: () => set((state) => ({
        incidentQueue: state.incidentQueue.map(r => ({ ...r, synced: true }))
      }))
    }),
    {
      name: "aegis-volunteer-storage"
    }
  )
)
