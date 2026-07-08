import * as React from "react"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"

export function Fade({ children, delay = 0, duration = 0.5, className }: { children: React.ReactNode, delay?: number, duration?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Slide({ children, direction = "up", delay = 0, duration = 0.5, className }: { children: React.ReactNode, direction?: "up" | "down" | "left" | "right", delay?: number, duration?: number, className?: string }) {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0
    },
    visible: { opacity: 1, y: 0, x: 0 }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
      transition={{ duration, delay, type: "spring", stiffness: 100 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Scale({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: "spring", bounce: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Hover({ children, scale = 1.05, className }: { children: React.ReactNode, scale?: number, className?: string }) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, delayOrder = 0.1, className }: { children: React.ReactNode, delayOrder?: number, className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: delayOrder
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
