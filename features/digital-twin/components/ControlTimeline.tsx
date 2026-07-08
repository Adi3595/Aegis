"use client"

import * as React from "react"
import { Play, Pause, RotateCcw, FastForward, Clock, ShieldAlert, ZapOff, CloudLightning } from "lucide-react"
import { engine } from "@/features/simulation/engine/SimulationEngine"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Button } from "@/components/ui/button"

export function ControlTimeline() {
  const status = useSimulationStore(state => state.status)
  const speed = useSimulationStore(state => state.speed)
  const events = useSimulationStore(state => state.events)
  
  return (
    <GlassPanel className="h-48 shrink-0 flex flex-col overflow-hidden p-0">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 bg-white/[0.02]">
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => status === 'running' ? engine.pause() : engine.start()}
            className={status === 'running' ? 'border-primary-accent text-primary-accent' : ''}
          >
            {status === 'running' ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {status === 'running' ? 'Pause' : 'Live'}
          </Button>
          
          <Button variant="ghost" size="sm" onClick={() => engine.reset()}>
            <RotateCcw className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-white/10 mx-2" />
          
          <Button variant="ghost" size="sm" onClick={() => engine.setSpeed(1)} className={speed === 1 ? 'bg-white/10' : ''}>1x</Button>
          <Button variant="ghost" size="sm" onClick={() => engine.setSpeed(5)} className={speed === 5 ? 'bg-white/10' : ''}>5x</Button>
          <Button variant="ghost" size="sm" onClick={() => engine.setSpeed(10)} className={speed === 10 ? 'bg-white/10' : ''}>
            <FastForward className="h-4 w-4 mr-1" /> 10x
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-text uppercase tracking-wider">Inject Scenario:</span>
          <Button variant="ghost" size="sm" className="text-warning hover:text-warning hover:bg-warning/10" onClick={() => engine.triggerScenario("gate-congestion")}>
            <ShieldAlert className="h-4 w-4 mr-1" /> Congestion
          </Button>
          <Button variant="ghost" size="sm" className="text-error hover:text-error hover:bg-error/10" onClick={() => engine.triggerScenario("power-failure")}>
            <ZapOff className="h-4 w-4 mr-1" /> Power Out
          </Button>
          <Button variant="ghost" size="sm" className="text-ai-accent hover:text-ai-accent hover:bg-ai-accent/10" onClick={() => engine.triggerScenario("heavy-rain")}>
            <CloudLightning className="h-4 w-4 mr-1" /> Storm
          </Button>
        </div>
        
      </div>

      {/* Timeline Events (Horizontal) */}
      <div className="flex-1 overflow-x-auto p-4 flex gap-4 items-center hide-scrollbar">
        {events.length === 0 ? (
          <div className="text-sm text-muted-text italic flex w-full items-center justify-center h-full">
            Waiting for simulation events...
          </div>
        ) : (
          events.map(event => (
            <div 
              key={event.id}
              className={`shrink-0 w-64 p-3 rounded-lg border ${
                event.severity === 'critical' || event.severity === 'emergency' 
                  ? 'border-error/30 bg-error/10' 
                  : event.severity === 'warning'
                    ? 'border-warning/30 bg-warning/10'
                    : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-xs text-muted-text">
                <Clock className="h-3 w-3" />
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">{event.title}</h4>
              <p className="text-xs text-white/70 line-clamp-2">{event.description}</p>
            </div>
          ))
        )}
      </div>
    </GlassPanel>
  )
}
