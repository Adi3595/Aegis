"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [mounted, setMounted] = React.useState(false)
  const [isHovering, setIsHovering] = React.useState(false)
  const [isPointer, setIsPointer] = React.useState(false)

  // Mouse position
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Smooth spring physics for the outer ring
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  React.useEffect(() => {
    // Only mount on devices with a fine pointer (mouse/trackpad)
    // and respect reduced motion
    const mediaQuery = window.matchMedia("(pointer: fine)")
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    
    if (!mediaQuery.matches || reducedMotionQuery.matches) {
      return
    }

    setMounted(true)
    setIsPointer(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Expand cursor on interactive elements
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    // Hide native cursor when custom cursor is active
    document.body.style.cursor = "none"

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })

    return () => {
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!mounted || !isPointer) return null

  return (
    <>
      {/* Inner dot - instant follow */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary-accent rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer ring - spring follow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-ai-accent/50 rounded-full pointer-events-none z-[9998]"
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(124,92,255,0.1)" : "rgba(124,92,255,0)",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  )
}
