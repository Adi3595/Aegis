"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Stagger, Slide } from "@/animations"
import { Map, Users, Shield, Train, HeartPulse, Mic, Globe2, Layers, BarChart, Leaf, FileText, Bell } from "lucide-react"

const FEATURES = [
  { icon: Map, title: "AI Navigation", desc: "Dynamic route calculation avoiding congestion." },
  { icon: Users, title: "Crowd Intelligence", desc: "Predictive bottlenecks and density heatmaps." },
  { icon: Shield, title: "Accessibility", desc: "Guaranteed barrier-free physical routing." },
  { icon: Train, title: "Transportation", desc: "Live syncing with city transit schedules." },
  { icon: HeartPulse, title: "Emergency Response", desc: "Instantaneous dispatch of medical and security." },
  { icon: Mic, title: "Voice Assistant", desc: "Natural language query for attendees." },
  { icon: Globe2, title: "Live Translation", desc: "Real-time multilingual support." },
  { icon: Layers, title: "Digital Twin", desc: "Complete 3D spatial awareness." },
  { icon: BarChart, title: "Analytics", desc: "Post-match operational reports." },
  { icon: Leaf, title: "Sustainability", desc: "Power grid optimization via AI." },
  { icon: FileText, title: "Reports", desc: "Automated compliance generation." },
  { icon: Bell, title: "Notifications", desc: "Smart contextual push alerts." },
]

export default function PlatformFeatures() {
  return (
    <div className="container mx-auto px-4 py-32 border-t border-white/10" id="features">
      <Slide direction="up">
        <SectionHeading 
          title="Platform Capabilities" 
          subtitle="A comprehensive suite of intelligence tools designed specifically for mega-event operations."
          align="center"
        />
      </Slide>

      <Stagger delayOrder={0.05} className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.div key={i} whileHover={{ y: -5 }}>
              <GlassPanel className="h-full flex flex-col items-start p-6 group transition-colors hover:bg-white/10 hover:border-white/20 border-white/5 cursor-default">
                <div className="mb-4 text-primary-accent transition-transform duration-300 group-hover:scale-110 group-hover:text-ai-accent">
                  <Icon className="h-8 w-8" />
                </div>
                <h4 className="font-display font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-text flex-grow">{feature.desc}</p>
                
                {/* Micro animation line */}
                <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-primary-accent to-ai-accent transition-all duration-300 group-hover:w-full" />
              </GlassPanel>
            </motion.div>
          )
        })}
      </Stagger>
    </div>
  )
}
