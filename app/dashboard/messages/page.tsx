"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MessageSquare, Construction } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-md flex-col items-center space-y-6 rounded-2xl border border-white/10 bg-surface/50 p-12 backdrop-blur-md"
      >
        <div className="rounded-full bg-primary-accent/20 p-4 relative">
          <MessageSquare className="h-12 w-12 text-primary-accent" />
          <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-ai-accent text-[10px] font-bold text-white">3</span>
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">Secure Comms</h2>
          <p className="text-muted-text">
            End-to-end encrypted messaging across all operational channels is currently being provisioned. Your 3 unread dispatches will be available shortly.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium text-warning">
          <Construction className="h-4 w-4" />
          <span>Provisioning Network...</span>
        </div>
      </motion.div>
    </div>
  )
}
