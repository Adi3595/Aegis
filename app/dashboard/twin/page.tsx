"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { StadiumMap } from "@/features/digital-twin/components/StadiumMap"
import { LayerPanel } from "@/features/digital-twin/components/LayerPanel"
import { ZoneInfoPanel } from "@/features/digital-twin/components/ZoneInfoPanel"
import { ControlTimeline } from "@/features/digital-twin/components/ControlTimeline"
import { AIChatPanel } from "@/features/ai/components/AIChatPanel"
import { OrchestrationMonitor } from "@/features/ai/components/OrchestrationMonitor"
import { useDigitalTwinStore } from "@/features/digital-twin/store/digitalTwinStore"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { engine } from "@/features/simulation/engine/SimulationEngine"

export default function DigitalTwinPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const zones = useSimulationStore(state => state.zones)
  const setSelectedZoneId = useDigitalTwinStore(state => state.setSelectedZoneId)

  // Pause simulation on unmount
  React.useEffect(() => {
    return () => {
      engine.pause()
    }
  }, [])

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery) return
    const query = searchQuery.toLowerCase()
    
    // Find matching zone
    const match = Object.values(zones).find(z => 
      z.name.toLowerCase().includes(query) || 
      z.type.toLowerCase().includes(query)
    )
    
    if (match) {
      setSelectedZoneId(match.id)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <OrchestrationMonitor />

      {/* Top Toolbar */}
      <div className="shrink-0 mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white mb-1">
            Digital Twin
          </h1>
          <p className="text-muted-text text-sm">
            Live interactive operational view bounded to Simulation Engine.
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-text" />
          <input 
            type="text" 
            placeholder="Search zones, facilities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-9 pr-4 py-2 bg-surface/50 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:border-primary-accent/50 transition-colors"
          />
        </form>
      </div>

      {/* Main Workspace Workspace */}
      <div className="flex-1 flex gap-4 min-h-0 mb-4">
        <LayerPanel />
        <div className="flex-1 rounded-2xl overflow-hidden relative">
          <StadiumMap />
        </div>
        <ZoneInfoPanel />
        <AIChatPanel />
      </div>

      {/* Bottom Timeline */}
      <ControlTimeline />
      
    </div>
  )
}
