"use client"

import * as React from "react"
import { useDemoStore } from "@/store/demoStore"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Play, RotateCcw, CloudLightning, Activity, AlertTriangle, MonitorPlay, Users } from "lucide-react"
import { useToast } from "@/components/ui/toast"
import { motion } from "framer-motion"

export default function DemoControlCenter() {
  const { isDemoMode, presentationMode, toggleDemoMode, togglePresentationMode, activeScenario, setActiveScenario, resetDemo, setTourActive } = useDemoStore()
  const { addToast } = useToast()

  const handleScenario = async (scenario: string, seed: number) => {
    try {
      addToast({ title: "Injecting Scenario...", description: `Initializing ${scenario} (Seed: ${seed})`, type: "info" })
      
      const res = await fetch("/api/v1/simulation/scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario_id: scenario, seed })
      })

      if (res.ok) {
        setActiveScenario(scenario)
        addToast({ title: "Scenario Active", description: `${scenario} dynamics running.`, type: "success" })
      } else {
        throw new Error("Failed to trigger scenario")
      }
    } catch (e) {
      addToast({ title: "Scenario Failed", description: "Could not reach Simulation Engine.", type: "error" })
    }
  }

  return (
    <div className="space-y-6 p-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
            <MonitorPlay className="w-8 h-8 text-primary-accent" />
            Demo Control Center
          </h1>
          <p className="text-muted-text">Orchestrate live presentations and trigger seeded simulations.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              toggleDemoMode(!isDemoMode)
              addToast({ title: "Mode Toggled", description: `Demo Mode ${!isDemoMode ? 'Enabled' : 'Disabled'}`, type: "info" })
            }}
            className={`px-4 py-2 rounded-md font-semibold transition-all ${isDemoMode ? 'bg-primary-accent text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {isDemoMode ? "Demo Mode ON" : "Demo Mode OFF"}
          </button>
          
          <button 
            onClick={() => togglePresentationMode(!presentationMode)}
            className={`px-4 py-2 rounded-md font-semibold transition-all ${presentationMode ? 'bg-ai-accent text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Presentation UI
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassPanel className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
            <Activity className="w-5 h-5 text-warning" />
            Scenario Launcher
          </h2>
          <div className="space-y-3">
            {[
              { id: 'NORMAL_MATCH', label: 'Normal Match Day', icon: Users, seed: 1001, color: 'text-primary-accent' },
              { id: 'HEAVY_RAIN', label: 'Severe Weather (Heavy Rain)', icon: CloudLightning, seed: 1002, color: 'text-blue-400' },
              { id: 'MEDICAL_EMERGENCY', label: 'Medical Emergency (Zone C)', icon: Activity, seed: 1003, color: 'text-error' },
              { id: 'CROWD_SURGE', label: 'Crowd Surge (Gate A)', icon: AlertTriangle, seed: 1005, color: 'text-warning' },
            ].map(s => (
              <button
                key={s.id}
                onClick={() => handleScenario(s.id, s.seed)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                  activeScenario === s.id 
                    ? 'border-primary-accent bg-primary-accent/10' 
                    : 'border-white/10 bg-black/40 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                  <span className="font-semibold text-white">{s.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-text font-mono">SEED:{s.seed}</span>
                  {activeScenario === s.id && <span className="w-2 h-2 rounded-full bg-primary-accent animate-pulse" />}
                </div>
              </button>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
            <Play className="w-5 h-5 text-ai-accent" />
            Guided Walkthrough
          </h2>
          <p className="text-sm text-muted-text mb-6">Launch the interactive product tour for judges. Highlights key features sequentially.</p>
          
          <button 
            onClick={() => setTourActive(true)}
            className="w-full py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center justify-center gap-2 transition-all mb-4"
          >
            <Play className="w-4 h-4 fill-current" />
            Start Full Presentation Tour
          </button>
          
          <div className="border-t border-white/10 pt-4 mt-auto">
            <button 
              onClick={() => {
                resetDemo()
                addToast({ title: "Environment Reset", description: "Simulation and Demo state cleared.", type: "success" })
              }}
              className="w-full py-2 rounded-md bg-error/10 hover:bg-error/20 text-error font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Demo Environment
            </button>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
