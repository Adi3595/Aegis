"use client"

import * as React from "react"
import { FanHero } from "@/features/fan/components/FanHero"
import { CopilotWidget } from "@/features/fan/components/CopilotWidget"
import { SmartNavigationWidget } from "@/features/fan/components/SmartNavigationWidget"
import { AmenitiesWidget } from "@/features/fan/components/AmenitiesWidget"
import { LiveAlertsFeed } from "@/features/fan/components/LiveAlertsFeed"
import { FanMapWidget } from "@/features/fan/components/FanMapWidget"

export default function FanDashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      <FanHero />

      {/* Main Grid: Copilot + Top Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Copilot takes up 2 cols on Desktop */}
        <CopilotWidget />
        
        <div className="col-span-1 flex flex-col">
          <SmartNavigationWidget />
        </div>

        <div className="col-span-1 flex flex-col">
          <LiveAlertsFeed />
        </div>
      </div>

      {/* Secondary Grid: Digital Twin Map + Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <FanMapWidget />
        <div className="col-span-1 flex flex-col">
          <AmenitiesWidget />
        </div>
      </div>
    </div>
  )
}
