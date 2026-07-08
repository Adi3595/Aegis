"use client"

import * as React from "react"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { simulationWsService } from "@/features/simulation/services/websocketService"

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    simulationWsService.connect()
    return () => {
      simulationWsService.disconnect()
    }
  }, [])
  return (
    <ProtectedRoute>
      <div className="fixed inset-0 z-[100] bg-primary-bg">
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </div>
    </ProtectedRoute>
  )
}
