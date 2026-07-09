"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Settings, Construction } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-md flex-col items-center space-y-6 rounded-2xl border border-white/10 bg-surface/50 p-12 backdrop-blur-md"
      >
        <div className="rounded-full bg-primary-accent/20 p-4">
          <Settings className="h-12 w-12 text-primary-accent" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">System Settings</h2>
          <p className="text-muted-text">
            Advanced profile configuration, theme customization, and notification preferences will be available in the upcoming update.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium text-warning">
          <Construction className="h-4 w-4" />
          <span>Under Construction</span>
        </div>
      </motion.div>
    </div>
  )
}
