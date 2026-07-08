"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/store/authStore"
import { Loader2 } from "lucide-react"

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    if (isAuthenticated) {
      // If they haven't selected a role, send to onboarding
      if (!user?.role) {
        router.replace("/onboarding")
      } else {
        router.replace("/loading") // Placeholder for dashboard
      }
    }
  }, [isAuthenticated, user, router])

  if (!mounted || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary-bg">
        <Loader2 className="h-8 w-8 animate-spin text-ai-accent" />
      </div>
    )
  }

  return <>{children}</>
}
