"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Users, AlertTriangle, ShieldCheck, Zap } from "lucide-react"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"

export function ExecutiveOverview() {
  const { zones, events, status, metrics } = useSimulationStore()
  
  // Calculate aggregate metrics
  const totalOccupancy = Object.values(zones).reduce((acc, z) => acc + z.occupancy, 0)
  const totalCapacity = Object.values(zones).reduce((acc, z) => acc + (z.capacity || 0), 0)
  const activeAlerts = events.filter(e => e.status === "active").length
  
  const densityRatio = totalCapacity > 0 ? totalOccupancy / totalCapacity : 0
  const isEmergency = metrics?.emergencyStatus === "Critical" || metrics?.emergencyStatus === "Elevated"

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <GlassPanel className="p-4 flex flex-col justify-between" interactive>
        <div className="flex items-start justify-between mb-2">
          <span className="text-sm font-medium text-muted-text">Stadium Status</span>
          <div className={`p-1.5 rounded-md ${isEmergency ? 'bg-error/20 text-error' : 'bg-success/20 text-success'}`}>
            {isEmergency ? <AlertTriangle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          </div>
        </div>
        <div>
          <div className={`font-display text-2xl font-bold ${isEmergency ? 'text-error' : 'text-success'}`}>
            {status}
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-4 flex flex-col justify-between" interactive>
        <div className="flex items-start justify-between mb-2">
          <span className="text-sm font-medium text-muted-text">Attendance</span>
          <div className="p-1.5 rounded-md bg-white/5 text-white">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="font-display text-2xl font-bold text-white">
            {totalOccupancy.toLocaleString()}
          </div>
          <div className="text-xs text-muted-text">
            of {totalCapacity.toLocaleString()} cap
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-4 flex flex-col justify-between" interactive>
        <div className="flex items-start justify-between mb-2">
          <span className="text-sm font-medium text-muted-text">Crowd Density</span>
          <div className="p-1.5 rounded-md bg-warning/20 text-warning">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="font-display text-2xl font-bold text-white">
            {(densityRatio * 100).toFixed(1)}%
          </div>
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full ${densityRatio > 0.8 ? 'bg-error' : densityRatio > 0.5 ? 'bg-warning' : 'bg-success'}`}
              style={{ width: `${Math.min(densityRatio * 100, 100)}%` }}
            />
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-4 flex flex-col justify-between" interactive>
        <div className="flex items-start justify-between mb-2">
          <span className="text-sm font-medium text-muted-text">Active Incidents</span>
          <div className={`p-1.5 rounded-md ${activeAlerts > 0 ? 'bg-error/20 text-error' : 'bg-white/5 text-white'}`}>
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="font-display text-2xl font-bold text-white">
            {activeAlerts}
          </div>
          <div className="text-xs text-muted-text">
            {activeAlerts > 0 ? "Requires attention" : "All clear"}
          </div>
        </div>
      </GlassPanel>
    </div>
  )
}
