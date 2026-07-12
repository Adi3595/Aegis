"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[80vh] w-full">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="relative flex items-center justify-center h-16 w-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-primary-accent animate-spin" />
          <Loader2 className="h-6 w-6 text-ai-accent animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-sm font-mono text-primary-accent mb-1 animate-pulse">ESTABLISHING UPLINK</p>
          <p className="text-xs text-muted-text">Initializing workspace...</p>
        </div>
      </motion.div>
    </div>
  )
}
