"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Activity, Battery, Zap } from "lucide-react"

export default function AnalyticsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <motion.div 
      className="space-y-6 pb-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <SectionHeading 
          title="Global Analytics" 
          subtitle="Real-time predictive models and historical telemetry data."
        />
        <div className="flex gap-2">
          <select className="bg-surface border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-accent">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Live Event</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item}>
          <Card className="p-6 h-full flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary-accent/10 text-primary-accent">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-xs font-mono text-success flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> +12%</span>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-white">84,291</p>
              <p className="text-sm text-muted-text mt-1">Total Attendance</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 h-full flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-ai-accent/10 text-ai-accent">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xs font-mono text-warning flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> +3%</span>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-white">92.4%</p>
              <p className="text-sm text-muted-text mt-1">Sentiment Score</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 h-full flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-success/10 text-success">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-xs font-mono text-success flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> Optimal</span>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-white">2.4m</p>
              <p className="text-sm text-muted-text mt-1">Agent Inferences/sec</p>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center"><BarChart3 className="h-4 w-4 mr-2 text-primary-accent"/> Predictive Crowd Flow</h3>
            <div className="h-[300px] flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-black/20">
              <p className="text-muted-text text-sm font-mono">Chart Rendering Engine Initializing...</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center"><Battery className="h-4 w-4 mr-2 text-ai-accent"/> Resource Utilization</h3>
            <div className="space-y-4">
              {[
                { name: 'Compute Nodes', usage: 78, color: 'bg-primary-accent' },
                { name: 'Memory Allocation', usage: 64, color: 'bg-ai-accent' },
                { name: 'Network Bandwidth', usage: 42, color: 'bg-success' },
                { name: 'Edge Devices', usage: 91, color: 'bg-warning' },
              ].map(stat => (
                <div key={stat.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-text">{stat.name}</span>
                    <span className="font-mono">{stat.usage}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${stat.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.usage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
