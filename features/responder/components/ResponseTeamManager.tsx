"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { useResponderStore } from "@/features/responder/store/responderStore"
import { Shield, PlusSquare, Wrench, Siren, CheckCircle2, Clock } from "lucide-react"

export function ResponseTeamManager() {
  const { teams } = useResponderStore()

  const iconMap = {
    "Security": Shield,
    "Medical": PlusSquare,
    "Fire": Siren,
    "Maintenance": Wrench,
  }
  const colorMap = {
    "Security": "text-blue-400 border-blue-400/30 bg-blue-400/10",
    "Medical": "text-green-400 border-green-400/30 bg-green-400/10",
    "Fire": "text-error border-error/30 bg-error/10",
    "Maintenance": "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  }

  return (
    <GlassPanel className="p-0 flex flex-col flex-1 min-h-[300px]">
      <div className="p-4 border-b border-white/5">
        <h3 className="font-semibold text-white">Response Teams</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 hide-scrollbar">
        {teams.map(team => {
          const Icon = iconMap[team.type]
          const colorClass = colorMap[team.type]
          
          return (
            <div key={team.id} className="p-3 panel-solid flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{team.id.toUpperCase()}</h4>
                  <div className="text-xs text-muted-text">{team.type}</div>
                </div>
              </div>

              <div className="text-right">
                {team.status === "Available" ? (
                  <span className="flex items-center gap-1 text-xs text-success font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Available
                  </span>
                ) : (
                  <div className="flex flex-col items-end gap-1">
                    <span className="flex items-center gap-1 text-xs text-warning font-medium">
                      <Clock className="w-3 h-3" /> {team.status}
                    </span>
                    <span className="text-[10px] text-muted-text font-mono">
                      {team.assignedZone} {team.eta ? `(ETA ${team.eta}m)` : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </GlassPanel>
  )
}
