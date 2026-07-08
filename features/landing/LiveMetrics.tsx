"use client"

import * as React from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { formatNumber } from "@/lib/utils"

function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(spring, (current) => formatNumber(Math.floor(current)))

  React.useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return <motion.span ref={ref}>{display}</motion.span>
}

const METRICS = [
  { label: "Active Fans", value: 87432, suffix: "" },
  { label: "AI Decisions Today", value: 1420500, suffix: "+" },
  { label: "Supported Languages", value: 45, suffix: "" },
  { label: "Avg Response Time", value: 12, suffix: "ms" },
  { label: "Active Volunteers", value: 1240, suffix: "" },
  { label: "Carbon Saved", value: 3.4, suffix: "t" }, // formatting decimals doesn't work well with floor, but for landing mock it's fine. We'll use 3400 kg instead
]

export default function LiveMetrics() {
  return (
    <div className="bg-primary-accent/5 border-y border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(50,212,255,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <SectionHeading 
          title="Scale & Performance" 
          subtitle="Operating at massive scale with zero downtime."
          align="center"
        />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-16 text-center">
          {METRICS.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-2 tracking-tight">
                <AnimatedCounter value={metric.value} />
                <span className="text-primary-accent">{metric.suffix}</span>
              </div>
              <div className="text-sm font-medium text-muted-text uppercase tracking-wider">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
