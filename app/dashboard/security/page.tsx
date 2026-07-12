"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { ShieldAlert, Video, Radio, AlertTriangle } from "lucide-react"

export default function SecurityPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-20">
      <div className="flex justify-between items-end">
        <SectionHeading title="Security Operations" subtitle="Incident response, perimeter control, and CCTV grid." />
        <div className="bg-error/20 text-error px-4 py-2 rounded-lg font-bold text-sm border border-error/30 flex items-center animate-pulse">
          <AlertTriangle className="h-4 w-4 mr-2" />
          THREAT LEVEL: ELEVATED
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="font-bold text-white mb-4 flex items-center"><Video className="h-4 w-4 mr-2 text-primary-accent"/> CCTV Grid</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[1,2,3,4,5,6].map(cam => (
                <div key={cam} className="aspect-video bg-black rounded border border-white/10 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
                    <span className="text-[8px] text-white font-mono">CAM {cam}</span>
                  </div>
                  <Video className="h-6 w-6 text-white/10 group-hover:text-white/30 transition-colors" />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-white mb-4 flex items-center"><ShieldAlert className="h-4 w-4 mr-2 text-error"/> Active Incidents</h3>
            <div className="space-y-3">
              {[
                { id: "INC-829", desc: "Unauthorized entry attempt", loc: "Gate D", time: "2 min ago" },
                { id: "INC-828", desc: "Crowd density critical", loc: "Sector 4", time: "12 min ago" },
              ].map(inc => (
                <div key={inc.id} className="p-3 rounded-lg border border-error/20 bg-error/5">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-xs font-bold text-error">{inc.id}</span>
                    <span className="text-[10px] text-muted-text">{inc.time}</span>
                  </div>
                  <p className="text-sm text-white mb-1">{inc.desc}</p>
                  <p className="text-xs text-muted-text flex items-center"><Radio className="h-3 w-3 mr-1" /> {inc.loc}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
