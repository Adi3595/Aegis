"use client"

import * as React from "react"
import { Users, ShieldAlert, HeartPulse, CloudRain, Utensils, Car, Train } from "lucide-react"
import { useDigitalTwinStore, MapLayer } from "../store/digitalTwinStore"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Switch } from "@/components/ui/switch"

const LAYERS: { id: MapLayer; name: string; icon: React.ReactNode; color: string }[] = [
  { id: "crowd", name: "Crowd Heatmap", icon: <Users className="h-4 w-4" />, color: "bg-primary-accent" },
  { id: "security", name: "Security Alerts", icon: <ShieldAlert className="h-4 w-4" />, color: "bg-warning" },
  { id: "medical", name: "Medical Incidents", icon: <HeartPulse className="h-4 w-4" />, color: "bg-error" },
  { id: "weather", name: "Weather Impacts", icon: <CloudRain className="h-4 w-4" />, color: "bg-ai-accent" },
  { id: "food", name: "Concessions", icon: <Utensils className="h-4 w-4" />, color: "bg-success" },
  { id: "transport", name: "Public Transport", icon: <Train className="h-4 w-4" />, color: "bg-secondary-accent" },
  { id: "parking", name: "Parking Status", icon: <Car className="h-4 w-4" />, color: "bg-white" },
]

export function LayerPanel() {
  const activeLayers = useDigitalTwinStore(state => state.activeLayers)
  const toggleLayer = useDigitalTwinStore(state => state.toggleLayer)

  return (
    <GlassPanel className="p-4 w-64 shrink-0 flex flex-col h-full overflow-y-auto">
      <h3 className="font-display font-semibold text-white mb-4">Overlays</h3>
      
      <div className="space-y-4">
        {LAYERS.map(layer => {
          const isActive = activeLayers.includes(layer.id)
          return (
            <div key={layer.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-md ${isActive ? 'bg-white/10 text-white' : 'bg-transparent text-muted-text'} transition-colors`}>
                  {layer.icon}
                </div>
                <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-muted-text'}`}>
                  {layer.name}
                </span>
              </div>
              <Switch 
                checked={isActive} 
                onCheckedChange={() => toggleLayer(layer.id)} 
                className={isActive ? layer.color : "bg-white/10"}
              />
            </div>
          )
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="text-xs text-muted-text mb-2 font-semibold uppercase tracking-wider">Heatmap Legend</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="h-2 w-2 rounded-full bg-error" />
          <span className="text-xs text-white/70">Critical (&gt;90%)</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="h-2 w-2 rounded-full bg-warning" />
          <span className="text-xs text-white/70">Congested (&gt;70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary-accent" />
          <span className="text-xs text-white/70">Nominal (&gt;40%)</span>
        </div>
      </div>
    </GlassPanel>
  )
}
