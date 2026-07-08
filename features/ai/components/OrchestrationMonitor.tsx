"use client"

import * as React from "react"
import { Cpu, Server, Activity, ArrowRight, CheckCircle2 } from "lucide-react"
import { useAIStore } from "../store/aiStore"
import { agentRegistry } from "../engine/AgentRegistry"
import { motion, AnimatePresence } from "framer-motion"

export function OrchestrationMonitor() {
  const { isGenerating, activeAgents } = useAIStore()

  if (!isGenerating && activeAgents.length === 0) return null

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-2xl px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="bg-[#0a0a0f]/90 backdrop-blur-xl border border-ai-accent/30 rounded-2xl p-4 shadow-2xl flex flex-col gap-4"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-ai-accent animate-pulse" />
            <h3 className="text-sm font-semibold text-white tracking-wide">Multi-Agent Orchestration Active</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-ai-accent">
            <Activity className="h-3 w-3 animate-pulse" /> Processing...
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="col-span-1 bg-white/5 rounded-lg p-2 text-center text-xs flex flex-col items-center justify-center border border-white/5">
            <Server className="h-4 w-4 text-muted-text mb-1" />
            <span className="text-white font-medium">Context Engine</span>
            <span className="text-[10px] text-success flex items-center gap-1 mt-1"><CheckCircle2 className="h-3 w-3" /> Injected</span>
          </div>
          
          <div className="col-span-1 flex items-center justify-center text-white/20">
            <ArrowRight className="h-4 w-4" />
          </div>

          <div className="col-span-1 flex flex-col gap-1">
            <div className="text-[10px] text-muted-text uppercase font-semibold mb-1 text-center">Active Agents ({activeAgents.length})</div>
            <div className="flex flex-col gap-1 max-h-24 overflow-hidden">
              <AnimatePresence>
                {activeAgents.map((role, idx) => {
                  const agent = agentRegistry.find(a => a.role === role)
                  return (
                    <motion.div 
                      key={role}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-ai-accent/10 border border-ai-accent/30 rounded px-2 py-1 text-[10px] text-ai-accent flex items-center justify-between"
                    >
                      <span className="truncate pr-2">{agent?.name || role}</span>
                      <Activity className="h-3 w-3 animate-spin shrink-0" />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
