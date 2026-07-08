"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, useAnimation } from "framer-motion"
import { useProgressStore } from "@/store/progressStore"

// This hook intercepts route changes in Next.js App Router
// using pathname and searchparams changes as a proxy for navigation completion
function RouteProgressProviderInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isAnimating, progress, start, done, setProgress } = useProgressStore()
  const controls = useAnimation()
  
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  // When pathname or search params change, it means a route transition just completed
  React.useEffect(() => {
    if (isAnimating) {
      done()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])

  // Simulate progress when animating
  React.useEffect(() => {
    if (isAnimating && progress < 100) {
      // Clear existing timer
      if (timerRef.current) clearTimeout(timerRef.current)

      // Trickle progress
      timerRef.current = setTimeout(() => {
        let step = 0
        if (progress >= 0 && progress < 20) {
          step = 10
        } else if (progress >= 20 && progress < 50) {
          step = 4
        } else if (progress >= 50 && progress < 80) {
          step = 2
        } else if (progress >= 80 && progress < 99) {
          step = 0.5
        }
        
        if (progress + step < 99) {
          setProgress(progress + step)
        }
      }, 200)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isAnimating, progress, setProgress])

  // Animation controller
  React.useEffect(() => {
    const runAnimation = async () => {
      if (isAnimating) {
        if (progress === 0) {
          await controls.start({ opacity: 1, scaleX: 0, transition: { duration: 0 } })
        }
        
        await controls.start({ 
          scaleX: progress / 100, 
          transition: { ease: "linear", duration: 0.2 } 
        })

        if (progress === 100) {
          // Finish line
          await controls.start({ 
            scaleX: 1, 
            transition: { ease: "easeOut", duration: 0.2 } 
          })
          
          // Fade out
          await controls.start({ 
            opacity: 0, 
            transition: { ease: "easeIn", duration: 0.3, delay: 0.1 } 
          })
          
          // Reset
          useProgressStore.setState({ isAnimating: false, progress: 0 })
        }
      }
    }
    runAnimation()
  }, [isAnimating, progress, controls])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <motion.div
        className="h-[3px] w-full origin-left bg-gradient-to-r from-primary-accent via-secondary-accent to-ai-accent shadow-[0_0_10px_rgba(50,212,255,0.7)]"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={controls}
        style={{ transformOrigin: "0% 50%" }}
      />
    </div>
  )
}

export function RouteProgressProvider() {
  return (
    <React.Suspense fallback={null}>
      <RouteProgressProviderInner />
    </React.Suspense>
  )
}
