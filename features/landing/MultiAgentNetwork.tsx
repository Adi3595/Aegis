"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Slide } from "@/animations"
import { Brain, Settings2, Shield, Users, Globe2, Activity, Stethoscope, Store, Train, BarChart } from "lucide-react"

const AGENTS = [
  { id: "nav", icon: Settings2, label: "Navigation", angle: 0 },
  { id: "acc", icon: Shield, label: "Accessibility", angle: 36 },
  { id: "emg", icon: Activity, label: "Emergency", angle: 72 },
  { id: "crw", icon: Users, label: "Crowd", angle: 108 },
  { id: "trn", icon: Globe2, label: "Translation", angle: 144 },
  { id: "opr", icon: Settings2, label: "Operations", angle: 180 },
  { id: "med", icon: Stethoscope, label: "Medical", angle: 216 },
  { id: "foo", icon: Store, label: "Food", angle: 252 },
  { id: "tra", icon: Train, label: "Transport", angle: 288 },
  { id: "ana", icon: BarChart, label: "Analytics", angle: 324 },
]

export default function MultiAgentNetwork() {
  return (
    <div className="container mx-auto px-4 py-32 border-t border-white/10 overflow-hidden" id="technology">
      <Slide direction="up">
        <SectionHeading 
          title="Multi-Agent Network" 
          subtitle="A swarm of specialized Generative AI agents communicating continuously to manage stadium operations."
          align="center"
        />
      </Slide>

      <div className="relative mx-auto mt-20 h-[500px] w-full max-w-[800px] sm:h-[600px]">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="-400 -300 800 600">
          {AGENTS.map((agent, i) => {
            const rad = (agent.angle * Math.PI) / 180
            const radius = window.innerWidth < 640 ? 140 : 220
            const x = Math.cos(rad) * radius
            const y = Math.sin(rad) * radius
            
            return (
              <g key={i}>
                {/* Static faint line */}
                <line x1="0" y1="0" x2={x} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                {/* Animated data packet */}
                <motion.circle
                  r="2"
                  fill="#32D4FF"
                  initial={{ cx: 0, cy: 0, opacity: 0 }}
                  animate={{ cx: x, cy: y, opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 1.5 + Math.random(), 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    ease: "easeOut"
                  }}
                />
              </g>
            )
          })}
        </svg>

        {/* Central Orchestrator */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div 
            className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-ai-accent/30 bg-primary-bg/80 backdrop-blur-md shadow-[0_0_40px_rgba(124,92,255,0.3)]"
            animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(124,92,255,0.2)", "0 0 50px rgba(124,92,255,0.6)", "0 0 20px rgba(124,92,255,0.2)"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Brain className="h-10 w-10 text-ai-accent" />
          </motion.div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-bold text-white">
            Orchestrator
          </div>
        </div>

        {/* Surrounding Agents */}
        {AGENTS.map((agent, i) => {
          const rad = (agent.angle * Math.PI) / 180
          const Icon = agent.icon
          // Handle responsive radius via CSS vars or percentage (using a simple styled wrapper here)
          return (
            <motion.div 
              key={agent.id}
              className="absolute left-1/2 top-1/2 z-20 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, type: "spring", bounce: 0.5 }}
              style={{
                transform: `translate(-50%, -50%) translate(calc(cos(${rad}rad) * var(--radius)), calc(sin(${rad}rad) * var(--radius)))`,
                // @ts-ignore
                "--radius": "min(35vw, 220px)"
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-accent/30 bg-surface text-primary-accent shadow-lg transition-transform hover:scale-110 cursor-pointer">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-2 whitespace-nowrap text-xs font-medium text-muted-text bg-primary-bg/80 px-2 rounded-md">
                {agent.label}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
