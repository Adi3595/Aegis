import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatusPillProps {
  label: string
  status?: "online" | "offline" | "warning" | "ai"
  className?: string
  value?: string | number
}

export function StatusPill({ label, status = "online", value, className }: StatusPillProps) {
  const statusColors = {
    online: "bg-success",
    offline: "bg-error",
    warning: "bg-warning",
    ai: "bg-ai-accent"
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white shadow-sm backdrop-blur-md",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", statusColors[status])} />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", statusColors[status])} />
      </span>
      <span>{label}</span>
      {value && <span className="font-mono text-primary-accent">{value}</span>}
    </motion.div>
  )
}
