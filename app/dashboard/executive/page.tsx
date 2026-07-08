"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useExecutiveStore, ExecutiveWorkspaceView } from "@/features/executive/store/executiveStore"
import { ExecutiveKPIHeader } from "@/features/executive/components/ExecutiveKPIHeader"
import { ExecutiveCopilot } from "@/features/executive/components/ExecutiveCopilot"
import dynamic from 'next/dynamic'

const PredictiveAnalytics = dynamic(() => import('@/features/executive/components/PredictiveAnalytics').then(mod => mod.PredictiveAnalytics), {
  ssr: false,
  loading: () => <div className="animate-pulse h-96 bg-white/5 rounded-xl border border-white/10" />
})

const SustainabilityDashboard = dynamic(() => import('@/features/executive/components/SustainabilityDashboard').then(mod => mod.SustainabilityDashboard), {
  ssr: false,
  loading: () => <div className="animate-pulse h-96 bg-white/5 rounded-xl border border-white/10" />
})
import { PostMatchSummary } from "@/features/executive/components/PostMatchSummary"
import { ReportingCenter } from "@/features/executive/components/ReportingCenter"

const WORKSPACES: { id: ExecutiveWorkspaceView; label: string }[] = [
  { id: "overview", label: "Strategic Overview" },
  { id: "analytics", label: "Analytics & Forecasting" },
  { id: "sustainability", label: "Sustainability" },
  { id: "postmatch", label: "Post-Match & Reporting" },
]

export default function ExecutiveDashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuthStore()
  const { activeWorkspace, setActiveWorkspace } = useExecutiveStore()

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user?.role !== "Executive" && user?.role !== "Organizer" && user?.role !== "Administrator") {
        router.replace("/dashboard")
      }
    }
  }, [user, isAuthenticated, isLoading, router])

  if (!user || (user.role !== "Executive" && user.role !== "Organizer" && user.role !== "Administrator")) {
    return null
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 h-full flex flex-col">
      {/* Persistent Executive KPI Header */}
      <ExecutiveKPIHeader />

      {/* Workspace Segmented Navigation */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar border-b border-white/5 pb-4">
        {WORKSPACES.map((ws) => (
          <button
            key={ws.id}
            onClick={() => setActiveWorkspace(ws.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeWorkspace === ws.id 
                ? "bg-primary-accent text-primary-bg shadow-[0_0_15px_rgba(142,255,178,0.3)]" 
                : "bg-white/5 text-muted-text hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {ws.label}
          </button>
        ))}
      </div>

      {/* Lazy Loaded Workspaces */}
      <div className="flex-1 relative min-h-[500px]">
        {/* Strategic Overview */}
        <div className={activeWorkspace === "overview" ? "block h-full" : "hidden"}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            <div className="lg:col-span-8 h-full min-h-[400px]">
              <ExecutiveCopilot />
            </div>
            <div className="lg:col-span-4 h-full">
              {/* Optional embedded timeline or ops summary could go here */}
            </div>
          </div>
        </div>

        {/* Analytics & Forecasting */}
        <div className={activeWorkspace === "analytics" ? "block h-full" : "hidden"}>
          <PredictiveAnalytics />
        </div>

        {/* Sustainability */}
        <div className={activeWorkspace === "sustainability" ? "block h-full" : "hidden"}>
          <SustainabilityDashboard />
        </div>

        {/* Post-Match & Reporting */}
        <div className={activeWorkspace === "postmatch" ? "block h-full" : "hidden"}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <PostMatchSummary />
            <ReportingCenter />
          </div>
        </div>
      </div>
    </div>
  )
}
