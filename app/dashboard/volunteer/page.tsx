"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useVolunteerStore } from "@/features/volunteer/store/volunteerStore"
import { OfflineIndicator } from "@/features/fan/components/OfflineIndicator" // Reusing offline badge
import { VolunteerTasks } from "@/features/volunteer/components/VolunteerTasks"
import { VolunteerMap } from "@/features/volunteer/components/VolunteerMap"
import { IncidentReporter } from "@/features/volunteer/components/IncidentReporter"
import { VolunteerCopilot } from "@/features/volunteer/components/VolunteerCopilot"
import { CheckCircle, Map, AlertTriangle, MessageSquare } from "lucide-react"

export default function VolunteerDashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuthStore()
  const { shiftStartTime, startShift, syncIncidents } = useVolunteerStore()
  const [activeTab, setActiveTab] = React.useState<"tasks" | "map" | "report">("tasks")

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user?.role !== "Volunteer") {
        router.replace("/dashboard")
      }
    }
  }, [user, isAuthenticated, isLoading, router])

  // Sync incidents when coming back online
  React.useEffect(() => {
    const handleOnline = () => syncIncidents()
    window.addEventListener("online", handleOnline)
    return () => window.removeEventListener("online", handleOnline)
  }, [syncIncidents])

  if (!user || user.role !== "Volunteer") return null

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden relative pb-16 lg:pb-0">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight">
            Hello, {user.name}
          </h1>
          <p className="text-sm text-muted-text">
            {shiftStartTime ? "Shift Active" : "Off Duty"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <OfflineIndicator />
          {!shiftStartTime ? (
            <button onClick={startShift} className="bg-primary-accent text-primary-bg px-4 py-2 rounded-lg text-sm font-bold shadow-md">
              Start Shift
            </button>
          ) : (
            <div className="bg-success/20 text-success border border-success/30 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              On Duty
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-6 relative z-10">
        <div className={activeTab === "tasks" ? "block h-full" : "hidden"}>
          <VolunteerTasks />
        </div>
        <div className={activeTab === "map" ? "block h-full" : "hidden"}>
          <VolunteerMap />
        </div>
        <div className={activeTab === "report" ? "block h-full" : "hidden"}>
          <IncidentReporter />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-lg border-t border-white/10 flex lg:hidden z-40 px-6 justify-between items-center pb-safe">
        <button 
          onClick={() => setActiveTab("tasks")}
          className={`flex flex-col items-center gap-1 ${activeTab === 'tasks' ? 'text-primary-accent' : 'text-muted-text hover:text-white'}`}
        >
          <CheckCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Tasks</span>
        </button>
        <button 
          onClick={() => setActiveTab("map")}
          className={`flex flex-col items-center gap-1 ${activeTab === 'map' ? 'text-primary-accent' : 'text-muted-text hover:text-white'}`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Map</span>
        </button>
        <button 
          onClick={() => setActiveTab("report")}
          className={`flex flex-col items-center gap-1 ${activeTab === 'report' ? 'text-primary-accent' : 'text-muted-text hover:text-white'}`}
        >
          <AlertTriangle className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Report</span>
        </button>
      </div>

      {/* Draggable Bottom Sheet AI Copilot */}
      <VolunteerCopilot />
    </div>
  )
}
