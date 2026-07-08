"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Leaf, Droplet, Zap, Recycle, ArrowDownRight, ArrowUpRight } from "lucide-react"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"

export function SustainabilityWorkspace() {
  const { tick } = useSimulationStore()
  
  // Mock derived metrics from the simulation tick
  const energyKwh = 15000 + (tick * 12.5)
  const waterLiters = 45000 + (tick * 45)
  const wasteKg = 1200 + (tick * 5)
  const carbonSaved = (tick * 2.1).toFixed(1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
      <GlassPanel className="p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <span className="font-semibold text-muted-text">Power Load</span>
          <div className="p-2 rounded-lg bg-warning/20 text-warning border border-warning/30">
            <Zap className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="font-display text-3xl font-bold text-white mb-1">
            {(energyKwh / 1000).toFixed(1)} <span className="text-sm text-muted-text font-normal">MWh</span>
          </div>
          <div className="flex items-center text-xs text-error">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +2.4% vs baseline
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <span className="font-semibold text-muted-text">Water Usage</span>
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Droplet className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="font-display text-3xl font-bold text-white mb-1">
            {(waterLiters / 1000).toFixed(1)} <span className="text-sm text-muted-text font-normal">kL</span>
          </div>
          <div className="flex items-center text-xs text-success">
            <ArrowDownRight className="w-3 h-3 mr-1" />
            -1.1% vs baseline
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <span className="font-semibold text-muted-text">Waste Generated</span>
          <div className="p-2 rounded-lg bg-amber-700/20 text-amber-500 border border-amber-700/30">
            <Recycle className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="font-display text-3xl font-bold text-white mb-1">
            {(wasteKg / 1000).toFixed(2)} <span className="text-sm text-muted-text font-normal">Tons</span>
          </div>
          <div className="flex items-center text-xs text-success">
            <ArrowDownRight className="w-3 h-3 mr-1" />
            Optimized routing active
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-5 flex flex-col justify-between border-success/30 bg-success/5">
        <div className="flex items-start justify-between mb-4">
          <span className="font-semibold text-success">Carbon Offset</span>
          <div className="p-2 rounded-lg bg-success/20 text-success border border-success/30">
            <Leaf className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="font-display text-3xl font-bold text-success mb-1">
            {carbonSaved} <span className="text-sm font-normal">kg CO₂</span>
          </div>
          <div className="text-xs text-success/70">
            Saved via intelligent HVAC
          </div>
        </div>
      </GlassPanel>
      
      {/* Expanded bottom section */}
      <GlassPanel className="lg:col-span-4 p-6 bg-white/[0.02] border-dashed border-white/10 min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-success/20 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-2">AI Sustainability Optimization</h3>
          <p className="text-sm text-muted-text max-w-md mx-auto">
            The AEGIS Copilot continuously balances HVAC systems and lighting based on real-time crowd density in the Digital Twin to minimize environmental footprint without impacting fan comfort.
          </p>
        </div>
      </GlassPanel>
    </div>
  )
}
