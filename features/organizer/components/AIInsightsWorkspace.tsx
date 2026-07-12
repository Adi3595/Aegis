"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Sparkles, Activity, Target, Shield, Crosshair } from "lucide-react"

export function AIInsightsWorkspace() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-ai-accent" />
            <h3 className="font-semibold text-white">Active AI Agents</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { role: "operations", name: "Operations Commander", status: "Active", load: "42%" },
              { role: "security", name: "Security Analyst", status: "Active", load: "18%" },
              { role: "medical", name: "Medical Coordinator", status: "Standby", load: "2%" },
              { role: "crowd", name: "Crowd Dynamics Engine", status: "Active", load: "89%" },
            ].map(agent => (
              <div key={agent.role} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white text-sm mb-1">{agent.name}</div>
                  <div className="text-xs text-muted-text font-mono">ROLE: {agent.role}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold uppercase mb-1 ${agent.status === 'Active' ? 'text-success' : 'text-muted-text'}`}>
                    {agent.status}
                  </div>
                  <div className="text-xs text-ai-accent">{agent.load} LOAD</div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 flex-1 bg-white/[0.01]">
          <h3 className="font-semibold text-white mb-6">Predictive Scenario Analysis</h3>
          <div className="space-y-4">
            <div className="p-4 panel-solid relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3">
                <Target className="w-4 h-4 text-warning opacity-50" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-2">Scenario Alpha: Halftime Surge</h4>
              <p className="text-sm text-muted-text mb-4">
                Predictive models indicate a 45% spike in concourse density at 45:00. Restrooms in East Wing will exceed capacity by 20%.
              </p>
              <div className="flex gap-2">
                <span className="bg-ai-accent/20 text-ai-accent px-2 py-1 rounded text-xs font-medium">Confidence: 89%</span>
                <span className="bg-warning/20 text-warning px-2 py-1 rounded text-xs font-medium">Impact: High</span>
              </div>
            </div>
            
            <div className="p-4 panel-solid relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3">
                <Shield className="w-4 h-4 text-error opacity-50" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-2">Scenario Beta: Medical Pathway Blockage</h4>
              <p className="text-sm text-muted-text mb-4">
                Simulated density near Medical Center B suggests emergency pathways may become obstructed if Gate West is not throttled.
              </p>
              <div className="flex gap-2">
                <span className="bg-ai-accent/20 text-ai-accent px-2 py-1 rounded text-xs font-medium">Confidence: 62%</span>
                <span className="bg-error/20 text-error px-2 py-1 rounded text-xs font-medium">Impact: Critical</span>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>

      <div className="flex flex-col gap-6">
        <GlassPanel className="p-6 flex-1 bg-ai-accent/5 border-ai-accent/20">
          <div className="flex items-center gap-2 mb-6 text-ai-accent">
            <Crosshair className="w-5 h-5" />
            <h3 className="font-semibold">Reasoning Trace</h3>
          </div>
          <div className="text-sm text-muted-text space-y-4 font-mono">
            <p>Evaluating simulation state at t=14402...</p>
            <p className="text-white">Detected anomaly at zone='gate-north', metric=occupancy_ratio, val=0.92</p>
            <p>Spawning agent `security`...</p>
            <p>Spawning agent `crowd`...</p>
            <p className="border-l-2 border-ai-accent pl-3 text-ai-accent/80">
              agent(crowd): "Recommend routing inbound flow to gate-west. Expected delta: -15%"
            </p>
            <p className="border-l-2 border-warning pl-3 text-warning/80">
              agent(security): "gate-west security screening is understaffed for +15% volume."
            </p>
            <p className="text-white">Aggregating responses...</p>
            <p className="text-success">Generated Recommendation: Route to gate-west AND deploy 2 additional security teams.</p>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
