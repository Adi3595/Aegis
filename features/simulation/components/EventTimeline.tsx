"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, Info, ShieldAlert, HeartPulse, CheckCircle2 } from "lucide-react"
import { useSimulationStore } from "../store/simulationStore"
import { GlassPanel } from "@/components/ui/glass-panel"
import { engine } from "../engine/SimulationEngine"

export function EventTimeline() {
  const events = useSimulationStore(state => state.events)

  const getIcon = (category: string, severity: string) => {
    if (category === "medical") return <HeartPulse className="h-4 w-4 text-error" />
    if (category === "security") return <ShieldAlert className="h-4 w-4 text-warning" />
    if (severity === "info") return <Info className="h-4 w-4 text-primary-accent" />
    return <AlertCircle className="h-4 w-4 text-ai-accent" />
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "info": return "border-primary-accent/20 bg-primary-accent/5"
      case "warning": return "border-warning/20 bg-warning/5"
      case "critical": return "border-error/40 bg-error/10"
      case "emergency": return "border-error bg-error/20 animate-pulse"
      default: return "border-white/10 bg-white/5"
    }
  }

  return (
    <GlassPanel className="flex h-[400px] flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 p-4">
        <h3 className="font-display font-semibold text-white">Event Timeline</h3>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-muted-text">
          {events.length} Events
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide relative">
        {events.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-muted-text opacity-50">
            <Info className="mb-2 h-8 w-8" />
            <p className="text-sm">No events logged yet.</p>
            <p className="text-xs">Start the simulation to generate data.</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                layout
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={`relative overflow-hidden rounded-xl border p-3 ${getSeverityColor(event.severity)} ${event.status === "resolved" ? "opacity-50 grayscale" : ""}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {getIcon(event.category, event.severity)}
                    <span className="font-semibold text-white text-sm">{event.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-text">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-white/70 ml-6 mb-2">
                  {event.description}
                </p>
                
                {event.status === "active" && (
                  <div className="ml-6 flex items-center gap-2">
                    <button 
                      onClick={() => useSimulationStore.getState().resolveEvent(event.id)}
                      className="text-[10px] flex items-center gap-1 font-medium text-success hover:text-white transition-colors"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Mark Resolved
                    </button>
                    {event.scenarioId && (
                      <button 
                        onClick={() => engine.resolveScenario(event.scenarioId!)}
                        className="text-[10px] font-medium text-muted-text hover:text-white transition-colors"
                      >
                        End Scenario
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </GlassPanel>
  )
}
