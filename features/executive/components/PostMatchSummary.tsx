"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Sparkles, CheckCircle2, ShieldAlert } from "lucide-react"

export function PostMatchSummary() {
  return (
    <GlassPanel className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-ai-accent" />
        <h3 className="font-semibold text-white">AI Post-Match Intelligence</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6 hide-scrollbar">
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 pb-2 border-b border-white/10">Operational Summary</h4>
          <p className="text-sm text-muted-text leading-relaxed">
            The event concluded with a 98% overall operational success rate. Peak egress was handled efficiently, averaging 14 minutes to clear the stadium perimeter. Public transit synchronization achieved a 92% utilization rate, minimizing concourse loitering.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 pb-2 border-b border-white/10">Lessons Learned</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-warning mt-0.5 shrink-0" />
              <p className="text-sm text-muted-text">
                <strong className="text-white">Security Checkpoint Delta</strong> experienced a 22-minute backlog during peak ingress due to sequential bag checks. <span className="text-ai-accent">AI Recommendation: Implement parallel screening queues for the next high-attendance fixture.</span>
              </p>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-sm text-muted-text">
                <strong className="text-white">Medical Triage Routing</strong> successfully diverted 15% of minor incidents to pop-up stations, preventing main clinic overflow. <span className="text-ai-accent">AI Recommendation: Standardize this protocol.</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </GlassPanel>
  )
}
