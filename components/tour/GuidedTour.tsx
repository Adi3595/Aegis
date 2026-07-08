"use client"

import * as React from "react"
import { useDemoStore } from "@/store/demoStore"
import { MAIN_TOUR_STEPS } from "@/lib/tour/tour-config"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft } from "lucide-react"

export function GuidedTour() {
  const { tourActive, setTourActive, tourStep, setTourStep } = useDemoStore()
  const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null)

  const steps = MAIN_TOUR_STEPS
  const currentStep = steps[tourStep]

  React.useEffect(() => {
    if (!tourActive || !currentStep) return

    const updateRect = () => {
      const el = document.querySelector(currentStep.target)
      if (el) {
        setTargetRect(el.getBoundingClientRect())
        // Auto scroll
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
      } else {
        setTargetRect(null)
      }
    }

    // Small delay to allow DOM render
    const timeout = setTimeout(updateRect, 300)
    window.addEventListener('resize', updateRect)
    
    // Keyboard nav
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTourActive(false)
      if (e.key === 'ArrowRight' && tourStep < steps.length - 1) setTourStep(tourStep + 1)
      if (e.key === 'ArrowLeft' && tourStep > 0) setTourStep(tourStep - 1)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [tourActive, currentStep, tourStep, setTourActive, setTourStep, steps.length])

  if (!tourActive || !currentStep) return null

  // Calculate tooltip position based on placement
  let tooltipStyle = {}
  if (targetRect) {
    const spacing = 20
    switch (currentStep.placement) {
      case 'bottom':
        tooltipStyle = { top: targetRect.bottom + spacing, left: targetRect.left + (targetRect.width / 2) - 160 }
        break
      case 'top':
        tooltipStyle = { top: targetRect.top - 150 - spacing, left: targetRect.left + (targetRect.width / 2) - 160 }
        break
      case 'left':
        tooltipStyle = { top: targetRect.top + (targetRect.height / 2) - 75, left: targetRect.left - 320 - spacing }
        break
      case 'right':
        tooltipStyle = { top: targetRect.top + (targetRect.height / 2) - 75, left: targetRect.right + spacing }
        break
    }
  } else {
    // Center fallback if target not found
    tooltipStyle = { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-all duration-500 pointer-events-auto" />
      
      {/* Spotlight Hole (using SVG mask or box-shadow trick - we use absolute div borders here for simplicity) */}
      <AnimatePresence>
        {targetRect && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute rounded-xl border-2 border-primary-accent shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] box-content pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Tooltip Card */}
      <motion.div
        key={tourStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        style={tooltipStyle}
        className="absolute w-[320px] bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-5 shadow-2xl pointer-events-auto"
      >
        <button 
          onClick={() => setTourActive(false)}
          className="absolute top-3 right-3 text-white/50 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-bold text-white mb-2 pr-6">{currentStep.title}</h3>
        <p className="text-sm text-white/80 mb-6 leading-relaxed">
          {currentStep.content}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-white/50">
            {tourStep + 1} OF {steps.length}
          </span>
          
          <div className="flex items-center gap-2">
            <button
              disabled={tourStep === 0}
              onClick={() => setTourStep(tourStep - 1)}
              className="p-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (tourStep === steps.length - 1) {
                  setTourActive(false)
                } else {
                  setTourStep(tourStep + 1)
                }
              }}
              className="px-3 py-1 rounded bg-primary-accent text-black font-semibold text-sm hover:brightness-110"
            >
              {tourStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
