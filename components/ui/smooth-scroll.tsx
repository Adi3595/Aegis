"use client"

import * as React from "react"
import Lenis from "@studio-freight/lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Only initialize Lenis on devices that typically use smooth scrolling (e.g. desktop)
    // Optional, but often best practice to avoid conflicts with native mobile scrolling
    const lenis = new Lenis({
      lerp: 0.08, // Physics-based smooth scroll instead of fixed duration
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
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
