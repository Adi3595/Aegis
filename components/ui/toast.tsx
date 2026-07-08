"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useToastStore, type Toast } from "@/store/toastStore"
import { X, CheckCircle, AlertCircle, Info, Loader2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore()

  // Support reduced motion
  const reducedMotion = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false

  return (
    <div 
      className="fixed z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px] bottom-0 sm:bottom-auto sm:top-0 sm:right-0 pointer-events-none"
      aria-live="assertive"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout={!reducedMotion}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className={cn(
              "pointer-events-auto w-full mb-3 flex items-start gap-4 rounded-xl border border-white/10 bg-glass backdrop-blur-2xl p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)] transition-all",
              toast.variant === "success" && "border-success/30 shadow-[0_0_20px_rgba(34,197,94,0.15)]",
              toast.variant === "error" && "border-error/30 shadow-[0_0_20px_rgba(244,63,94,0.15)]",
              toast.variant === "warning" && "border-warning/30 shadow-[0_0_20px_rgba(251,191,36,0.15)]",
            )}
            role={toast.variant === "error" ? "alert" : "status"}
          >
            <div className="flex-shrink-0 mt-0.5">
              <ToastIcon variant={toast.variant} />
            </div>
            
            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-tight">
                {toast.title}
              </p>
              {toast.description && (
                <p className="text-sm text-muted-text">
                  {toast.description}
                </p>
              )}
              {toast.action && (
                <div className="mt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 border-white/20 hover:border-white/40"
                    onClick={() => {
                      toast.action?.onClick()
                      removeToast(toast.id)
                    }}
                  >
                    {toast.action.label}
                  </Button>
                </div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 rounded-md p-1 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 hover:text-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-accent"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastIcon({ variant }: { variant?: Toast["variant"] }) {
  switch (variant) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-success" />
    case "error":
      return <AlertCircle className="h-5 w-5 text-error" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-warning" />
    case "info":
      return <Info className="h-5 w-5 text-primary-accent" />
    case "loading":
      return <Loader2 className="h-5 w-5 text-ai-accent animate-spin" />
    default:
      return null
  }
}
