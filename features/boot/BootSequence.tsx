"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const BOOT_MESSAGES = [
  { text: "Initializing Stadium Intelligence...", delay: 0 },
  { text: "Loading Stadium Topology...", delay: 400 },
  { text: "Connecting Crowd Simulation...", delay: 800 },
  { text: "Connecting Weather Engine...", delay: 1200 },
  { text: "Initializing AI Agents...", delay: 1600 },
  { text: "Navigation Agent", isAgent: true, delay: 2000 },
  { text: "Emergency Agent", isAgent: true, delay: 2200 },
  { text: "Crowd Intelligence Agent", isAgent: true, delay: 2400 },
  { text: "Translation Agent", isAgent: true, delay: 2600 },
  { text: "Operations Agent", isAgent: true, delay: 2800 },
  { text: "Digital Twin Online", isAgent: true, delay: 3200 },
  { text: "System Ready.", isFinal: true, delay: 3800 },
]

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = React.useState(true)
  const [currentIndex, setCurrentIndex] = React.useState(-1)
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false)

  React.useEffect(() => {
    // Check local storage for skip logic
    const hasBooted = localStorage.getItem("aegis_boot_completed")
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setPrefersReducedMotion(isReducedMotion)

    if (hasBooted && process.env.NODE_ENV !== "development") {
      setIsVisible(false)
      onComplete()
      return
    }

    if (isReducedMotion) {
      // Just show the final text for a moment if reduced motion is on
      setCurrentIndex(BOOT_MESSAGES.length - 1)
      const timer = setTimeout(() => {
        completeBoot()
      }, 1500)
      return () => clearTimeout(timer)
    }

    // Play animation sequence
    const timers = BOOT_MESSAGES.map((msg, idx) => {
      return setTimeout(() => {
        setCurrentIndex(idx)
        if (idx === BOOT_MESSAGES.length - 1) {
          setTimeout(completeBoot, 1000)
        }
      }, msg.delay)
    })

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const completeBoot = () => {
    setIsVisible(false)
    localStorage.setItem("aegis_boot_completed", "true")
    setTimeout(onComplete, 800) // allow fade out
  }

  // Developer replay mechanism
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "b") {
          e.preventDefault()
          localStorage.removeItem("aegis_boot_completed")
          window.location.reload()
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (!isVisible) return null

  const progressPercentage = Math.min(100, ((currentIndex + 1) / BOOT_MESSAGES.length) * 100)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="boot-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-start justify-center bg-primary-bg p-8 font-mono text-sm sm:p-16 md:text-base lg:p-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.05),transparent_70%)]" />

          {/* Developer hidden button */}
          {process.env.NODE_ENV === "development" && (
            <button
              onClick={() => {
                localStorage.removeItem("aegis_boot_completed")
                window.location.reload()
              }}
              className="absolute right-4 top-4 opacity-0 hover:opacity-50 text-xs text-white"
              title="Dev Reset Boot"
            >
              Dev Reset
            </button>
          )}

          <div className="relative z-10 w-full max-w-2xl space-y-2">
            {!prefersReducedMotion ? (
              BOOT_MESSAGES.map((msg, idx) => {
                const isActive = idx <= currentIndex
                if (!isActive) return null

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex items-center space-x-2 text-white/80",
                      msg.isFinal && "mt-8 text-xl font-bold text-success",
                      msg.isAgent && "ml-4 text-ai-accent"
                    )}
                  >
                    <span>{msg.text}</span>
                    {msg.isAgent && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        <Check className="h-4 w-4 text-success" />
                      </motion.span>
                    )}
                  </motion.div>
                )
              })
            ) : (
              <div className="mt-8 text-xl font-bold text-success">
                System Ready.
              </div>
            )}
          </div>

          <div className="absolute bottom-12 left-8 right-8 max-w-2xl sm:left-16 lg:left-24">
            <div className="h-[2px] w-full bg-white/10 overflow-hidden">
              <motion.div 
                className="h-full bg-primary-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-2 text-xs text-muted-text">
              AEGIS_OS_v2.0.26 // BOOTING
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
