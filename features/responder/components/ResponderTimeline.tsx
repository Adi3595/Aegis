"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { ControlTimeline } from "@/features/digital-twin/components/ControlTimeline"
import { History, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResponderTimeline() {
  return (
    <GlassPanel className="p-0 flex flex-col h-[300px]">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-white" />
          <h3 className="font-semibold text-white">Event Timeline</h3>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs border-white/10 hover:bg-white/5">
          <Download className="w-3.5 h-3.5 mr-1" />
          Export
        </Button>
      </div>
      <div className="flex-1 p-4 flex flex-col justify-end">
        {/* We reuse the Digital Twin ControlTimeline for time-scrubbing */}
        <ControlTimeline />
      </div>
    </GlassPanel>
  )
}
