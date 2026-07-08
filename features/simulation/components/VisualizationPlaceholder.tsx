"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import { GlassPanel } from "@/components/ui/glass-panel"

interface VisualizationPlaceholderProps {
  title: string
  description: string
  icon: LucideIcon
  minHeight?: string
  color?: "primary" | "ai" | "warning" | "error"
}

export function VisualizationPlaceholder({ 
  title, 
  description, 
  icon: Icon, 
  minHeight = "min-h-[300px]",
  color = "primary"
}: VisualizationPlaceholderProps) {

  const getColorClasses = () => {
    switch (color) {
      case "primary": return "text-primary-accent"
      case "ai": return "text-ai-accent"
      case "warning": return "text-warning"
      case "error": return "text-error"
      default: return "text-white/20"
    }
  }

  return (
    <GlassPanel className={`p-6 ${minHeight} flex flex-col items-center justify-center border-dashed border-white/20 bg-white/5 relative overflow-hidden group`}>
      {/* Background ambient glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10 flex flex-col items-center">
        <Icon className={`h-12 w-12 mb-4 opacity-50 group-hover:opacity-100 transition-opacity ${getColorClasses()}`} />
        <h3 className="font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-muted-text text-center max-w-sm">
          {description}
        </p>
      </div>

      {/* Decorative corner markers */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/30" />
      <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/30" />
      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/30" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/30" />
    </GlassPanel>
  )
}
