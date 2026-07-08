import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-accent text-primary-bg shadow",
        secondary:
          "border-transparent bg-secondary-accent text-white",
        destructive:
          "border-transparent bg-error text-white shadow",
        outline: "text-foreground border-white/20",
        ai: "border-transparent bg-ai-accent text-white shadow-[0_0_10px_rgba(124,92,255,0.5)]",
        success: "border-transparent bg-success text-primary-bg shadow",
        warning: "border-transparent bg-warning text-primary-bg shadow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
