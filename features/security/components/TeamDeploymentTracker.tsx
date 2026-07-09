"use client"

import * as React from "react"
import { Users, Navigation, Radio, Shield, MapPin, Activity } from "lucide-react"

const TEAMS = [
  { id: "alpha", name: "Alpha Team", zone: "North Gate", status: "Active", personnel: 4, battery: 88 },
  { id: "bravo", name: "Bravo Team", zone: "Zone C", status: "Responding", personnel: 3, battery: 65 },
  { id: "charlie", name: "Charlie Team", zone: "VIP Entrance", status: "Standby", personnel: 2, battery: 95 },
  { id: "delta", name: "Delta Team", zone: "Parking A", status: "Active", personnel: 5, battery: 42 }
]

export function TeamDeploymentTracker() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/40 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Team Deployment</h3>
            <p className="text-sm text-muted-text">Live Unit Tracking</p>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 relative">
          <Radio className="h-4 w-4 text-blue-400" />
          <span className="absolute right-0 top-0 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
        {TEAMS.map((team) => (
          <div 
            key={team.id}
            className="flex flex-col gap-3 rounded-xl border border-white/5 bg-white/5 p-4 hover:border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 border border-white/10">
                  <Shield className="h-4 w-4 text-gray-300" />
                </div>
                <div>
                  <h4 className="font-medium text-white leading-none mb-1">{team.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-text">
                    <Users className="h-3 w-3" />
                    <span>{team.personnel} Personnel</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  team.status === "Responding" 
                    ? "bg-error/20 text-error"
                    : team.status === "Active"
                    ? "bg-success/20 text-success"
                    : "bg-warning/20 text-warning"
                }`}>
                  {team.status}
                </span>
                <span className="text-[10px] text-muted-text flex items-center gap-1">
                  <Activity className="h-3 w-3 text-blue-400" />
                  {team.battery}% Batt
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-black/20 p-2 text-xs">
              <div className="flex items-center gap-1 text-gray-300">
                <MapPin className="h-3.5 w-3.5 text-muted-text" />
                {team.zone}
              </div>
              <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors">
                <Navigation className="h-3 w-3" />
                Dispatch
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
