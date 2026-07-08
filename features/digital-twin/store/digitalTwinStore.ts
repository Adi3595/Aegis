import { create } from "zustand"

export type MapLayer = "crowd" | "security" | "medical" | "weather" | "food" | "transport" | "parking"

interface DigitalTwinState {
  selectedZoneId: string | null
  activeLayers: MapLayer[]
  setSelectedZoneId: (id: string | null) => void
  toggleLayer: (layer: MapLayer) => void
  setLayer: (layer: MapLayer, active: boolean) => void
}

export const useDigitalTwinStore = create<DigitalTwinState>((set) => ({
  selectedZoneId: null,
  activeLayers: ["crowd"], // Default layer
  
  setSelectedZoneId: (id) => set({ selectedZoneId: id }),
  
  toggleLayer: (layer) => set((state) => ({
    activeLayers: state.activeLayers.includes(layer)
      ? state.activeLayers.filter(l => l !== layer)
      : [...state.activeLayers, layer]
  })),
  
  setLayer: (layer, active) => set((state) => {
    const hasLayer = state.activeLayers.includes(layer)
    if (active && !hasLayer) return { activeLayers: [...state.activeLayers, layer] }
    if (!active && hasLayer) return { activeLayers: state.activeLayers.filter(l => l !== layer) }
    return state
  })
}))
