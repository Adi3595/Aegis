"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

export default function ExecutivePage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-20">
      <SectionHeading title="Executive Overview" subtitle="High-level KPIs, revenue metrics, and operational health." />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", val: "$2.4M", icon: DollarSign, color: "text-success", trend: "+14%" },
          { label: "Attendance", val: "84,291", icon: Users, color: "text-primary-accent", trend: "+2%" },
          { label: "F&B Sales", val: "$892K", icon: TrendingUp, color: "text-ai-accent", trend: "+8%" },
          { label: "Ops Health", val: "99.9%", icon: Activity, color: "text-warning", trend: "Optimal" }
        ].map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono text-success flex items-center">{stat.trend}</span>
              </div>
              <p className="text-3xl font-display font-bold text-white">{stat.val}</p>
              <p className="text-sm text-muted-text mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <motion.div variants={item}>
          <Card className="p-6 h-[400px] flex flex-col items-center justify-center border border-dashed border-white/10 bg-black/20">
            <p className="text-sm font-mono text-muted-text">Financial Projection Chart Rendering...</p>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="p-6 h-[400px] flex flex-col items-center justify-center border border-dashed border-white/10 bg-black/20">
            <p className="text-sm font-mono text-muted-text">Global Sentiment Analysis Map Rendering...</p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
