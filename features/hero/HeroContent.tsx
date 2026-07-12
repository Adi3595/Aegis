"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/ui/status-pill"
import { MagneticButton } from "@/animations/advanced"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Users, ShieldAlert, Cloud, Car, Activity, Stethoscope, HeartHandshake, Train } from "lucide-react"

const FLOATING_CARDS = [
  { icon: Users, label: "Crowd Density", value: "82%", top: "15%", left: "5%", delay: 0 },
  { icon: ShieldAlert, label: "Gate Status", value: "Optimal", top: "60%", left: "8%", delay: 0.2 },
  { icon: Cloud, label: "Weather", value: "Clear", top: "20%", right: "8%", delay: 0.4 },
  { icon: Car, label: "Parking", value: "94% Full", top: "65%", right: "5%", delay: 0.6 },
  { icon: Activity, label: "Emergency", value: "Standby", top: "40%", left: "15%", delay: 0.8 },
  { icon: Stethoscope, label: "Medical", value: "All Clear", top: "80%", left: "25%", delay: 1.0 },
  { icon: HeartHandshake, label: "Volunteer", value: "Active", top: "35%", right: "15%", delay: 1.2 },
  { icon: Train, label: "Transport", value: "On Time", top: "75%", right: "20%", delay: 1.4 },
]

export function HeroContent() {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 pt-16">
      
      {/* Floating Cards (Hidden on mobile for clarity/performance, visible on large screens) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {FLOATING_CARDS.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: card.top, left: card.left, right: card.right }}
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, Math.random() * 2 - 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.delay,
              }}
            >
              <GlassPanel className="flex items-center space-x-3 p-3 text-xs shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <Icon className="h-4 w-4 text-primary-accent" />
                <div className="flex flex-col">
                  <span className="text-muted-text">{card.label}</span>
                  <span className="font-semibold text-white">{card.value}</span>
                </div>
              </GlassPanel>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pointer-events-auto flex max-w-4xl flex-col items-center text-center"
      >
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <StatusPill label="87,000 Fans Connected" status="online" />
          <StatusPill label="16 AI Agents Active" status="ai" />
          <StatusPill label="Digital Twin Online" status="online" />
          <StatusPill label="Real-Time Crowd Intelligence" status="ai" />
        </div>

        <motion.h1 
          className="mb-6 font-display text-5xl font-extrabold tracking-tighter text-white sm:text-7xl md:text-8xl drop-shadow-[0_0_40px_rgba(50,212,255,0.4)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          AEGIS
        </motion.h1>

        <motion.h2 
          className="mb-6 font-mono text-lg font-semibold tracking-[0.2em] text-white/70 md:text-xl uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          AI STADIUM INTELLIGENCE PLATFORM
        </motion.h2>

        <motion.p 
          className="mb-10 max-w-2xl text-lg text-muted-text/90 md:text-xl leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          Powering smarter, safer, and more connected stadium experiences for FIFA World Cup 2026 through real-time intelligence and Generative AI.
        </motion.p>

        <motion.div 
          className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <MagneticButton>
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto relative group overflow-hidden">
                <span className="relative z-10">Launch Experience</span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[ripple_1s_ease-in-out_infinite]" />
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/dashboard/simulation" className="w-full sm:w-auto">
              <Button variant="glass" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                Watch Live Simulation
              </Button>
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </div>
  )
}
