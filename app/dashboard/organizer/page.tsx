"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useOrganizerStore, WorkspaceView } from "@/features/organizer/store/organizerStore"
import { ExecutiveOverview } from "@/features/organizer/components/ExecutiveOverview"
import { LiveOperationsWorkspace } from "@/features/organizer/components/LiveOperationsWorkspace"
import { IncidentsWorkspace } from "@/features/organizer/components/IncidentsWorkspace"
import { ResourcesWorkspace } from "@/features/organizer/components/ResourcesWorkspace"
import { CommunicationsWorkspace } from "@/features/organizer/components/CommunicationsWorkspace"
import { SustainabilityWorkspace } from "@/features/organizer/components/SustainabilityWorkspace"
import { AIInsightsWorkspace } from "@/features/organizer/components/AIInsightsWorkspace"

const WORKSPACES: { id: WorkspaceView; label: string }[] = [
  { id: "operations", label: "Live Operations" },
  { id: "incidents", label: "Incidents" },
  { id: "resources", label: "Resources" },
  { id: "communications", label: "Communications" },
  { id: "sustainability", label: "Sustainability" },
  { id: "insights", label: "AI Insights" },
]

export default function OrganizerDashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuthStore()
  const { activeWorkspace, setActiveWorkspace } = useOrganizerStore()

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user?.role !== "Organizer" && user?.role !== "Administrator") {
        router.replace("/dashboard")
      }
    }
  }, [user, isAuthenticated, isLoading, router])

  if (!user || (user.role !== "Organizer" && user.role !== "Administrator")) {
    return null // Or a loader
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 h-full flex flex-col">
      {/* Persistent Executive Overview */}
      <ExecutiveOverview />

      {/* Workspace Segmented Navigation */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar border-b border-white/5 pb-4">
        {WORKSPACES.map((ws) => (
          <button
            key={ws.id}
            onClick={() => setActiveWorkspace(ws.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeWorkspace === ws.id 
                ? "bg-primary-accent text-primary-bg shadow-[0_0_15px_rgba(142,255,178,0.3)]" 
                : "bg-white/5 text-muted-text hover:bg-white/10 hover:text-white"
            }`}
          >
            {ws.label}
          </button>
        ))}
      </div>

      {/* Lazy Loaded Workspaces */}
      <div className="flex-1 relative min-h-[500px]">
        {/* We use CSS display:none to preserve state for all workspaces when switching, as requested */}
        <div className={activeWorkspace === "operations" ? "block h-full" : "hidden"}>
          <LiveOperationsWorkspace />
        </div>
        <div className={activeWorkspace === "incidents" ? "block h-full" : "hidden"}>
          <IncidentsWorkspace />
        </div>
        <div className={activeWorkspace === "resources" ? "block h-full" : "hidden"}>
          <ResourcesWorkspace />
        </div>
        <div className={activeWorkspace === "communications" ? "block h-full" : "hidden"}>
          <CommunicationsWorkspace />
        </div>
        <div className={activeWorkspace === "sustainability" ? "block h-full" : "hidden"}>
          <SustainabilityWorkspace />
        </div>
        <div className={activeWorkspace === "insights" ? "block h-full" : "hidden"}>
          <AIInsightsWorkspace />
        </div>
      </div>
    </div>
  )
}
