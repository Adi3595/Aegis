"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Activity, Zap } from "lucide-react"
import { useLayoutStore } from "@/store/layoutStore"
import { cn } from "@/lib/utils"

export function RightPanel() {
  const { rightPanelOpen, setRightPanel } = useLayoutStore()

  // On desktop, it takes space in the grid. On mobile, it's a slide-over.
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 1280 : false

  return (
    <>
      <AnimatePresence>
        {rightPanelOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRightPanel(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: rightPanelOpen ? 320 : 0,
          opacity: rightPanelOpen ? 1 : 0,
          x: !rightPanelOpen && isMobile ? 320 : 0
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-full flex-col border-l border-white/5 bg-surface/80 backdrop-blur-3xl xl:static xl:z-0 overflow-hidden",
          !rightPanelOpen && "border-none"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-white/5 w-[320px]">
          <div className="flex items-center gap-2 text-ai-accent">
            <Sparkles className="h-4 w-4" />
            <span className="font-display font-semibold tracking-tight text-white">AI Insights</span>
          </div>
          <button
            onClick={() => setRightPanel(false)}
            className="rounded-md p-1.5 text-muted-text hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 w-[320px]">
          {/* Placeholder content for future AI modules */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono tracking-wider text-muted-text uppercase">Active Intelligence</h4>
            
            <div className="rounded-xl border border-white/10 bg-glass p-4 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ai-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ai-accent"></span>
                </span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-primary-accent">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-semibold">Crowd Flow Anomalies</span>
              </div>
              <p className="text-sm text-muted-text">
                Sector 4 Gate B experiencing 24% higher volume than predicted. Re-routing security personnel recommended.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-glass p-4 shadow-sm relative overflow-hidden">
              <div className="mb-2 flex items-center gap-2 text-warning">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-semibold">System Optimization</span>
              </div>
              <p className="text-sm text-muted-text">
                HVAC systems in East Wing are running inefficiently. AI agent suggests modulating to 72°F to save 12% power load.
              </p>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-xs font-mono tracking-wider text-muted-text uppercase">Context Menu</h4>
            <div className="rounded-lg border border-white/5 bg-white/5 p-4 text-center text-sm text-muted-text border-dashed">
              Right panel contextual tools will mount here based on the active dashboard view.
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
