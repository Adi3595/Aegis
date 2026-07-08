"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Sparkles, ArrowRight, BarChart4, TrendingUp } from "lucide-react"
import { useLayoutStore } from "@/store/layoutStore"
import { Button } from "@/components/ui/button"

export function ExecutiveCopilot() {
  const { setRightPanel } = useLayoutStore()

  return (
    <GlassPanel className="p-8 h-full border-ai-accent/30 bg-gradient-to-br from-ai-accent/10 to-transparent relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Sparkles className="w-48 h-48 text-ai-accent" />
      </div>

      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="w-6 h-6 text-ai-accent" />
        <h2 className="text-2xl font-semibold text-white">AI Executive Briefing</h2>
      </div>

      <div className="flex-1 space-y-8 relative z-10">
        <div>
          <h3 className="text-sm font-semibold text-ai-accent uppercase tracking-wider mb-2">Executive Summary</h3>
          <p className="text-lg text-white leading-relaxed">
            Operations are running smoothly. Fan Satisfaction is trending high at 95.2. We successfully mitigated a minor crowd surge at Gate North 15 minutes ago, keeping average wait times below the 3-minute threshold.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface/50 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
            <h4 className="flex items-center gap-2 font-semibold text-white mb-2">
              <TrendingUp className="w-4 h-4 text-warning" /> Top Operational Risk
            </h4>
            <p className="text-sm text-muted-text mb-3">
              Predictive models indicate a 75% probability of heavy post-match egress congestion at the South Transit Hub due to delayed train schedules.
            </p>
            <span className="bg-warning/20 text-warning px-2 py-1 rounded text-xs font-bold">Action Recommended</span>
          </div>

          <div className="bg-surface/50 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
            <h4 className="flex items-center gap-2 font-semibold text-white mb-2">
              <BarChart4 className="w-4 h-4 text-success" /> Sustainability Impact
            </h4>
            <p className="text-sm text-muted-text">
              Intelligent HVAC throttling has reduced energy consumption by 4.2% against baseline. Zero impact on measured fan comfort index.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 shrink-0">
        <Button 
          onClick={() => setRightPanel(true)}
          className="bg-ai-accent text-primary-bg font-bold shadow-[0_0_20px_rgba(142,255,178,0.4)] hover:scale-105 transition-transform flex items-center gap-2 px-6 py-6 text-lg"
        >
          Consult AI Copilot <ArrowRight className="w-5 h-5" />
        </Button>
        <p className="text-xs text-muted-text mt-3 ml-2">Ask follow-up questions or request custom strategic reports.</p>
      </div>
    </GlassPanel>
  )
}
