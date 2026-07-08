"use client"

import * as React from "react"
import { TopNav } from "./TopNav"
import { Sidebar } from "./Sidebar"
import { RightPanel } from "./RightPanel"
import { NotificationCenter } from "./NotificationCenter"
import { CommandPalette } from "./CommandPalette"
import { EmergencyAlertOverlay } from "@/features/notifications/components/EmergencyAlertOverlay"
import { VoiceCommandButton } from "@/features/voice/components/VoiceCommandButton"
import { VoiceListeningOverlay } from "@/features/voice/components/VoiceListeningOverlay"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-primary-bg text-white">
      {/* Background Mesh (shared with landing page but contained in dashboard) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-mesh opacity-30" />
      </div>

      <TopNav />

      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 scroll-smooth relative">
          <div className="mx-auto max-w-7xl h-full">
            {children}
          </div>
        </main>
        
        <RightPanel />
      </div>

      {/* Global Modals & Overlays */}
      <NotificationCenter />
      <CommandPalette />
      <EmergencyAlertOverlay />
      <VoiceCommandButton />
      <VoiceListeningOverlay />
    </div>
  )
}
