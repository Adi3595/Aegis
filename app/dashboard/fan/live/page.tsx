"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { FanMapWidget } from "@/features/fan/components/FanMapWidget"
import { LiveAlertsFeed } from "@/features/fan/components/LiveAlertsFeed"
import { PlayCircle } from "lucide-react"

export default function FanLiveMatchPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 h-full">
      {/* Live Match Video Feed Placeholder */}
      <GlassPanel className="p-0 overflow-hidden relative w-full h-[40vh] min-h-[300px] border-primary-accent/30 flex flex-col items-center justify-center bg-black/60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 blur-sm pointer-events-none" />
        
        <PlayCircle className="w-16 h-16 text-primary-accent opacity-80 animate-pulse relative z-10 cursor-pointer hover:scale-110 transition-transform" />
        <h2 className="mt-4 font-display text-xl font-bold text-white relative z-10 shadow-black drop-shadow-md">Live Stream Starting Soon</h2>
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live</span>
        </div>
      </GlassPanel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FanMapWidget />
        </div>
        <div className="lg:col-span-1">
          <LiveAlertsFeed />
        </div>
      </div>
    </div>
  )
}
