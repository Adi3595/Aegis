"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Users, Shield, PlusSquare, Wrench, Bus, Activity } from "lucide-react"

// Mock real-time resources since backend doesn't explicitly track individual staff yet
const RESOURCES = [
  { id: "volunteers", label: "Volunteers", total: 120, deployed: 98, icon: Users, color: "text-blue-400" },
  { id: "security", label: "Security Personnel", total: 85, deployed: 85, icon: Shield, color: "text-red-400" },
  { id: "medical", label: "Medical Staff", total: 40, deployed: 12, icon: PlusSquare, color: "text-green-400" },
  { id: "maintenance", label: "Maintenance Crews", total: 25, deployed: 18, icon: Wrench, color: "text-yellow-400" },
  { id: "transport", label: "Transport Coord.", total: 15, deployed: 15, icon: Bus, color: "text-purple-400" },
]

export function ResourcesWorkspace() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {RESOURCES.map(res => (
          <GlassPanel key={res.id} className="p-5 flex flex-col justify-between group cursor-pointer hover:bg-white/[0.05] transition-colors">
            <div className="flex items-start justify-between mb-4">
              <span className="font-semibold text-white">{res.label}</span>
              <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${res.color}`}>
                <res.icon className="w-5 h-5" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-text">Deployed</span>
                <span className="font-mono text-white">{res.deployed} / {res.total}</span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${res.deployed / res.total > 0.9 ? 'bg-error' : 'bg-primary-accent'}`}
                  style={{ width: `${(res.deployed / res.total) * 100}%` }}
                />
              </div>
              
              {res.deployed === res.total && (
                <p className="text-[10px] text-error font-medium uppercase mt-2">Maximum Deployment Reached</p>
              )}
            </div>
          </GlassPanel>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <GlassPanel className="p-5 flex-1 bg-gradient-to-b from-ai-accent/10 to-transparent border-ai-accent/30">
          <div className="flex items-center gap-2 mb-4 text-ai-accent">
            <Activity className="w-5 h-5" />
            <h3 className="font-semibold">AI Deployment Suggestions</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-surface/50 border border-white/5 rounded-xl p-3">
              <h4 className="text-sm font-semibold text-white mb-1">Security Shortage: North Gate</h4>
              <p className="text-xs text-muted-text mb-3">Occupancy rising quickly. Suggest reallocating 5 security personnel from South Gate.</p>
              <button className="w-full bg-ai-accent/20 hover:bg-ai-accent/30 text-ai-accent border border-ai-accent/30 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Execute Reallocation
              </button>
            </div>

            <div className="bg-surface/50 border border-white/5 rounded-xl p-3">
              <h4 className="text-sm font-semibold text-white mb-1">Medical Pre-positioning</h4>
              <p className="text-xs text-muted-text mb-3">Temperature &gt; 85°F. Move 2 medical teams to uncovered East Sector.</p>
              <button className="w-full bg-ai-accent/20 hover:bg-ai-accent/30 text-ai-accent border border-ai-accent/30 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Dispatch Teams
              </button>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
