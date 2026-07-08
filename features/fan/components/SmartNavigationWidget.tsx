"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Map, Navigation, ArrowRight } from "lucide-react"
import { Translate } from "@/features/i18n/hooks/useTranslation"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { useFanStore } from "@/features/fan/store/fanStore"

export function SmartNavigationWidget() {
  const { zones } = useSimulationStore()
  const { preferences } = useFanStore()

  // Find the least congested gate
  const gateZones = Object.values(zones).filter(z => z.type === "Gate")
  let bestGate = gateZones[0]
  
  if (gateZones.length > 0) {
    bestGate = gateZones.reduce((prev, current) => {
      // Exclude closed gates
      if (current.status === "Closed") return prev
      if (prev.status === "Closed") return current

      // If wheelchair access is needed, maybe some gates are better. 
      // For MVP, we just use congestion ratio.
      const prevRatio = prev.capacity > 0 ? prev.occupancy / prev.capacity : 1
      const currentRatio = current.capacity > 0 ? current.occupancy / current.capacity : 1
      return currentRatio < prevRatio ? current : prev
    })
  }

  const waitTime = bestGate ? Math.ceil((bestGate.occupancy / (bestGate.capacity || 1)) * 15) : 0

  return (
    <GlassPanel className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Map className="w-5 h-5 text-success" />
        <h3 className="font-semibold text-white"><Translate>Smart Navigation</Translate></h3>
      </div>

      {bestGate ? (
        <div className="space-y-4">
          <div className="bg-success/10 border border-success/20 rounded-xl p-4">
            <div className="text-xs font-semibold text-success uppercase tracking-wider mb-1">
              <Translate>Recommended Entry</Translate>
            </div>
            <div className="font-display text-xl font-bold text-white mb-2">
              <Translate>{bestGate.name}</Translate>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-text"><Translate>Est. Wait Time</Translate></span>
              <span className="font-mono text-white">{waitTime} <Translate>mins</Translate></span>
            </div>
          </div>
          
          {preferences.wheelchairAccess && (
            <div className="bg-ai-accent/10 border border-ai-accent/20 rounded-lg p-3 text-xs text-ai-accent flex items-start gap-2">
              <Navigation className="w-4 h-4 shrink-0 mt-0.5" />
              <span><Translate>Accessible route verified. Use elevators located at the East Concourse.</Translate></span>
            </div>
          )}

          <button className="w-full mt-auto flex items-center justify-center gap-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 py-2 rounded-lg transition-colors">
            <Translate>View Route on Map</Translate>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="text-muted-text text-sm"><Translate>Calculating optimal route...</Translate></div>
      )}
    </GlassPanel>
  )
}
