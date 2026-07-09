"use client"

import * as React from "react"
import { Shield, BookOpen, AlertTriangle, CheckCircle, ChevronRight, Lock } from "lucide-react"

const PLAYBOOKS = [
  {
    id: "pb-1",
    title: "Unauthorized Access Protocol",
    level: "High",
    steps: [
      "Lock down immediate perimeter zones",
      "Dispatch Alpha Team to location",
      "Notify command center of breach status"
    ]
  },
  {
    id: "pb-2",
    title: "Crowd Crush Prevention",
    level: "Critical",
    steps: [
      "Open emergency spillway gates",
      "Deploy crowd control barriers",
      "Broadcast dispersal message via PA"
    ]
  },
  {
    id: "pb-3",
    title: "Suspicious Package",
    level: "Critical",
    steps: [
      "Establish 100m perimeter",
      "Evacuate immediate sector",
      "Call EOD specialist unit"
    ]
  }
]

export function PlaybooksUI() {
  const [activePlaybook, setActivePlaybook] = React.useState<string | null>(null)

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface/40 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error/20 text-error">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Security Playbooks</h3>
            <p className="text-sm text-muted-text">Standard Operating Procedures</p>
          </div>
        </div>
        <Lock className="h-4 w-4 text-muted-text" />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-hide">
        {PLAYBOOKS.map((pb) => (
          <div 
            key={pb.id}
            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
              activePlaybook === pb.id 
                ? "border-primary-accent/50 bg-primary-accent/10" 
                : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <button 
              className="flex w-full items-center justify-between p-4"
              onClick={() => setActivePlaybook(activePlaybook === pb.id ? null : pb.id)}
            >
              <div className="flex items-center gap-3">
                {pb.level === "Critical" ? (
                  <AlertTriangle className="h-4 w-4 text-error" />
                ) : (
                  <Shield className="h-4 w-4 text-warning" />
                )}
                <span className="font-medium text-white">{pb.title}</span>
              </div>
              <ChevronRight className={`h-4 w-4 text-muted-text transition-transform ${activePlaybook === pb.id ? "rotate-90" : ""}`} />
            </button>
            
            {activePlaybook === pb.id && (
              <div className="border-t border-white/10 bg-black/20 p-4">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-text">Action Steps</h4>
                <ul className="space-y-3">
                  {pb.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/20 text-[10px] text-muted-text">
                        {idx + 1}
                      </div>
                      <span className="text-sm text-gray-300">{step}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-accent py-2 text-sm font-semibold text-white transition-all hover:bg-primary-accent/90 shadow-[0_0_15px_rgba(91,140,255,0.3)]">
                  <CheckCircle className="h-4 w-4" />
                  Execute Playbook
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
