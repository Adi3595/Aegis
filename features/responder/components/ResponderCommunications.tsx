"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { MessageSquareWarning, Megaphone, CheckCircle } from "lucide-react"

export function ResponderCommunications() {
  return (
    <GlassPanel className="p-0 flex flex-col h-[300px]">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <MessageSquareWarning className="w-5 h-5 text-white" />
        <h3 className="font-semibold text-white">Comms Center</h3>
      </div>
      <div className="flex-1 flex flex-col p-4 gap-4">
        <div className="flex-1 space-y-3 overflow-y-auto hide-scrollbar">
          <div className="p-3 panel-solid">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-blue-400">SEC-ALPHA</span>
              <span className="text-[10px] text-muted-text font-mono">14:02:10</span>
            </div>
            <p className="text-sm text-white">Proceeding to Gate North. ETA 2 mins.</p>
          </div>
          <div className="p-3 panel-solid">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-green-400">MED-BRAVO</span>
              <span className="text-[10px] text-muted-text font-mono">14:03:45</span>
            </div>
            <p className="text-sm text-white">On scene. Patient stable. Requesting transport cart.</p>
          </div>
        </div>
        
        <div className="shrink-0 flex gap-2">
          <button className="flex-1 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-xs font-medium hover:bg-white/10 flex justify-center items-center gap-2 transition-colors">
            <MessageSquareWarning className="w-3.5 h-3.5" /> Team Msg
          </button>
          <button className="flex-1 py-2 bg-error/10 border border-error/30 text-error rounded-lg text-xs font-medium hover:bg-error/20 flex justify-center items-center gap-2 transition-colors">
            <Megaphone className="w-3.5 h-3.5" /> Broadcast
          </button>
        </div>
      </div>
    </GlassPanel>
  )
}
