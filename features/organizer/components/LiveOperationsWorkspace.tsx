"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { StadiumMap } from "@/features/digital-twin/components/StadiumMap"
import { LayerPanel } from "@/features/digital-twin/components/LayerPanel"
import { ZoneInfoPanel } from "@/features/digital-twin/components/ZoneInfoPanel"
import { ControlTimeline } from "@/features/digital-twin/components/ControlTimeline"
import { useDigitalTwinStore } from "@/features/digital-twin/store/digitalTwinStore"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { Activity, Bell } from "lucide-react"

export function LiveOperationsWorkspace() {
  const selectedZoneId = useDigitalTwinStore(state => state.selectedZoneId)
  const { events } = useSimulationStore()
  const recentEvents = events.slice(-4).reverse() // Show 4 most recent

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-280px)] min-h-[600px]">
      {/* Main Map View */}
      <div className="xl:col-span-3 flex flex-col h-full gap-4">
        <GlassPanel className="flex-1 p-0 overflow-hidden relative border border-white/10 flex items-center justify-center bg-[#050508]">
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <h3 className="font-display text-lg font-bold text-white bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              Live Digital Twin
            </h3>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <LayerPanel />
          </div>
          <div className="w-full h-full p-4 flex items-center justify-center">
            <StadiumMap />
          </div>
        </GlassPanel>

        {/* Timeline embedded at bottom of map area */}
        <div className="shrink-0 h-24">
          <ControlTimeline />
        </div>
      </div>

      {/* Side Context Panel */}
      <div className="xl:col-span-1 flex flex-col gap-4 overflow-y-auto hide-scrollbar h-full">
        {selectedZoneId ? (
          <ZoneInfoPanel />
        ) : (
          <GlassPanel className="p-5 flex-1 border-dashed border-white/20 bg-white/[0.02]">
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-text space-y-4">
              <Activity className="w-8 h-8 opacity-20" />
              <div>
                <h4 className="font-semibold text-white mb-1">No Sector Selected</h4>
                <p className="text-sm">Click any zone on the Digital Twin to view detailed telemetry, crowd density, and active incidents.</p>
              </div>
            </div>
          </GlassPanel>
        )}

        <GlassPanel className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Event Stream</h4>
            <Bell className="w-4 h-4 text-muted-text" />
          </div>
          <div className="space-y-3">
            {recentEvents.length === 0 ? (
              <p className="text-sm text-muted-text text-center py-4">No recent events.</p>
            ) : (
              recentEvents.map(evt => (
                <div key={evt.id} className="text-xs pb-3 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold ${evt.status === 'active' ? 'text-warning' : 'text-success'}`}>
                      {evt.type}
                    </span>
                    <span className="text-muted-text/50 font-mono">
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', second: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-muted-text">{evt.message}</p>
                </div>
              ))
            )}
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
