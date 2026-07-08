"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { useLayoutStore } from "@/store/layoutStore"
import { BookOpen, ChevronRight, FileText } from "lucide-react"

const PLAYBOOKS = [
  { id: "pb-med", title: "Medical Emergency", category: "Medical" },
  { id: "pb-fire", title: "Fire Alarm / Evacuation", category: "Security" },
  { id: "pb-crowd", title: "Crowd Surge", category: "Security" },
  { id: "pb-weather", title: "Severe Weather", category: "Operations" },
]

export function EmergencyPlaybooks() {
  const { setRightPanel } = useLayoutStore()

  const handleOpenPlaybook = (title: string) => {
    // Normally this would expand the playbook locally.
    // Given the AI integration, we can also trigger the Copilot to assist with the playbook.
    setRightPanel(true)
  }

  return (
    <GlassPanel className="p-0 flex flex-col flex-1 min-h-[250px]">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-white" />
        <h3 className="font-semibold text-white">Emergency Playbooks</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
        {PLAYBOOKS.map(pb => (
          <button
            key={pb.id}
            onClick={() => handleOpenPlaybook(pb.title)}
            className="flex items-center justify-between p-3 rounded-xl bg-surface border border-white/5 hover:bg-white/5 hover:border-white/20 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-muted-text group-hover:text-ai-accent transition-colors" />
              <div>
                <div className="text-sm font-semibold text-white">{pb.title}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-text">{pb.category}</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-text group-hover:text-white" />
          </button>
        ))}
      </div>
    </GlassPanel>
  )
}
