"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, ShieldCheck, Database, Brain, ChevronDown, ChevronUp } from "lucide-react"

export interface AIMetadata {
  agents: string[]
  confidence: number
  model: string
  processing_time: string
  scenario: string
}

interface Props {
  metadata: AIMetadata | null
}

export function ExplainabilityPanel({ metadata }: Props) {
  const [expanded, setExpanded] = React.useState(false)

  if (!metadata) return null

  return (
    <div className="mt-3 bg-black/40 border border-white/10 rounded-lg overflow-hidden">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 text-xs text-muted-text hover:text-white transition-colors hover:bg-white/5"
      >
        <div className="flex items-center gap-2">
          <Brain className="w-3.5 h-3.5 text-ai-accent" />
          <span className="font-mono tracking-widest uppercase text-[10px]">AI Explainability</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-primary-accent" />
            <span>{(metadata.confidence * 100).toFixed(0)}% Confidence</span>
          </div>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5"
          >
            <div className="p-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-white/40 font-mono mb-1">AGENTS DEPLOYED</div>
                <div className="flex flex-wrap gap-1">
                  {metadata.agents.map(a => (
                    <span key={a} className="px-2 py-0.5 rounded bg-ai-accent/20 text-ai-accent border border-ai-accent/20">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-white/40 font-mono mb-1">MODEL ENGINE</div>
                <div className="text-white flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  {metadata.model}
                </div>
              </div>
              
              <div>
                <div className="text-white/40 font-mono mb-1">PROCESSING TIME</div>
                <div className="text-white flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-warning" />
                  {metadata.processing_time}
                </div>
              </div>

              <div>
                <div className="text-white/40 font-mono mb-1">CONTEXT SCENARIO</div>
                <div className="text-white">
                  {metadata.scenario}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
