"use client"

import * as React from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Lenis smooth scrolling has been disabled to eliminate scroll lag and layout thrashing
  // Native CSS scroll-behavior: smooth handles anchor scrolling efficiently
  return <>{children}</>
}
