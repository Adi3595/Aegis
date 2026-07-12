"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { HeartPulse, Stethoscope, Activity, MapPin } from "lucide-react"

export default function MedicalPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-20">
      <SectionHeading title="Medical Triage" subtitle="Live dispatch, patient tracking, and resource management." />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Cases", val: "14", color: "text-error", bg: "bg-error/10", border: "border-error/30" },
          { label: "Units Available", val: "8/12", color: "text-success", bg: "bg-success/10", border: "border-success/30" },
          { label: "Avg Response", val: "2.4m", color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
          { label: "Med Tents Cap", val: "42%", color: "text-primary-accent", bg: "bg-primary-accent/10", border: "border-primary-accent/30" }
        ].map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className={`p-4 border ${stat.border}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-white">{stat.val}</p>
                  <p className="text-xs text-muted-text uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="font-bold text-white mb-4 flex items-center"><Activity className="h-4 w-4 mr-2 text-primary-accent"/> Active Dispatches</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-text uppercase bg-white/5">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Condition</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Unit Assigned</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "MED-112", cond: "Heat Exhaustion", loc: "Concourse C", unit: "Unit 3", stat: "En Route", color: "text-warning" },
                    { id: "MED-111", cond: "Minor Laceration", loc: "Gate A", unit: "Unit 1", stat: "On Scene", color: "text-success" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                      <td className="px-4 py-3 text-white">{row.cond}</td>
                      <td className="px-4 py-3 text-muted-text flex items-center"><MapPin className="h-3 w-3 mr-1"/> {row.loc}</td>
                      <td className="px-4 py-3"><span className="bg-white/10 px-2 py-1 rounded text-xs">{row.unit}</span></td>
                      <td className={`px-4 py-3 font-bold text-xs uppercase ${row.color}`}>{row.stat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 h-full flex flex-col">
            <h3 className="font-bold text-white mb-4 flex items-center"><Stethoscope className="h-4 w-4 mr-2 text-ai-accent"/> Supply Levels</h3>
            <div className="space-y-4 flex-1">
              {[
                { name: "Trauma Kits", val: 85 },
                { name: "Defibrillators", val: 100 },
                { name: "Water/Hydration", val: 32 },
                { name: "First Aid Basics", val: 64 },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-text">{item.name}</span>
                    <span className={`font-mono ${item.val < 40 ? 'text-error' : 'text-success'}`}>{item.val}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.val < 40 ? 'bg-error' : 'bg-success'}`} style={{ width: `${item.val}%` }} />
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
