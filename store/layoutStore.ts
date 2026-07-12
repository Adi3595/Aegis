import { create } from "zustand"
import { persist } from "zustand/middleware"

interface LayoutState {
  sidebarOpen: boolean
  rightPanelOpen: boolean
  notificationCenterOpen: boolean
  commandPaletteOpen: boolean
  
  // Actions
  toggleSidebar: () => void
  setSidebar: (open: boolean) => void
  
  toggleRightPanel: () => void
  setRightPanel: (open: boolean) => void
  
  toggleNotificationCenter: () => void
  setNotificationCenter: (open: boolean) => void
  
  toggleCommandPalette: () => void
  setCommandPalette: (open: boolean) => void
  
  // Close all overlays (useful for route changes or pressing Escape)
  closeAllOverlays: () => void
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      rightPanelOpen: false,
      notificationCenterOpen: false,
      commandPaletteOpen: false,
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebar: (open) => set({ sidebarOpen: open }),
      
      toggleRightPanel: () => set((state) => ({ rightPanelOpen: !state.rightPanelOpen })),
      setRightPanel: (open) => set({ rightPanelOpen: open }),
      
      toggleNotificationCenter: () => set((state) => ({ notificationCenterOpen: !state.notificationCenterOpen })),
      setNotificationCenter: (open) => set({ notificationCenterOpen: open }),
      
      toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
      setCommandPalette: (open) => set({ commandPaletteOpen: open }),
      
      closeAllOverlays: () => set({ 
        notificationCenterOpen: false, 
        commandPaletteOpen: false 
      }),
    }),
    {
      name: "aegis-layout-preferences",
      partialize: (state) => ({ 
        sidebarOpen: state.sidebarOpen, 
        rightPanelOpen: state.rightPanelOpen 
      }), // Only persist these two
    }
  )
)
