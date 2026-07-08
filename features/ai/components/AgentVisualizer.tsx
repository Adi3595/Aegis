"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Search, BrainCircuit, Users, Cpu, FileText } from "lucide-react"

export type MilestoneType = 'request.received' | 'context.loaded' | 'intent.classified' | 'agents.selected' | 'generation.started' | 'response.completed'

interface Props {
  activeMilestone: MilestoneType | null
}

const STAGES = [
  { id: 'request.received', label: 'Request Received', icon: FileText },
  { id: 'context.loaded', label: 'Context Retrieval', icon: Search },
  { id: 'intent.classified', label: 'Intent Classification', icon: BrainCircuit },
  { id: 'agents.selected', label: 'Agent Orchestration', icon: Users },
  { id: 'generation.started', label: 'Response Generation', icon: Cpu }
]

export function AgentVisualizer({ activeMilestone }: Props) {
  if (!activeMilestone || activeMilestone === 'response.completed') return null

  const activeIndex = STAGES.findIndex(s => s.id === activeMilestone)

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-black/30 border border-white/5 rounded-lg p-4 mb-4"
    >
      <div className="text-xs font-mono text-muted-text mb-3 uppercase tracking-widest text-center">
        AI Orchestration Pipeline
      </div>
      <div className="flex flex-col gap-2">
        {STAGES.map((stage, idx) => {
          const isPast = activeIndex > idx
          const isActive = activeIndex === idx
          const isFuture = activeIndex < idx && activeIndex !== -1

          let colorClass = "text-white/20 border-white/10"
          if (isPast) colorClass = "text-primary-accent border-primary-accent/30 bg-primary-accent/5"
          if (isActive) colorClass = "text-white border-ai-accent bg-ai-accent/20"

          return (
            <div key={stage.id} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-500 ${colorClass}`}>
                <stage.icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
              </div>
              <div className="flex-1">
                <div className={`text-sm font-semibold transition-colors duration-500 ${isActive ? 'text-white' : isPast ? 'text-primary-accent' : 'text-white/30'}`}>
                  {stage.label}
                </div>
              </div>
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="text-xs text-ai-accent font-mono"
                >
                  Processing...
                </motion.div>
              )}
              {isPast && (
                <div className="text-xs text-primary-accent font-mono">
                  ✓
                </div>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
