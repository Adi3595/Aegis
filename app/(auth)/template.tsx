"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Use pathname as key so Framer Motion animates the change when route changes
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
