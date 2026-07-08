"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Slide, Stagger } from "@/animations"
import { Monitor, Layers, Server, Brain, Database, Map as MapIcon, Cloud } from "lucide-react"

const ARCHITECTURE = [
  { group: "Client", items: [{ name: "Browser", icon: Monitor, color: "text-white" }] },
  { group: "Frontend", items: [{ name: "Next.js", icon: Layers, color: "text-primary-accent" }] },
  { group: "Backend", items: [{ name: "FastAPI", icon: Server, color: "text-success" }] },
  { group: "AI Engine", items: [{ name: "LangGraph", icon: Brain, color: "text-ai-accent" }, { name: "Azure OpenAI", icon: Brain, color: "text-ai-accent" }] },
  { group: "Data Layer", items: [{ name: "Azure AI Search", icon: Database, color: "text-secondary-accent" }, { name: "PostgreSQL", icon: Database, color: "text-secondary-accent" }, { name: "Redis", icon: Database, color: "text-secondary-accent" }] },
  { group: "Integrations", items: [{ name: "Mapbox", icon: MapIcon, color: "text-warning" }, { name: "IoT Sensors", icon: Server, color: "text-warning" }] },
  { group: "Infrastructure", items: [{ name: "Azure Cloud", icon: Cloud, color: "text-primary-accent" }] },
]

export default function TechnologyArchitecture() {
  return (
    <div className="container mx-auto px-4 py-32 border-t border-white/10" id="technology">
      <Slide direction="up">
        <SectionHeading 
          title="Enterprise Architecture" 
          subtitle="Built on a scalable, highly available tech stack designed to process millions of concurrent events in real-time."
          align="center"
        />
      </Slide>

      <div className="mt-20 flex flex-col items-center">
        <Stagger delayOrder={0.2} className="w-full max-w-4xl flex flex-col space-y-2">
          {ARCHITECTURE.map((layer, i) => (
            <React.Fragment key={i}>
              <motion.div className="flex flex-col md:flex-row items-center w-full justify-between gap-4 p-4 rounded-2xl bg-surface/30 border border-white/5 relative overflow-hidden group">
                
                {/* Data flow animated background */}
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                  animate={{ x: ["-100%", "800%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.2 }}
                />

                <div className="text-sm font-mono font-bold text-muted-text md:w-1/4 text-center md:text-left">
                  {layer.group.toUpperCase()}
                </div>
                
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:w-3/4">
                  {layer.items.map((item, j) => {
                    const Icon = item.icon
                    return (
                      <GlassPanel key={j} className="flex items-center space-x-2 py-2 px-4 border-white/10">
                        <Icon className={`h-4 w-4 ${item.color}`} />
                        <span className="text-sm font-medium text-white">{item.name}</span>
                      </GlassPanel>
                    )
                  })}
                </div>
              </motion.div>
              
              {/* Connecting Line */}
              {i < ARCHITECTURE.length - 1 && (
                <div className="flex justify-center w-full">
                  <div className="h-6 w-px bg-white/20 relative overflow-hidden">
                     <motion.div 
                        className="absolute inset-0 bg-primary-accent"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: i * 0.2 }}
                     />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </Stagger>
      </div>
    </div>
  )
}
