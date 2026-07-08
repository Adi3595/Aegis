"use client"

import * as React from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface LazySectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  minHeight?: string
}

export function LazySection({ children, minHeight = "min-h-[80vh]", className, ...props }: LazySectionProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  // Trigger load when the section is 400px from entering the viewport to ensure smooth scrolling
  const isInView = useInView(ref, { once: true, margin: "400px 0px" })

  return (
    <section 
      ref={ref} 
      className={cn("w-full relative", minHeight, className)} 
      {...props}
    >
      {isInView ? (
        children
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <Skeleton className="w-full h-full max-h-[60vh] max-w-6xl mx-auto rounded-3xl" />
        </div>
      )}
    </section>
  )
}
