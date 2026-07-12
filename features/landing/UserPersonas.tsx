"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Slide, Stagger } from "@/animations"
import { User, Shield, Stethoscope, Store, HeartHandshake, Briefcase } from "lucide-react"

const PERSONAS = [
  { id: "fan", role: "Fan", icon: User, desc: "Personalized navigation, instant food ordering, and live match updates straight to their device.", color: "text-primary-accent", glow: "hover:shadow-[0_0_30px_rgba(50,212,255,0.3)]" },
  { id: "organizer", role: "Organizer", icon: Briefcase, desc: "Bird's-eye view of all stadium operations, crowd flows, and AI-driven predictive alerts.", color: "text-ai-accent", glow: "hover:shadow-[0_0_30px_rgba(124,92,255,0.3)]" },
  { id: "security", role: "Security", icon: Shield, desc: "Instant emergency routing, threat detection highlights, and coordinated squad deployment.", color: "text-warning", glow: "hover:shadow-[0_0_30px_rgba(249,199,79,0.3)]" },
  { id: "medical", role: "Medical", icon: Stethoscope, desc: "Live incident tracking, optimal routing for stretchers, and incoming patient data.", color: "text-error", glow: "hover:shadow-[0_0_30px_rgba(255,93,115,0.3)]" },
  { id: "volunteer", role: "Volunteer", icon: HeartHandshake, desc: "Dynamic task assignments, translation assistance, and localized crowd management directives.", color: "text-success", glow: "hover:shadow-[0_0_30px_rgba(0,210,106,0.3)]" },
  { id: "vendor", role: "Vendor", icon: Store, desc: "Predictive inventory alerts, live queue times at their stand, and dynamic pricing recommendations.", color: "text-secondary-accent", glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]" },
]

export default function UserPersonas() {
  return (
    <div className="container mx-auto px-4 py-32 border-t border-white/10" id="about">
      <Slide direction="up">
        <SectionHeading 
          title="Tailored Intelligence" 
          subtitle="AEGIS adapts its interface and insights based on who is using it, ensuring everyone has exactly the tools they need."
          align="center"
        />
      </Slide>

      <Stagger delayOrder={0.1} className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PERSONAS.map((persona) => {
          const Icon = persona.icon
          return (
            <motion.div
              key={persona.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer h-full"
            >
              <GlassPanel className={`h-full flex flex-col p-6 transition-all duration-500 ${persona.glow} border-white/5 group-hover:border-white/20 group-hover:bg-white/10`}>
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl panel-glass ${persona.color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{persona.role}</h3>
                <p className="text-muted-text text-sm mb-6 flex-grow">{persona.desc}</p>
                
                {/* Simulated Preview Panel (Reveals on hover via max-height transition or opacity) */}
                <div className="overflow-hidden rounded-lg bg-primary-bg/50 border border-white/5 opacity-50 group-hover:opacity-100 transition-opacity duration-300 relative h-[100px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-bg to-transparent z-10" />
                  <div className="p-3">
                    <div className="h-2 w-1/3 bg-white/20 rounded-full mb-3" />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded-full" />
                      <div className="h-2 w-5/6 bg-white/10 rounded-full" />
                      <div className="h-2 w-4/6 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          )
        })}
      </Stagger>
    </div>
  )
}
