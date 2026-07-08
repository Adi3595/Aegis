"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { HeartPulse, Users, ShieldCheck, Activity, LineChart, Umbrella } from "lucide-react"

export function ExecutiveKPIHeader() {
  const { zones, events, status } = useSimulationStore()
  
  const totalOccupancy = Object.values(zones).reduce((acc, z) => acc + z.occupancy, 0)
  const totalCapacity = Object.values(zones).reduce((acc, z) => acc + (z.capacity || 0), 0)
  const activeAlerts = events.filter(e => e.status === "active").length

  // Derived mock metrics based on tick & occupancy
  const fanSatisfaction = Math.max(50, Math.min(98, 95 - (activeAlerts * 2) - ((totalOccupancy/totalCapacity) * 5)))
  const healthScore = Math.max(0, 100 - (activeAlerts * 5))
  const avgResponseTime = 2.4 + (activeAlerts * 0.3)

  return (
    <div className="tour-step-kpis grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <GlassPanel className="p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-muted-text uppercase">Health Score</span>
          <HeartPulse className={`w-4 h-4 ${healthScore < 70 ? 'text-error' : 'text-success'}`} />
        </div>
        <div className={`font-display text-3xl font-bold ${healthScore < 70 ? 'text-error' : 'text-success'}`}>
          {healthScore.toFixed(0)}%
        </div>
      </GlassPanel>

      <GlassPanel className="p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-muted-text uppercase">Fan Sat. Index</span>
          <LineChart className="w-4 h-4 text-primary-accent" />
        </div>
        <div className="font-display text-3xl font-bold text-white">
          {fanSatisfaction.toFixed(1)}
        </div>
      </GlassPanel>

      <GlassPanel className="p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-muted-text uppercase">Attendance</span>
          <Users className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <div className="font-display text-3xl font-bold text-white">
            {(totalOccupancy / 1000).toFixed(1)}k
          </div>
          <div className="text-[10px] text-muted-text">of {(totalCapacity / 1000).toFixed(1)}k cap</div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-muted-text uppercase">Response Time</span>
          <Activity className="w-4 h-4 text-warning" />
        </div>
        <div>
          <div className="font-display text-3xl font-bold text-white">
            {avgResponseTime.toFixed(1)}m
          </div>
          <div className="text-[10px] text-success">Target: &lt; 3.0m</div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-muted-text uppercase">Active Incidents</span>
          <ShieldCheck className={`w-4 h-4 ${activeAlerts > 0 ? 'text-error' : 'text-white/50'}`} />
        </div>
        <div className="font-display text-3xl font-bold text-white">
          {activeAlerts}
        </div>
      </GlassPanel>
      
      <GlassPanel className="p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-muted-text uppercase">Weather Impact</span>
          <Umbrella className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="font-display text-3xl font-bold text-white">
            Low
          </div>
          <div className="text-[10px] text-muted-text">Clear skies, 72°F</div>
        </div>
      </GlassPanel>
    </div>
  )
}
