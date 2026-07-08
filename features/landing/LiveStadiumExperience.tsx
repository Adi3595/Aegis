"use client"

import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { StatCard } from "@/components/ui/stat-card"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Slide, Fade } from "@/animations"
import { Users, DoorOpen, Clock, Car, Cloud, Stethoscope, HeartHandshake } from "lucide-react"
import { motion } from "framer-motion"

const LIVE_DATA = [
  { title: "Crowd Density", value: 82, suffix: "%", trend: -2, icon: <Users className="h-5 w-5" /> },
  { title: "Open Gates", value: 14, suffix: "/16", icon: <DoorOpen className="h-5 w-5" /> },
  { title: "Queue Times", value: 4.2, suffix: "m", trend: -15, icon: <Clock className="h-5 w-5" /> },
  { title: "Parking", value: 94, suffix: "%", trend: 5, icon: <Car className="h-5 w-5" /> },
]

export default function LiveStadiumExperience() {
  return (
    <div className="container mx-auto px-4 py-32" id="simulation">
      <Slide direction="up">
        <SectionHeading 
          title="Live Stadium Experience" 
          subtitle="Real-time telemetry from every corner of the stadium, powered by advanced IoT sensors and computer vision, unified into a single command center."
        />
      </Slide>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: Info Panel */}
        <div className="flex flex-col space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LIVE_DATA.map((stat, i) => (
              <Slide key={i} direction="up" delay={0.1 * i}>
                <StatCard 
                  title={stat.title}
                  value={stat.value}
                  suffix={stat.suffix}
                  trend={stat.trend}
                  icon={stat.icon}
                />
              </Slide>
            ))}
          </div>

          <Fade delay={0.5}>
            <GlassPanel interactive className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ai-accent/20 text-ai-accent">
                  <Cloud className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Weather Engine</div>
                  <div className="text-xs text-muted-text">Clear skies, 24°C, Wind 12km/h</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-success">CONNECTED</div>
              </div>
            </GlassPanel>
          </Fade>
          
          <Fade delay={0.6}>
            <GlassPanel interactive className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error/20 text-error">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Medical Status</div>
                  <div className="text-xs text-muted-text">3 Minor incidents in Sector B</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-warning">RESOLVING</div>
              </div>
            </GlassPanel>
          </Fade>

          <Fade delay={0.7}>
            <GlassPanel interactive className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-accent/20 text-primary-accent">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Volunteer Activity</div>
                  <div className="text-xs text-muted-text">142 Active, 12 Redeploying</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-success">OPTIMAL</div>
              </div>
            </GlassPanel>
          </Fade>
        </div>

        {/* Right: Visualization Placeholder */}
        <Slide direction="left" delay={0.2} className="h-[400px] lg:h-auto">
          <GlassPanel interactive className="relative h-full w-full overflow-hidden flex items-center justify-center group border-white/10">
            {/* Ambient animated glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(50,212,255,0.1),transparent_70%)] group-hover:bg-[radial-gradient(ellipse_at_center,rgba(50,212,255,0.2),transparent_70%)] transition-colors duration-700" />
            
            {/* Grid background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxSDB6TTAgMHY0MGgxVjB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

            {/* Radar Sweep Effect */}
            <motion.div 
              className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-accent/20 bg-gradient-to-tr from-transparent via-primary-accent/10 to-transparent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
            
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <div className="mb-4 h-16 w-16 rounded-full border-2 border-primary-accent/50 border-t-primary-accent animate-spin" />
              <h3 className="font-display text-xl font-bold text-white">Live Digital Twin</h3>
              <p className="mt-2 text-sm text-muted-text max-w-[250px]">
                3D Interactive Visualization connecting to rendering engine...
              </p>
            </div>
          </GlassPanel>
        </Slide>
      </div>
    </div>
  )
}
