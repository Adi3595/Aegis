"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { AlertTriangle, Filter, Search, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { Button } from "@/components/ui/button"
import { orchestrator } from "@/features/ai/engine/Orchestrator"

export function IncidentsWorkspace() {
  const { events } = useSimulationStore()
  const [filter, setFilter] = React.useState<"all" | "active" | "resolved">("active")
  const [search, setSearch] = React.useState("")

  const filteredEvents = events.filter(e => {
    if (filter === "active" && e.status !== "active") return false
    if (filter === "resolved" && e.status !== "resolved") return false
    if (search && !e.message.toLowerCase().includes(search.toLowerCase()) && !e.type.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const activeCount = events.filter(e => e.status === "active").length

  const handleAskAI = (eventMessage: string) => {
    orchestrator.ask(`How should we resolve this active incident: "${eventMessage}"?`)
  }

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 bg-surface/50 p-1 rounded-lg border border-white/10">
          <button 
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${filter === "all" ? "bg-white/10 text-white font-medium" : "text-muted-text hover:text-white"}`}
          >
            All Events
          </button>
          <button 
            onClick={() => setFilter("active")}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2 ${filter === "active" ? "bg-error/20 text-error font-medium" : "text-muted-text hover:text-white"}`}
          >
            Active
            {activeCount > 0 && <span className="bg-error text-white text-[10px] px-1.5 py-0.5 rounded-full">{activeCount}</span>}
          </button>
          <button 
            onClick={() => setFilter("resolved")}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${filter === "resolved" ? "bg-success/20 text-success font-medium" : "text-muted-text hover:text-white"}`}
          >
            Resolved
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
          <input 
            type="text" 
            placeholder="Search incidents..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-ai-accent focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Incident List */}
      <GlassPanel className="flex-1 overflow-hidden flex flex-col p-0">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-muted-text">
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-2 hide-scrollbar">
          {filteredEvents.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-text">
              <CheckCircle2 className="w-12 h-12 mb-2 opacity-20" />
              <p>No incidents match the current filters.</p>
            </div>
          ) : (
            filteredEvents.map(evt => (
              <div key={evt.id} className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg border ${evt.status === 'active' ? 'bg-error/5 border-error/20' : 'bg-surface border-white/5 hover:bg-white/5'} transition-colors`}>
                <div className="col-span-2 flex items-center gap-2">
                  {evt.status === 'active' ? (
                    <span className="flex items-center gap-1.5 text-error text-sm font-medium"><AlertCircle className="w-4 h-4" /> Active</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-success text-sm"><CheckCircle2 className="w-4 h-4" /> Resolved</span>
                  )}
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-muted-text text-sm font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                </div>
                <div className="col-span-2">
                  <span className="bg-white/5 border border-white/10 text-white/80 px-2 py-1 rounded text-xs font-medium">
                    {evt.type}
                  </span>
                </div>
                <div className="col-span-4 text-sm text-white">
                  {evt.message}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  {evt.status === 'active' && (
                    <Button variant="outline" size="sm" onClick={() => handleAskAI(evt.message)} className="h-8 text-xs border-ai-accent/30 text-ai-accent hover:bg-ai-accent/10">
                      Ask AI
                    </Button>
                  )}
                  {/* Local resolve logic isn't wired to backend state override yet, just UI mock action if we wanted */}
                </div>
              </div>
            ))
          )}
        </div>
      </GlassPanel>
    </div>
  )
}
