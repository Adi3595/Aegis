"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { Play, Activity, Map, Video } from "lucide-react"

export default function FanLivePage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="space-y-6 pb-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <SectionHeading 
        title="Live Match Center" 
        subtitle="Real-time statistics, camera feeds, and AR overlays."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden relative group aspect-video">
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <Video className="h-12 w-12 text-white/20" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
                </span>
                <span className="text-xs font-bold text-white uppercase tracking-wider bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Live Feed</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <button className="bg-primary-accent text-primary-bg rounded-full p-3 hover:scale-105 transition-transform">
                <Play className="h-6 w-6" fill="currentColor" />
              </button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-white mb-4 flex items-center"><Activity className="h-4 w-4 mr-2 text-primary-accent"/> Live Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Possession", val1: "62%", val2: "38%", team1: "Home", team2: "Away" },
                { label: "Shots", val1: "14", val2: "6", team1: "Home", team2: "Away" },
                { label: "Passes", val1: "421", val2: "205", team1: "Home", team2: "Away" },
                { label: "Fouls", val1: "3", val2: "8", team1: "Home", team2: "Away" },
              ].map(stat => (
                <div key={stat.label} className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <p className="text-xs text-muted-text uppercase tracking-wider mb-2">{stat.label}</p>
                  <div className="flex justify-between items-center px-2">
                    <span className="font-bold text-primary-accent">{stat.val1}</span>
                    <span className="text-white/20">-</span>
                    <span className="font-bold text-white">{stat.val2}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          <Card className="p-6 h-[300px] flex flex-col items-center justify-center border border-dashed border-white/10 bg-black/20">
            <Map className="h-8 w-8 text-white/30 mb-2" />
            <p className="text-sm font-mono text-muted-text">3D Stadium Map Rendering...</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-white mb-4">Match Timeline</h3>
            <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-white/10">
              {[
                { min: "45'", text: "Goal! Home Team scores", type: "goal" },
                { min: "32'", text: "Yellow Card - Away Team", type: "card" },
                { min: "15'", text: "Shot on target saved", type: "event" },
                { min: "0'", text: "Match Started", type: "event" },
              ].map((event, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 shrink-0 ${
                    event.type === 'goal' ? 'bg-success text-success-bg' :
                    event.type === 'card' ? 'bg-warning text-warning-bg' :
                    'bg-surface border border-white/20 text-muted-text'
                  }`}>
                    {event.min}
                  </div>
                  <p className={`text-sm pt-0.5 ${event.type === 'event' ? 'text-muted-text' : 'text-white'}`}>{event.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
