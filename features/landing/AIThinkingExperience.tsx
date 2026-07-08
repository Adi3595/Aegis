"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Fade, Slide, Stagger } from "@/animations"
import { Brain, ArrowDown, Sparkles, Check, ChevronRight } from "lucide-react"

const WORKFLOW = [
  { step: "Fan Request", desc: "Find fastest route to Gate D with wheelchair access." },
  { step: "AI Orchestrator", desc: "Analyzing intent and dispatching to specialized agents." },
  { step: "Navigation Agent", desc: "Mapping optimal physical paths in the stadium topology." },
  { step: "Crowd Agent", desc: "Detecting bottleneck at Concourse B, adding 5 min delay." },
  { step: "Accessibility Agent", desc: "Verifying Elevator 4 is operational and clear." },
  { step: "Weather Agent", desc: "Heavy rain forecasted near Gate A in 15 minutes." },
  { step: "Final Recommendation", desc: "Optimal route generated." },
]

function CircularProgress({ value }: { value: number }) {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
        <circle
          className="text-white/10"
          strokeWidth="6"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <motion.circle
          className="text-ai-accent"
          strokeWidth="6"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-xl font-bold text-white">{value}%</span>
      </div>
    </div>
  )
}

export default function AIThinkingExperience() {
  const [expanded, setExpanded] = React.useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-32 border-t border-white/10">
      <Slide direction="up">
        <SectionHeading 
          title="Transparent AI Reasoning" 
          subtitle="Watch how the Multi-Agent system collaborates in milliseconds to generate safe and optimized recommendations."
          align="center"
        />
      </Slide>

      <div className="mx-auto mt-16 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Timeline / Workflow */}
          <div className="md:col-span-7">
            <Stagger delayOrder={0.2} className="space-y-4">
              {WORKFLOW.map((item, i) => (
                <div key={i} className="flex flex-col">
                  <motion.div 
                    className="flex cursor-pointer items-start space-x-4"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/20 ${i === 0 || i === WORKFLOW.length - 1 ? "bg-primary-accent text-primary-bg" : "bg-surface text-ai-accent"}`}>
                        {i === 0 ? <Brain className="h-5 w-5" /> : i === WORKFLOW.length - 1 ? <Check className="h-5 w-5" /> : <Sparkles className="h-4 w-4" />}
                      </div>
                      {i !== WORKFLOW.length - 1 && (
                        <div className="h-8 w-[2px] bg-white/10 my-1" />
                      )}
                    </div>
                    <GlassPanel className="flex-1 p-4 transition-colors hover:bg-white/10">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-semibold text-white">{item.step}</h4>
                        <ChevronRight className={`h-4 w-4 text-muted-text transition-transform ${expanded === i ? "rotate-90" : ""}`} />
                      </div>
                      
                      {/* Expandable Reasoning */}
                      <motion.div 
                        initial={false}
                        animate={{ height: expanded === i ? "auto" : 0, opacity: expanded === i ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-sm text-muted-text border-t border-white/10 pt-2">
                          {item.desc}
                        </p>
                      </motion.div>
                    </GlassPanel>
                  </motion.div>
                </div>
              ))}
            </Stagger>
          </div>

          {/* Reasoning Conclusion Panel */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-32">
              <Slide direction="left" delay={0.8}>
                <GlassPanel interactive className="p-8 border-primary-accent/30 bg-primary-accent/5">
                  <h3 className="font-display text-xl font-bold text-white mb-6">Final Output Generated</h3>
                  
                  <div className="space-y-4 text-sm text-muted-text mb-8">
                    <p className="text-white font-medium text-base">Recommended Gate D because:</p>
                    <ul className="space-y-2 font-mono">
                      <li className="flex items-center"><Check className="h-4 w-4 text-success mr-2" /> Lowest queue (4m wait)</li>
                      <li className="flex items-center"><Check className="h-4 w-4 text-success mr-2" /> Elevator 4 operational</li>
                      <li className="flex items-center"><Check className="h-4 w-4 text-success mr-2" /> Avoids Gate A rain cell</li>
                      <li className="flex items-center"><Check className="h-4 w-4 text-success mr-2" /> Walking time -8 mins</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">Confidence Score</span>
                      <span className="text-xs text-muted-text">Based on 14 data sources</span>
                    </div>
                    <CircularProgress value={96} />
                  </div>
                </GlassPanel>
              </Slide>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
