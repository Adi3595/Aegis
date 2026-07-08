"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Activity, Target, Flame } from "lucide-react"

export function PredictiveRiskAnalysis() {
  return (
    <GlassPanel className="p-0 flex flex-col min-h-[250px]">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <Activity className="w-5 h-5 text-ai-accent" />
        <h3 className="font-semibold text-white">AI Risk Analysis</h3>
      </div>
      
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-r from-warning/10 to-transparent border-l-2 border-warning">
          <div className="flex items-start justify-between mb-1">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-warning" /> Crowd Spillover
            </h4>
            <span className="text-xs font-mono text-warning">85% PROB</span>
          </div>
          <p className="text-xs text-muted-text">
            Projected spillover from Gate North to adjacent concourse within 10 minutes based on current ingress velocity.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-r from-error/10 to-transparent border-l-2 border-error">
          <div className="flex items-start justify-between mb-1">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-error" /> Med Resource Shortage
            </h4>
            <span className="text-xs font-mono text-error">92% PROB</span>
          </div>
          <p className="text-xs text-muted-text">
            Medical Center A approaching capacity. Anticipate 15m delay for new triage patients. Route overflow to Medical Center B.
          </p>
        </div>
      </div>
    </GlassPanel>
  )
}
