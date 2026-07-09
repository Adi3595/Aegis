"use client"

import * as React from "react"
import { Navigation2, Map, Crosshair } from "lucide-react"

export function SmartRoutingMap() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/40 p-6 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-0">
        <div className="absolute inset-0 bg-[url('/globe.svg')] bg-center bg-no-repeat opacity-10 blur-sm scale-150" />
      </div>

      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
            <Map className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Smart Routing</h3>
            <p className="text-sm text-muted-text">Next Objective Path</p>
          </div>
        </div>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <Crosshair className="h-4 w-4 text-white" />
        </button>
      </div>

      <div className="relative z-10 flex-1 rounded-xl border border-white/10 bg-black/40 overflow-hidden flex flex-col items-center justify-center">
        {/* Placeholder for actual map */}
        <Navigation2 className="h-12 w-12 text-blue-400 mb-4 animate-bounce" />
        <div className="text-center">
          <div className="text-lg font-bold text-white">Proceed to Gate B</div>
          <div className="text-sm text-muted-text">145m • 2 mins walk</div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-muted-text font-bold tracking-wider">Current Objective</span>
            <span className="text-sm text-white font-medium">Assist crowd flow at entrance</span>
          </div>
          <button className="px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-md hover:bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            Start Nav
          </button>
        </div>
      </div>
    </div>
  )
}
