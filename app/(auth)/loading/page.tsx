"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Shield, Loader2 } from "lucide-react"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

export default function PlatformLoadingPage() {
  const router = useRouter()

  React.useEffect(() => {
    // Route to dashboard after a short delay
    const timer = setTimeout(() => {
      router.replace("/dashboard")
    }, 2000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <ProtectedRoute>
      <div className="flex h-full w-full flex-col items-center justify-center space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-ai-accent/20 blur-3xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-glass border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <Shield className="h-10 w-10 text-white animate-pulse" />
          </div>
          <motion.div
            className="absolute -inset-4 rounded-3xl border border-primary-accent/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-8 rounded-[2rem] border border-ai-accent/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
          />
        </motion.div>

        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">
            Initializing Workstation
          </h2>
          <div className="flex items-center justify-center space-x-2 text-muted-text">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Connecting to AEGIS Intelligence Network...</span>
          </div>
        </div>

        {/* Mock redirect text */}
        <div className="max-w-md w-full bg-surface/50 p-4 rounded-xl border border-white/5 text-center mt-12">
          <p className="text-sm text-muted-text">
            (Transitioning to your Role Dashboard...)
          </p>
        </div>
      </div>
    </ProtectedRoute>
  )
}
