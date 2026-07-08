"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { StadiumMap } from "@/features/digital-twin/components/StadiumMap"
import { useVolunteerStore } from "@/features/volunteer/store/volunteerStore"
import { useDigitalTwinStore } from "@/features/digital-twin/store/digitalTwinStore"

export function VolunteerMap() {
  const { tasks } = useVolunteerStore()
  const setSelectedZoneId = useDigitalTwinStore(state => state.setSelectedZoneId)

  const activeTask = tasks.find(t => t.status === "In Progress")

  React.useEffect(() => {
    if (activeTask) {
      setSelectedZoneId(activeTask.zoneId)
    } else {
      setSelectedZoneId(null)
    }
  }, [activeTask, setSelectedZoneId])

  return (
    <div className="h-full flex flex-col gap-4">
      <GlassPanel className="p-0 overflow-hidden relative flex-1">
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <h3 className="font-semibold text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
            Field Map
          </h3>
        </div>
        <div className="w-full h-full p-2 bg-black">
          <StadiumMap />
        </div>
      </GlassPanel>
      
      {activeTask && (
        <GlassPanel className="p-4 shrink-0 bg-primary-accent/5 border-primary-accent/20">
          <h4 className="text-sm font-semibold text-white mb-1">Smart Routing</h4>
          <p className="text-xs text-muted-text">
            Navigating to <strong>{activeTask.zoneId}</strong> for: {activeTask.title}. Route is clear.
          </p>
        </GlassPanel>
      )}
    </div>
  )
}
