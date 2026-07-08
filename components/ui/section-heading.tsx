import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col space-y-2 mb-8", {
      "items-start text-left": align === "left",
      "items-center text-center": align === "center",
      "items-end text-right": align === "right",
    }, className)}>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl"
        {...props}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-text max-w-[800px]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
