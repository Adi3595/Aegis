"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error("Application Error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col bg-primary-bg">
      <Navbar />
      <main className="flex-1 w-full flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="mx-auto w-16 h-16 rounded-2xl bg-error/10 border border-error/20 flex items-center justify-center mb-6">
            <AlertTriangle className="h-8 w-8 text-error animate-pulse" />
          </div>
          
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">System Fault Detected</h1>
          <p className="text-muted-text">
            A critical failure occurred while rendering this module. The engineering team has been notified.
          </p>
          
          <div className="p-4 bg-black/40 border border-white/5 rounded-xl font-mono text-xs text-error/80 text-left overflow-hidden overflow-ellipsis whitespace-nowrap">
            {error.message || "Unknown Runtime Error"}
          </div>

          <div className="flex items-center justify-center space-x-4 pt-4">
            <Button onClick={() => reset()} className="flex items-center space-x-2">
              <RotateCcw className="h-4 w-4" />
              <span>Restart Module</span>
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Return Home
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
