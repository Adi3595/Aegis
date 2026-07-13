"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { useAuthStore } from "@/features/auth/store/authStore"
import { AlertCircle, Clock, CheckCircle2, ShieldAlert } from "lucide-react"

export function IncidentQueue() {
  const { events } = useSimulationStore()
  const { user } = useAuthStore()
  
  // Default filter based on role, but can be overridden
  const [filter, setFilter] = React.useState<"All" | "Security" | "Medical">(() => 
    user?.role === "Security" ? "Security" : user?.role === "Medical" ? "Medical" : "All"
  )
  const [statusFilter, setStatusFilter] = React.useState<"active" | "resolved">("active")

  const filteredEvents = events.filter(e => {
    if (statusFilter !== e.status) return false
    if (filter === "Security" && !e.title.toLowerCase().includes("security") && !e.title.toLowerCase().includes("crowd")) return false
    if (filter === "Medical" && !e.title.toLowerCase().includes("medical") && !e.title.toLowerCase().includes("safety")) return false
    return true
  }).reverse()

  return (
    <GlassPanel className="p-0 flex flex-col h-[500px]">
      <div className="p-4 border-b border-white/5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-white" />
          <h3 className="font-semibold text-white">Live Incident Queue</h3>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <div className="flex gap-2">
            {["All", "Security", "Medical"].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f as "All" | "Security" | "Medical")}
                className={`px-2 py-1 rounded border ${filter === f ? 'bg-primary-accent/20 border-primary-accent text-primary-accent font-medium' : 'bg-white/5 border-white/10 text-muted-text'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setStatusFilter("active")}
              className={`${statusFilter === "active" ? 'text-error font-medium' : 'text-muted-text'}`}
            >
              Active
            </button>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => setStatusFilter("resolved")}
              className={`${statusFilter === "resolved" ? 'text-success font-medium' : 'text-muted-text'}`}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 hide-scrollbar">
        {filteredEvents.length === 0 ? (
          <div className="text-center text-muted-text mt-8 text-sm">
            No {statusFilter} incidents found.
          </div>
        ) : (
          filteredEvents.map(evt => (
            <div key={evt.id} className={`p-3 rounded-xl border ${evt.status === 'active' ? 'bg-error/5 border-error/20' : 'bg-surface border-white/5'} flex flex-col gap-2 group`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {evt.status === 'active' ? <AlertCircle className="w-4 h-4 text-error" /> : <CheckCircle2 className="w-4 h-4 text-success" />}
                  <span className={`text-xs font-bold uppercase tracking-wider ${evt.status === 'active' ? 'text-error' : 'text-success'}`}>
                    {evt.title}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-text font-mono">
                  <Clock className="w-3 h-3" />
                  {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', second: '2-digit' })}
                </div>
              </div>
              <p className="text-sm text-white leading-snug">{evt.description}</p>
              
              {evt.status === "active" && (
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                  <div className="text-xs text-muted-text flex gap-2">
                    <span className="bg-white/5 px-2 py-0.5 rounded">Triage Pending</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[10px] uppercase font-bold text-success border border-success/30 px-2 py-1 rounded bg-success/10 hover:bg-success/20">
                      Resolve
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </GlassPanel>
  )
}
