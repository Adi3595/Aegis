"use client"

import * as React from "react"
import { AlertCircle, Users, Activity, Battery, MapPin, X } from "lucide-react"
import { useDigitalTwinStore } from "../store/digitalTwinStore"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Button } from "@/components/ui/button"

export function ZoneInfoPanel() {
  const selectedZoneId = useDigitalTwinStore(state => state.selectedZoneId)
  const setSelectedZoneId = useDigitalTwinStore(state => state.setSelectedZoneId)
  const zone = useSimulationStore(state => selectedZoneId ? state.zones[selectedZoneId] : null)
  
  if (!selectedZoneId) {
    return (
      <GlassPanel className="p-6 w-80 shrink-0 flex flex-col h-full items-center justify-center text-center">
        <MapPin className="h-12 w-12 text-white/10 mb-4" />
        <p className="text-muted-text text-sm">Select a zone on the Digital Twin to view live telemetry and AI insights.</p>
      </GlassPanel>
    )
  }

  if (!zone) return null

  const ratio = zone.capacity > 0 ? (zone.occupancy / zone.capacity) * 100 : 0
  const isCritical = ratio > 90 || zone.status === "Critical" || zone.status === "Closed"

  return (
    <GlassPanel className="p-0 w-80 shrink-0 flex flex-col h-full overflow-hidden">
      <div className={`p-4 flex items-center justify-between border-b border-white/5 ${isCritical ? 'bg-error/10' : 'bg-primary-accent/5'}`}>
        <div>
          <h3 className="font-display font-semibold text-white truncate pr-2">{zone.name}</h3>
          <p className="text-xs text-muted-text uppercase tracking-wider">{zone.type} Zone</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setSelectedZoneId(null)} className="h-8 w-8 rounded-full shrink-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {/* Core Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-text flex items-center gap-2">
              <Users className="h-4 w-4" /> Occupancy
            </span>
            <span className="font-mono text-white">
              {zone.occupancy.toLocaleString()} / {zone.capacity.toLocaleString()}
            </span>
          </div>
          
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${ratio > 90 ? 'bg-error' : ratio > 70 ? 'bg-warning' : 'bg-primary-accent'}`}
              style={{ width: `${Math.min(ratio, 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-text flex items-center gap-2">
              <Activity className="h-4 w-4" /> Status
            </span>
            <span className={`text-xs font-bold uppercase px-2 py-1 rounded-md ${
              zone.status === 'Nominal' ? 'bg-success/20 text-success' :
              zone.status === 'Congested' ? 'bg-warning/20 text-warning' :
              'bg-error/20 text-error'
            }`}>
              {zone.status}
            </span>
          </div>
        </div>

        {/* Active Alerts */}
        {zone.activeAlerts > 0 && (
          <div className="p-3 rounded-lg border border-error/20 bg-error/10 space-y-2">
            <div className="flex items-center gap-2 text-error text-sm font-semibold">
              <AlertCircle className="h-4 w-4" />
              Active Incident
            </div>
            <p className="text-xs text-white/80">
              Multiple alerts detected in this zone. Security protocols initiated.
            </p>
          </div>
        )}

        {/* AI Insights Placeholder */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-text flex items-center gap-2">
            <Battery className="h-4 w-4 text-ai-accent" /> AI Insights
          </h4>
          <div className="p-3 rounded-lg border border-ai-accent/20 bg-ai-accent/5">
            <p className="text-xs text-ai-accent leading-relaxed">
              Based on current simulation trajectories, this zone will reach critical density in 14 minutes. Recommendation: Open overflow pathways.
            </p>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}
