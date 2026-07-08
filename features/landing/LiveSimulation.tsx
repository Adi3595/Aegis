"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Badge } from "@/components/ui/badge"
import { Slide } from "@/animations"
import { CloudRain, DoorClosed, Stethoscope, UserX, Train, ZapOff, Flame, AlertTriangle } from "lucide-react"

const SCENARIOS = [
  { id: "rain", label: "Heavy Rain", icon: CloudRain, severity: "warning" },
  { id: "gate", label: "Gate Closed", icon: DoorClosed, severity: "warning" },
  { id: "medical", label: "Medical Emergency", icon: Stethoscope, severity: "error" },
  { id: "child", label: "Lost Child", icon: UserX, severity: "error" },
  { id: "metro", label: "Metro Delay", icon: Train, severity: "warning" },
  { id: "power", label: "Power Failure", icon: ZapOff, severity: "error" },
  { id: "fire", label: "Fire Alarm", icon: Flame, severity: "error" },
]

export default function LiveSimulation() {
  const [activeScenario, setActiveScenario] = React.useState(SCENARIOS[0])

  return (
    <div className="container mx-auto px-4 py-32 border-t border-white/10 bg-surface/20" id="simulation">
      <Slide direction="up">
        <SectionHeading 
          title="Live Threat Simulation" 
          subtitle="Trigger critical events and watch the AI instantly orchestrate responses across all operational channels."
        />
      </Slide>

      <div className="mt-12 flex flex-col xl:flex-row gap-8">
        
        {/* Left: Scenarios */}
        <div className="w-full xl:w-1/3 flex flex-col space-y-3">
          <h3 className="text-lg font-display font-semibold text-white mb-4">Inject Scenario</h3>
          {SCENARIOS.map((scenario, i) => {
            const Icon = scenario.icon
            const isActive = activeScenario.id === scenario.id
            return (
              <Slide key={scenario.id} direction="left" delay={i * 0.1}>
                <button
                  onClick={() => setActiveScenario(scenario)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    isActive 
                      ? scenario.severity === "error" 
                        ? "bg-error/20 border-error shadow-[0_0_20px_rgba(255,93,115,0.3)] text-white" 
                        : "bg-warning/20 border-warning shadow-[0_0_20px_rgba(249,199,79,0.3)] text-white"
                      : "bg-surface border-white/5 text-muted-text hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${isActive ? (scenario.severity === "error" ? "text-error" : "text-warning") : ""}`} />
                    <span className="font-medium">{scenario.label}</span>
                  </div>
                  {isActive && <span className="relative flex h-2 w-2"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${scenario.severity === "error" ? "bg-error" : "bg-warning"}`}></span><span className={`relative inline-flex rounded-full h-2 w-2 ${scenario.severity === "error" ? "bg-error" : "bg-warning"}`}></span></span>}
                </button>
              </Slide>
            )
          })}
        </div>

        {/* Right: Orchestration Dashboard */}
        <div className="w-full xl:w-2/3">
          <GlassPanel className="h-full min-h-[500px] border-white/10 p-6 flex flex-col relative overflow-hidden bg-primary-bg/80">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBo四十djQwSDB6IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDBoNDB2MUgwek0wIDB2NDBoMVYweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')] opacity-30" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScenario.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col h-full space-y-6"
              >
                {/* Alert Banner */}
                <div className={`flex items-center p-4 rounded-lg border ${activeScenario.severity === "error" ? "bg-error/10 border-error/50 text-error" : "bg-warning/10 border-warning/50 text-warning"}`}>
                  <AlertTriangle className="h-6 w-6 mr-3" />
                  <div>
                    <h4 className="font-bold uppercase tracking-wider">{activeScenario.label} DETECTED</h4>
                    <p className="text-sm opacity-80">AI Orchestrator has engaged response protocols.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Heatmap visualization mock */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-medium text-muted-text">Affected Area (Digital Twin)</span>
                    <div className="h-48 rounded-lg bg-surface border border-white/10 relative overflow-hidden flex items-center justify-center">
                       <motion.div 
                          className={`absolute w-32 h-32 blur-3xl opacity-40 rounded-full ${activeScenario.severity === "error" ? "bg-error" : "bg-warning"}`}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                       />
                       <span className="text-xs font-mono text-white/50 z-10">SECTOR {Math.floor(Math.random() * 5) + 1} MAP</span>
                    </div>
                  </div>

                  {/* AI Directives */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-medium text-muted-text">Live Directives Executed</span>
                    <div className="flex-1 rounded-lg bg-surface border border-white/10 p-4 space-y-3 font-mono text-xs">
                      <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: 0.2}} className="flex items-center text-ai-accent"><span className="mr-2">»</span> Rerouting crowd flows via Navigation App</motion.div>
                      <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: 0.4}} className="flex items-center text-ai-accent"><span className="mr-2">»</span> Dispatching 3 Volunteer units</motion.div>
                      <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: 0.6}} className="flex items-center text-success"><span className="mr-2">»</span> Pre-warming digital signage</motion.div>
                      <motion.div initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: 0.8}} className="flex items-center text-success"><span className="mr-2">»</span> Securing secondary ingress</motion.div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </GlassPanel>
        </div>
      </div>
    </div>
  )
}
