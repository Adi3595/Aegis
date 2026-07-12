"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/features/auth/store/authStore"

export default function DashboardIndexPage() {
  const router = useRouter()
  const { user } = useAuthStore()

  useEffect(() => {
    const role = user?.role
    if (user && role) {
      if (role === "Fan") router.replace("/dashboard/fan")
      else if (role === "Volunteer") router.replace("/dashboard/volunteer")
      else if (role === "Organizer") router.replace("/dashboard/organizer")
      else if (role === "Executive") router.replace("/dashboard/executive")
      else router.replace(`/dashboard/${role.toLowerCase()}`)
    } else {
      router.replace("/login")
    }
  }, [user, router])

  return null
}
