"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Coffee, PlusSquare, Droplets } from "lucide-react"
import { Translate } from "@/features/i18n/hooks/useTranslation"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"

export function AmenitiesWidget() {
  const { zones } = useSimulationStore()

  // Helper to extract specific amenity zones
  const getZone = (id: string) => zones[id]
  
  const foodCourt = getZone("food-court-a") || getZone("food-court-b")
  const medical = getZone("medical-center")
  const restrooms = getZone("restrooms")

  const calculateStatus = (zone: any) => {
    if (!zone) return { text: "Unknown", color: "text-muted-text" }
    if (zone.status === "Closed") return { text: "Closed", color: "text-error" }
    
    const ratio = zone.capacity > 0 ? zone.occupancy / zone.capacity : 0
    if (ratio > 0.8) return { text: "Busy", color: "text-warning" }
    return { text: "Available", color: "text-success" }
  }

  return (
    <GlassPanel className="p-6">
      <h3 className="font-semibold text-white mb-4"><Translate>Nearby Amenities</Translate></h3>
      
      <div className="space-y-4">
        {[
          { name: "Food Court", zone: foodCourt, icon: Coffee },
          { name: "Medical Center", zone: medical, icon: PlusSquare },
          { name: "Restrooms", zone: restrooms, icon: Droplets }
        ].map((item, i) => {
          const status = calculateStatus(item.zone)
          return (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-white"><Translate>{item.name}</Translate></span>
              </div>
              <span className={`text-xs font-semibold ${status.color}`}>
                <Translate>{status.text}</Translate>
              </span>
            </div>
          )
        })}
      </div>
    </GlassPanel>
  )
}
