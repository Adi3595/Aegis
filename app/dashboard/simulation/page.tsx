"use client"

import * as React from "react"
import { Users, ThermometerSun, Zap, ZapOff, Activity, AlertTriangle, Shield, Droplets, Map } from "lucide-react"
import { SimulationControlPanel } from "@/features/simulation/components/SimulationControlPanel"
import { LiveStatusWidget } from "@/features/simulation/components/LiveStatusWidget"
import { EventTimeline } from "@/features/simulation/components/EventTimeline"
import { VisualizationPlaceholder } from "@/features/simulation/components/VisualizationPlaceholder"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { engine } from "@/features/simulation/engine/SimulationEngine"
import { Button } from "@/components/ui/button"

export default function SimulationDashboardPage() {
  // Use atomic selectors to only re-render when specific metrics change
  const attendance = useSimulationStore(state => state.metrics.attendance)
  const crowdDensity = useSimulationStore(state => state.metrics.crowdDensity)
  const temp = useSimulationStore(state => state.metrics.weather.temperature)
  const energy = useSimulationStore(state => state.metrics.energyUsage)
  
  // Cleanup on unmount (pause if we leave the page, optional, but good for demo)
  React.useEffect(() => {
    return () => {
      engine.pause()
    }
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-2">
            Simulation Engine Core
          </h1>
          <p className="text-muted-text max-w-2xl">
            This module generates deterministic mock data, driving the state of the entire platform. 
            Future modules will map these metrics to Digital Twins, 3D overlays, and AI agent triggers.
          </p>
        </div>
      </div>

      {/* Control Panel */}
      <SimulationControlPanel />

      {/* Live Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LiveStatusWidget 
          title="Live Attendance" 
          value={attendance.toLocaleString()} 
          trend="Increasing steadily" 
          trendUp={true} 
          icon={Users} 
          color="primary" 
        />
        <LiveStatusWidget 
          title="Avg Crowd Density" 
          value={`${crowdDensity}%`} 
          trend={crowdDensity > 80 ? "Critical levels" : "Nominal limits"} 
          trendUp={crowdDensity <= 80} 
          icon={Activity} 
          color={crowdDensity > 80 ? "error" : "success"} 
        />
        <LiveStatusWidget 
          title="Real-time Power Load" 
          value={`${energy} MW`} 
          trend="Grid stable" 
          trendUp={true} 
          icon={Zap} 
          color="warning" 
        />
        <LiveStatusWidget 
          title="Ambient Temp" 
          value={`${temp}°C`} 
          icon={ThermometerSun} 
          color="secondary" 
        />
      </div>

      {/* Scenarios & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scenario Injection Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-xl border border-white/5 bg-surface/50 backdrop-blur-sm p-4">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-ai-accent" />
              Scenario Injection
            </h3>
            <p className="text-sm text-muted-text mb-4">
              Trigger pre-defined scenarios to observe how the simulation engine dispatches events and impacts metrics.
            </p>
            <div className="space-y-2 flex flex-col">
              <Button variant="outline" className="justify-start" onClick={() => engine.triggerScenario("heavy-rain")}>
                <Droplets className="h-4 w-4 mr-2 text-primary-accent" /> Inject: Heavy Rain
              </Button>
              <Button variant="outline" className="justify-start border-error/50 hover:bg-error/10 text-white" onClick={() => engine.triggerScenario("power-failure")}>
                <ZapOff className="h-4 w-4 mr-2 text-error" /> Inject: Power Failure
              </Button>
              <Button variant="outline" className="justify-start border-warning/50 hover:bg-warning/10 text-white" onClick={() => engine.triggerScenario("gate-congestion")}>
                <AlertTriangle className="h-4 w-4 mr-2 text-warning" /> Inject: Gate Congestion
              </Button>
            </div>
          </div>

          <EventTimeline />
        </div>

        {/* Visualizations Placeholder */}
        <div className="lg:col-span-2 space-y-4">
          <VisualizationPlaceholder 
            title="Digital Twin Map (Placeholder)"
            description="The 3D Stadium Digital Twin will render here in Module 3.2, natively binding to the SimulationEngine's live state."
            icon={Map}
            minHeight="min-h-[400px]"
            color="ai"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <VisualizationPlaceholder 
              title="Density Heatmap"
              description="Real-time density graphs for gates and concourses."
              icon={Activity}
              minHeight="min-h-[200px]"
            />
            <VisualizationPlaceholder 
              title="Power Telemetry"
              description="Historical energy usage charting."
              icon={Zap}
              minHeight="min-h-[200px]"
              color="warning"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
