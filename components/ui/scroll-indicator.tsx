"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Mouse } from "lucide-react"

export function ScrollIndicator() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    })
  }

  return (
    <motion.button
      onClick={handleScroll}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center justify-center text-muted-text hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent rounded-full p-2"
      aria-label="Scroll to next section"
    >
      <Mouse className="mb-2 h-6 w-6" />
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="h-2 w-0.5 bg-primary-accent rounded-full"
      />
    </motion.button>
  )
}
