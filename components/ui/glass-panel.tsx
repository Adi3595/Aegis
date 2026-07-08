import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/5 bg-glass backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)]",
          interactive &&
            "transition-all duration-300 hover:-translate-y-1 hover:bg-glass hover:brightness-110 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_12px_40px_rgba(50,212,255,0.15)]",
          className
        )}
        {...props}
      />
    )
  }
)
GlassPanel.displayName = "GlassPanel"
