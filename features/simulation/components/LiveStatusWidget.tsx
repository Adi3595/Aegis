"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import { GlassPanel } from "@/components/ui/glass-panel"

interface LiveStatusWidgetProps {
  title: string
  value: string | number
  trend?: string
  trendUp?: boolean
  icon: LucideIcon
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "ai"
}

export function LiveStatusWidget({ title, value, trend, trendUp, icon: Icon, color = "primary" }: LiveStatusWidgetProps) {
  
  const getColorClasses = () => {
    switch (color) {
      case "primary": return "text-primary-accent"
      case "secondary": return "text-secondary-accent"
      case "success": return "text-success"
      case "warning": return "text-warning"
      case "error": return "text-error"
      case "ai": return "text-ai-accent"
      default: return "text-white"
    }
  }

  return (
    <GlassPanel className="p-5 flex flex-col justify-between relative overflow-hidden group" interactive>
      {/* Subtle background glow effect based on color */}
      <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full blur-2xl opacity-10 ${getColorClasses().replace('text-', 'bg-')} group-hover:opacity-20 transition-opacity`} />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <span className="text-sm font-medium text-muted-text">{title}</span>
        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors">
          <Icon className={`h-4 w-4 ${getColorClasses()}`} />
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="font-display text-3xl font-bold text-white mb-1 transition-all">
          {value}
        </div>
        {trend && (
          <div className={`text-xs ${trendUp ? 'text-success' : 'text-warning'}`}>
            {trend}
          </div>
        )}
      </div>
    </GlassPanel>
  )
}
