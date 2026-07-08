"use client" // Error components must be Client Components

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary caught:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-bg px-4 relative overflow-hidden">
      {/* Premium background styling to ensure error state doesn't look broken */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,93,115,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-6 relative z-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-error/10 border border-error/20 text-error mb-4">
          <ShieldAlert className="h-10 w-10" />
        </div>
        
        <h2 className="font-display text-3xl font-bold text-white">System Exception</h2>
        
        <p className="text-muted-text text-sm mb-8">
          A rendering or state exception was caught by the AEGIS OS boundaries. Safe mode engaged.
          {process.env.NODE_ENV === "development" && (
            <span className="block mt-4 text-xs font-mono text-error/80 bg-error/5 p-2 rounded text-left overflow-auto max-h-32">
              {error.message}
            </span>
          )}
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full justify-center">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            Attempt Recovery
          </Button>
          <Button
            variant="glass"
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto"
          >
            Return to Root
          </Button>
        </div>
      </div>
    </div>
  )
}
