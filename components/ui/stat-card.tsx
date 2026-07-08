import * as React from "react"
import { motion } from "framer-motion"
import { cn, formatNumber } from "@/lib/utils"
import { GlassPanel } from "./glass-panel"

interface StatCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  trend?: number
  icon?: React.ReactNode
  className?: string
}

export function StatCard({
  title,
  value,
  prefix = "",
  suffix = "",
  trend,
  icon,
  className
}: StatCardProps) {
  return (
    <GlassPanel interactive className={cn("flex flex-col space-y-4", className)}>
      <div className="flex items-center justify-between text-muted-text">
        <span className="text-sm font-medium uppercase tracking-wider font-mono">{title}</span>
        {icon && <div className="text-primary-accent">{icon}</div>}
      </div>
      
      <div className="flex items-baseline space-x-2">
        {prefix && <span className="text-2xl font-bold text-white/70">{prefix}</span>}
        <motion.span 
          className="text-4xl font-display font-bold text-white tracking-tight"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        >
          {formatNumber(value)}
        </motion.span>
        {suffix && <span className="text-xl font-medium text-white/70">{suffix}</span>}
      </div>

      {trend !== undefined && (
        <div className="mt-2 flex items-center text-sm">
          <span className={cn("font-medium flex items-center", trend >= 0 ? "text-success" : "text-error")}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
          <span className="ml-2 text-muted-text">vs last match</span>
        </div>
      )}
    </GlassPanel>
  )
}
