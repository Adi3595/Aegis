"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { FileText, Download, Filter, Search, MoreVertical } from "lucide-react"

export default function ReportsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const reports = [
    { id: "AAR-2026-04-12", title: "Crowd Surge Incident Analysis", date: "2026-04-12", status: "Finalized", type: "After Action" },
    { id: "LOG-2026-04-11", title: "Daily Operations Telemetry", date: "2026-04-11", status: "Archived", type: "System Log" },
    { id: "SEC-2026-04-10", title: "Security Perimeter Breach Report", date: "2026-04-10", status: "Pending Review", type: "Security" },
    { id: "MED-2026-04-09", title: "Medical Dispatch Summaries", date: "2026-04-09", status: "Finalized", type: "Medical" },
    { id: "AAR-2026-04-08", title: "Evacuation Protocol Drill", date: "2026-04-08", status: "Finalized", type: "After Action" },
  ]

  return (
    <motion.div 
      className="space-y-6 pb-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <SectionHeading 
          title="Intelligence Reports" 
          subtitle="Access and export after-action reports and operational logs."
        />
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-surface border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white hover:bg-white/5 transition-colors">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-primary-accent text-primary-bg font-medium rounded-lg px-3 py-1.5 text-sm hover:brightness-110 transition-all">
            <Download className="h-4 w-4" /> Export All
          </button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border border-white/10">
        <div className="p-4 border-b border-white/10 bg-black/20 flex items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-text" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-full bg-surface border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary-accent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-text uppercase bg-white/5">
              <tr>
                <th className="px-6 py-3 font-medium">Report ID</th>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, i) => (
                <motion.tr 
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-xs">{report.id}</td>
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary-accent" />
                    {report.title}
                  </td>
                  <td className="px-6 py-4 text-muted-text">{report.type}</td>
                  <td className="px-6 py-4 text-muted-text">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      report.status === 'Finalized' ? 'bg-success/10 text-success' : 
                      report.status === 'Archived' ? 'bg-white/10 text-white/70' : 
                      'bg-warning/10 text-warning'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-text hover:text-white transition-colors p-1">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  )
}
