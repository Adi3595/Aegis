"use client"

import * as React from "react"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { AlertTriangle, AlertOctagon } from "lucide-react"

export function CriticalAlertBanner() {
  const { status, events } = useSimulationStore()
  const isEmergency = status === "Emergency" || status === "Evacuating"
  
  if (!isEmergency) return null

  const latestAlert = events.filter(e => e.status === "active")[0]

  return (
    <div className="bg-error text-white px-6 py-3 flex items-center justify-between rounded-xl shadow-[0_0_20px_rgba(255,87,87,0.4)] animate-pulse shrink-0 border border-error/50">
      <div className="flex items-center gap-4">
        <AlertOctagon className="w-6 h-6" />
        <div>
          <h2 className="font-bold text-lg leading-none uppercase tracking-widest">{status} DECLARED</h2>
          {latestAlert && (
            <p className="text-sm font-medium mt-1">Latest Intelligence: {latestAlert.message}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase bg-black/20 px-3 py-1.5 rounded-lg border border-white/20">
          ALL RESPONDERS STANDBY
        </span>
      </div>
    </div>
  )
}
