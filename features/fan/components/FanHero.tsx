"use client"

import * as React from "react"
import { useAuthStore } from "@/features/auth/store/authStore"
import { GlassPanel } from "@/components/ui/glass-panel"
import { MapPin, Ticket, Clock, CloudRain } from "lucide-react"
import { Translate } from "@/features/i18n/hooks/useTranslation"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"

export function FanHero() {
  const { user } = useAuthStore()
  const matchTime = useSimulationStore(state => state.matchTime)
  
  // Format match time for countdown or current time
  const timeDisplay = matchTime <= 0 
    ? `Kickoff in ${Math.abs(matchTime)} min`
    : `Match Live: ${matchTime} min`

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start lg:items-stretch">
      <div className="flex-1 space-y-2">
        <h1 className="font-display text-4xl font-bold tracking-tight text-white">
          <Translate>Welcome back</Translate>, {user?.name || "Fan"}!
        </h1>
        <p className="text-muted-text">
          <Translate>Your personalized match-day companion is active.</Translate>
        </p>
      </div>

      <div className="flex gap-4 flex-wrap lg:flex-nowrap w-full lg:w-auto">
        <GlassPanel className="flex items-center gap-4 px-4 py-3 min-w-[200px]" interactive>
          <div className="p-2 rounded-full bg-primary-accent/20 text-primary-accent">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-text"><Translate>Your Ticket</Translate></div>
            <div className="font-semibold text-white">Block 104, Row G, Seat 22</div>
          </div>
        </GlassPanel>

        <GlassPanel className="flex items-center gap-4 px-4 py-3 min-w-[180px]" interactive>
          <div className="p-2 rounded-full bg-ai-accent/20 text-ai-accent">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-text"><Translate>Match Status</Translate></div>
            <div className="font-semibold text-white">{timeDisplay}</div>
          </div>
        </GlassPanel>

        <GlassPanel className="flex items-center gap-4 px-4 py-3 min-w-[150px]" interactive>
          <div className="p-2 rounded-full bg-white/10 text-white">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-muted-text"><Translate>Weather</Translate></div>
            <div className="font-semibold text-white">72°F, Clear</div>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
