"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/store/authStore"
import { Loader2 } from "lucide-react"

export default function DashboardIndexPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login")
      return
    }

    if (user?.role) {
      const role = user.role.toLowerCase()
      // Map roles to their dashboard routes
      if (role === "fan") router.replace("/dashboard/fan")
      else if (role === "volunteer") router.replace("/dashboard/volunteer")
      else if (role === "organizer") router.replace("/dashboard/organizer")
      else if (role === "executive") router.replace("/dashboard/executive")
      else if (role === "administrator") router.replace("/dashboard/admin")
      else router.replace(`/dashboard/${role}`)
    } else {
      router.replace("/login")
    }
  }, [user, isAuthenticated, router])

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary-accent" />
    </div>
  )
}
