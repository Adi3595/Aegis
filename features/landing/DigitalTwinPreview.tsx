"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Badge } from "@/components/ui/badge"
import { Slide } from "@/animations"
import { StadiumMap } from "@/features/digital-twin/components/StadiumMap"

const OVERLAYS = [
  "Crowd", "Medical", "Security", "Transport", 
  "Parking", "Food", "Weather", "Volunteer"
]

export default function DigitalTwinPreview() {
  const [activeOverlay, setActiveOverlay] = React.useState("Crowd")

  return (
    <div className="container mx-auto px-4 py-32 border-t border-white/10" id="technology">
      <Slide direction="up">
        <SectionHeading 
          title="Digital Twin Preview" 
          subtitle="Interact with the semantic data layers overlaying the stadium's digital twin in real time."
        />
      </Slide>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left: Toggles */}
        <div className="w-full lg:w-1/4 flex flex-col space-y-2">
          {OVERLAYS.map((layer, idx) => (
            <motion.button
              key={layer}
              onClick={() => setActiveOverlay(layer)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeOverlay === layer 
                  ? "bg-primary-accent text-primary-bg shadow-[0_0_15px_rgba(50,212,255,0.4)]" 
                  : "bg-surface text-muted-text hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{layer} Layer</span>
              {activeOverlay === layer && (
                <motion.span layoutId="active-indicator" className="h-2 w-2 rounded-full bg-primary-bg" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right: Simulated Preview */}
        <div className="w-full lg:w-3/4">
          <GlassPanel className="relative h-[400px] sm:h-[500px] w-full overflow-hidden p-0 border-white/20">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGgyMHYxSDB6TTAgMHYyMGgxVjB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] bg-[size:40px_40px]" />
            
            <div className="absolute inset-0 flex w-full h-full items-center justify-center opacity-60 pointer-events-none">
              <StadiumMap />
            </div>

            {/* Simulated UI Content */}
            <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOverlay}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-xl"
                >
                  <GlassPanel interactive className="border-primary-accent/30 bg-primary-bg/80 backdrop-blur-2xl">
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                      <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">{activeOverlay} Telemetry</h3>
                      <Badge variant="ai" className="animate-pulse">LIVE DATA</Badge>
                    </div>
                    
                    <div className="space-y-4 font-mono text-sm">
                      {/* Generative Mock Data based on active overlay */}
                      <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span className="text-muted-text">Primary Sensor Node:</span>
                        <span className="text-primary-accent">{activeOverlay.toUpperCase()}_N_001</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span className="text-muted-text">Confidence Interval:</span>
                        <span className="text-success">98.4%</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span className="text-muted-text">Active Sub-Agents:</span>
                        <span className="text-white">12</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span className="text-muted-text">Update Frequency:</span>
                        <span className="text-ai-accent">Real-time (15ms)</span>
                      </div>
                    </div>
                  </GlassPanel>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Animated Radar Sweep Overlay */}
            <motion.div 
              className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ai-accent/10 bg-gradient-to-tr from-transparent via-ai-accent/5 to-transparent pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          </GlassPanel>
        </div>
      </div>
    </div>
  )
}
