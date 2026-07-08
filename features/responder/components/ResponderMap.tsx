"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { StadiumMap } from "@/features/digital-twin/components/StadiumMap"
import { LayerPanel } from "@/features/digital-twin/components/LayerPanel"

export function ResponderMap() {
  return (
    <GlassPanel className="p-0 h-full w-full overflow-hidden relative flex flex-col bg-black">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="font-display text-lg font-bold text-white bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          Live Digital Twin
        </h3>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <LayerPanel />
      </div>
      <div className="flex-1 w-full h-full p-4 flex items-center justify-center">
        <StadiumMap />
      </div>
    </GlassPanel>
  )
}
