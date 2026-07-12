"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { Calendar, CheckCircle, MapPin, Clock } from "lucide-react"

export default function VolunteerPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-20">
      <SectionHeading title="Volunteer Operations" subtitle="Your current shift details and assignments." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item} className="md:col-span-2 space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary-accent/10 to-transparent border-primary-accent/30">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Current Assignment</h3>
                <p className="text-sm text-primary-accent">Sector 4 - Concourse D</p>
              </div>
              <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
                Active Shift
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black/20"><Clock className="h-4 w-4 text-muted-text" /></div>
                <div>
                  <p className="text-xs text-muted-text">Shift Time</p>
                  <p className="text-sm font-medium text-white">14:00 - 22:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black/20"><MapPin className="h-4 w-4 text-muted-text" /></div>
                <div>
                  <p className="text-xs text-muted-text">Zone Supervisor</p>
                  <p className="text-sm font-medium text-white">Sarah Jenkins</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-white mb-4">Task Checklist</h3>
            <div className="space-y-3">
              {[
                { task: "Check-in at Volunteer HQ", done: true },
                { task: "Collect Radio & Credentials", done: true },
                { task: "Report to Sector 4 Post", done: true },
                { task: "Assist with crowd flow during halftime", done: false },
                { task: "Post-match sector sweep", done: false },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5">
                  <button className={`w-5 h-5 rounded flex items-center justify-center border ${task.done ? 'bg-success border-success' : 'border-white/20'}`}>
                    {task.done && <CheckCircle className="h-4 w-4 text-black" />}
                  </button>
                  <span className={`text-sm ${task.done ? 'text-muted-text line-through' : 'text-white'}`}>{task.task}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-white mb-4 flex items-center"><Calendar className="h-4 w-4 mr-2 text-ai-accent"/> Upcoming Shifts</h3>
            <div className="space-y-4">
              {[
                { date: "Oct 24", time: "10:00 - 18:00", event: "Group Stage Match 3" },
                { date: "Oct 28", time: "14:00 - 22:00", event: "Quarter Finals" },
              ].map((shift, i) => (
                <div key={i} className="p-3 rounded-lg border border-white/5 bg-black/20">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-white">{shift.date}</span>
                    <span className="text-xs text-muted-text font-mono">{shift.time}</span>
                  </div>
                  <p className="text-xs text-muted-text">{shift.event}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
