"use client"

import * as React from "react"
import { Play, Pause, Square, FastForward, Activity } from "lucide-react"
import { useSimulationStore } from "../store/simulationStore"
import { engine } from "../engine/SimulationEngine"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Button } from "@/components/ui/button"

export function SimulationControlPanel() {
  // Only subscribe to the exact state properties we need for this panel
  const status = useSimulationStore(state => state.status)
  const speed = useSimulationStore(state => state.speed)
  const simulationTime = useSimulationStore(state => state.simulationTime)
  const matchTime = useSimulationStore(state => state.matchTime)

  const isRunning = status === "running"

  const handleTogglePlay = () => {
    if (isRunning) {
      engine.pause()
    } else {
      engine.start()
    }
  }

  const handleReset = () => {
    engine.reset()
  }

  const handleSpeedChange = (newSpeed: number) => {
    engine.setSpeed(newSpeed)
  }

  // Format the ISO time nicely
  const timeDate = new Date(simulationTime)
  const timeString = timeDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })

  return (
    <GlassPanel className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Left: Clock */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-primary-accent">
          <Activity className={`h-5 w-5 ${isRunning ? 'animate-pulse' : 'opacity-50'}`} />
          <span className="font-mono text-sm font-bold uppercase tracking-widest">{status}</span>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="flex flex-col">
          <span className="font-mono text-2xl font-bold text-white leading-none">{timeString}</span>
          <span className="text-xs font-medium text-muted-text">Match Time: {Math.floor(matchTime)}&apos;</span>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="flex items-center gap-2 bg-black/20 p-1.5 rounded-xl border border-white/5">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleTogglePlay}
          className={isRunning ? "text-warning hover:text-warning" : "text-success hover:text-success"}
        >
          {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="text-error hover:text-error"
        >
          <Square className="h-4 w-4" />
        </Button>
      </div>

      {/* Right: Speed */}
      <div className="flex items-center gap-1 bg-black/20 p-1.5 rounded-xl border border-white/5">
        <FastForward className="h-4 w-4 text-muted-text mx-2" />
        {[1, 2, 5, 10].map(s => (
          <button
            key={s}
            onClick={() => handleSpeedChange(s)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors ${
              speed === s 
                ? 'bg-primary-accent text-white shadow-sm' 
                : 'text-muted-text hover:bg-white/10 hover:text-white'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
      
    </GlassPanel>
  )
}
