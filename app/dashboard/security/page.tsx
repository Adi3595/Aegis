"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/store/authStore"
import { CriticalAlertBanner } from "@/features/responder/components/CriticalAlertBanner"
import { IncidentQueue } from "@/features/responder/components/IncidentQueue"
import { ResponderCopilotWidget } from "@/features/responder/components/ResponderCopilotWidget"
import { ResponderMap } from "@/features/responder/components/ResponderMap"
import { EmergencyPlaybooks } from "@/features/responder/components/EmergencyPlaybooks"
import { ResponseTeamManager } from "@/features/responder/components/ResponseTeamManager"
import { PredictiveRiskAnalysis } from "@/features/responder/components/PredictiveRiskAnalysis"
import { ResponderTimeline } from "@/features/responder/components/ResponderTimeline"
import { ResponderCommunications } from "@/features/responder/components/ResponderCommunications"

export default function ResponderDashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuthStore()

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user?.role !== "Security" && user?.role !== "Medical" && user?.role !== "Administrator") {
        router.replace("/dashboard")
      }
    }
  }, [user, isAuthenticated, isLoading, router])

  if (!user || (user.role !== "Security" && user.role !== "Medical" && user.role !== "Administrator")) {
    return null
  }

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-80px)] overflow-hidden pb-12 lg:pb-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Permanent Critical Alert Banner */}
      <CriticalAlertBanner />

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-6">
          
          {/* Left Column: Triage & Teams (3 cols) */}
          <div className="xl:col-span-3 flex flex-col gap-6">
            <IncidentQueue />
            <ResponseTeamManager />
          </div>

          {/* Center Column: Mission Control / Digital Twin / Copilot (6 cols) */}
          <div className="xl:col-span-6 flex flex-col gap-6">
            <ResponderCopilotWidget />
            
            <div className="h-[400px]">
              <ResponderMap />
            </div>

            <EmergencyPlaybooks />
          </div>

          {/* Right Column: Insights & Comms (3 cols) */}
          <div className="xl:col-span-3 flex flex-col gap-6">
            <PredictiveRiskAnalysis />
            <ResponderCommunications />
            <ResponderTimeline />
          </div>

        </div>
      </div>
    </div>
  )
}
