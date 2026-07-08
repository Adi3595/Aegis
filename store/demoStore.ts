import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DemoState {
  isDemoMode: boolean
  presentationMode: boolean
  activeScenario: string | null
  tourActive: boolean
  tourStep: number
  
  // Actions
  toggleDemoMode: (enabled: boolean) => void
  togglePresentationMode: (enabled: boolean) => void
  setActiveScenario: (scenario: string | null) => void
  setTourActive: (active: boolean) => void
  setTourStep: (step: number) => void
  resetDemo: () => void
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      isDemoMode: false,
      presentationMode: false,
      activeScenario: null,
      tourActive: false,
      tourStep: 0,
      
      toggleDemoMode: (enabled) => set({ isDemoMode: enabled }),
      togglePresentationMode: (enabled) => set({ presentationMode: enabled }),
      setActiveScenario: (scenario) => set({ activeScenario: scenario }),
      setTourActive: (active) => set({ tourActive: active }),
      setTourStep: (step) => set({ tourStep: step }),
      
      resetDemo: () => set({
        activeScenario: null,
        tourActive: false,
        tourStep: 0,
        presentationMode: false
      })
    }),
    {
      name: 'aegis-demo-storage'
    }
  )
)
