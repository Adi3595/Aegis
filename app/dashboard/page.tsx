"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/store/authStore"
import { Loader2 } from "lucide-react"

export default function DashboardIndexPage() {
  const router = useRouter()
  const { user } = useAuthStore()

  React.useEffect(() => {
    if (user?.role) {
      // Redirect to the correct role dashboard
      const roleSlug = user.role.toLowerCase()
      router.replace(`/dashboard/${roleSlug}`)
    } else {
      router.replace("/onboarding")
    }
  }, [user, router])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary-accent" />
    </div>
  )
}
