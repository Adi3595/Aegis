"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Sparkles, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react"
import { useLayoutStore } from "@/store/layoutStore"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { Button } from "@/components/ui/button"

export function ResponderCopilotWidget() {
  const { setRightPanel } = useLayoutStore()
  const { events } = useSimulationStore()
  
  const activeAlerts = events.filter(e => e.status === "active")
  const latestAlert = activeAlerts[activeAlerts.length - 1]

  const handleOpenCopilot = () => {
    // In a full implementation, this could also dispatch a system context message to the chat store
    // e.g., setChatContext({ incident: latestAlert })
    setRightPanel(true)
  }

  return (
    <GlassPanel className="p-6 border-ai-accent/30 bg-gradient-to-br from-ai-accent/10 to-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
        <Sparkles className="w-32 h-32 text-ai-accent" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-ai-accent" />
        <h3 className="font-semibold text-white">AI Incident Copilot</h3>
      </div>

      {latestAlert ? (
        <div className="space-y-4 relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-error flex items-center gap-1 mb-1">
              <AlertTriangle className="w-3 h-3" /> Priority Target Detected
            </span>
            <h4 className="text-lg font-semibold text-white">{latestAlert.message}</h4>
            <div className="flex gap-2 mt-2">
              <span className="bg-black/30 border border-white/10 text-xs px-2 py-1 rounded text-muted-text font-mono">
                Zone: {latestAlert.type} (Inferred)
              </span>
              <span className="bg-ai-accent/20 border border-ai-accent/30 text-xs px-2 py-1 rounded text-ai-accent font-medium">
                AI Confidence: 94%
              </span>
            </div>
          </div>

          <div className="bg-surface/50 border border-white/10 rounded-xl p-4 backdrop-blur-md">
            <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-success" /> Recommended Actions
            </h5>
            <ul className="text-sm text-muted-text space-y-2 list-disc list-inside">
              <li>Dispatch Security Team Alpha to location.</li>
              <li>Throttle inbound flow at adjacent gates.</li>
              <li>Prepare automated multilingual broadcast for standby.</li>
            </ul>
          </div>

          <Button 
            onClick={handleOpenCopilot}
            className="w-full bg-ai-accent text-primary-bg font-bold shadow-[0_0_15px_rgba(142,255,178,0.4)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            Open AI Workspace <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center relative z-10">
          <ShieldCheck className="w-12 h-12 text-success/50 mb-3" />
          <h4 className="text-white font-medium">All Clear</h4>
          <p className="text-sm text-muted-text mt-1 max-w-sm">
            No active priority incidents. AI Copilot is continuously monitoring the digital twin telemetry.
          </p>
          <Button 
            variant="outline"
            onClick={handleOpenCopilot}
            className="mt-6 border-ai-accent/30 text-ai-accent hover:bg-ai-accent/10"
          >
            Open AI Workspace
          </Button>
        </div>
      )}
    </GlassPanel>
  )
}
