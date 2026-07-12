"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { HeroContent } from "./HeroContent"
import { ScrollIndicator } from "@/components/ui/scroll-indicator"
import { motion } from "framer-motion"

// Lazy load Three.js scene for performance
const StadiumScene = dynamic(() => import("./StadiumScene"), { 
  ssr: false,
})

export function Hero() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-primary-bg">
      {/* 3D Background - only loaded client-side and on larger screens via CSS hidden class in StadiumScene */}
      {mounted && <StadiumScene />}
      
      {/* Mobile fallback animated gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(124,92,255,0.2),transparent_50%)] md:hidden pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom,rgba(50,212,255,0.1),transparent_50%)] md:hidden pointer-events-none" />
      <motion.div 
        className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-50 pointer-events-none md:hidden"
        animate={{ y: [0, -100] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="pointer-events-auto w-full">
          <HeroContent />
        </div>
        <ScrollIndicator />
      </motion.div>
    </section>
  )
}
