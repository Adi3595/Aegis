"use client"

import * as React from "react"
import { useNotificationStore } from "@/features/notifications/store/notificationStore"
import { AlertTriangle, ShieldCheck } from "lucide-react"

export function EmergencyAlertOverlay() {
  const { notifications, markAsRead } = useNotificationStore()
  
  // Find the oldest unread emergency notification
  const activeEmergency = notifications.find(n => !n.isRead && n.priority === "Emergency")

  if (!activeEmergency) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-error/10 border-2 border-error p-8 rounded-3xl max-w-lg w-full mx-4 shadow-[0_0_50px_rgba(255,87,87,0.3)] animate-pulse-fast text-center">
        <AlertTriangle className="w-16 h-16 text-error mx-auto mb-6" />
        
        <h2 className="text-3xl font-display font-bold text-white mb-2 uppercase tracking-widest">
          {activeEmergency.title}
        </h2>
        
        <p className="text-lg text-error-light mb-8">
          {activeEmergency.message}
        </p>

        <button
          onClick={() => markAsRead(activeEmergency.id)}
          className="bg-error text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 w-full"
        >
          <ShieldCheck className="w-6 h-6" />
          Acknowledge & Dismiss
        </button>
      </div>
    </div>
  )
}
