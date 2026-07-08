import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary-accent to-secondary-accent text-primary-bg shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_20px_rgba(50,212,255,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_0_30px_rgba(50,212,255,0.6)] hover:-translate-y-0.5",
        destructive:
          "bg-error text-white hover:bg-error/90 shadow-[0_0_15px_rgba(255,93,115,0.3)]",
        outline:
          "border border-white/20 bg-transparent hover:bg-white/10 hover:border-white/30 text-white backdrop-blur-md",
        secondary:
          "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md",
        ghost: "hover:bg-white/5 hover:text-white text-muted-text",
        glass: "border border-white/10 bg-glass backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-glass hover:brightness-110 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 text-white",
        link: "text-primary-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
