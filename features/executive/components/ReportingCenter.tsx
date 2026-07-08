"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { FileText, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

const REPORTS = [
  { id: 1, title: "Executive Operations Summary", date: "Today", type: "PDF" },
  { id: 2, title: "Sustainability & ESG Metrics", date: "Today", type: "PDF" },
  { id: 3, title: "Raw Incident Logs", date: "Today", type: "CSV" },
  { id: 4, title: "AI Recommendations History", date: "Today", type: "JSON" },
]

export function ReportingCenter() {
  return (
    <GlassPanel className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-white" />
          <h3 className="font-semibold text-white">Reporting Center</h3>
        </div>
        <Button variant="outline" size="sm" className="h-8 border-white/10 text-xs">
          <Filter className="w-3.5 h-3.5 mr-1" /> Filter
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 hide-scrollbar">
        {REPORTS.map(r => (
          <div key={r.id} className="p-4 bg-surface border border-white/5 rounded-xl flex items-center justify-between group hover:border-white/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`px-2 py-1 rounded text-[10px] font-bold ${r.type === 'PDF' ? 'bg-error/20 text-error' : r.type === 'CSV' ? 'bg-success/20 text-success' : 'bg-blue-400/20 text-blue-400'}`}>
                {r.type}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{r.title}</h4>
                <div className="text-xs text-muted-text">Generated: {r.date}</div>
              </div>
            </div>
            <Button variant="glass" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Download className="w-4 h-4 text-white" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 shrink-0">
        <Button className="w-full bg-white text-black hover:bg-white/90">
          Generate Custom Report
        </Button>
      </div>
    </GlassPanel>
  )
}
