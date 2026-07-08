"use client"

import * as React from "react"
import Lenis from "@studio-freight/lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Only initialize Lenis on devices that typically use smooth scrolling (e.g. desktop)
    // Optional, but often best practice to avoid conflicts with native mobile scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Store globally so other components (like navbar) can access lenis.scrollTo
    // @ts-ignore
    window.lenis = lenis

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
