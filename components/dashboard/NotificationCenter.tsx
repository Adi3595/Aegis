"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell, ShieldAlert, HeartPulse, Activity } from "lucide-react"
import { useLayoutStore } from "@/store/layoutStore"
import { useNotificationStore } from "@/features/notifications/store/notificationStore"
import { cn } from "@/lib/utils"

export function NotificationCenter() {
  const { notificationCenterOpen, setNotificationCenter } = useLayoutStore()
  const { notifications, markAsRead, markAllAsRead, preferences, setLanguage } = useNotificationStore()

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <>
      <AnimatePresence>
        {notificationCenterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNotificationCenter(false)}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: notificationCenterOpen ? 0 : "100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col border-l border-white/5 bg-surface/95 backdrop-blur-3xl shadow-2xl"
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-white" />
            <span className="font-display font-semibold tracking-tight text-white">Notifications</span>
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-error px-2 py-0.5 text-[10px] font-bold text-white">{unreadCount} New</span>
            )}
          </div>
          <div className="flex gap-2">
            <select 
              value={preferences.language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/5 border border-white/10 rounded px-1 py-0.5 text-[10px] text-muted-text outline-none"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
            <button
              onClick={() => setNotificationCenter(false)}
              className="rounded-md p-1.5 text-muted-text hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center text-muted-text mt-8">No notifications</div>
          ) : (
            notifications.map(notif => (
              <div 
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`rounded-xl border p-4 relative overflow-hidden group cursor-pointer transition-colors ${
                  !notif.isRead ? 'bg-white/10 border-white/20' : 'bg-glass border-white/5'
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className={`flex items-center gap-2 ${
                    notif.priority === 'Emergency' ? 'text-error' :
                    notif.priority === 'Warning' ? 'text-warning' : 'text-primary-accent'
                  }`}>
                    {notif.priority === 'Emergency' ? <ShieldAlert className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                    <span className="text-sm font-semibold uppercase">{notif.category}</span>
                  </div>
                  <span className="text-xs text-muted-text">
                    {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                  </span>
                </div>
                <h4 className={`text-sm mb-1 ${!notif.isRead ? 'text-white font-semibold' : 'text-muted-text'}`}>{notif.title}</h4>
                <p className="text-sm text-white/90">
                  {notif.message}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-white/10 p-4">
          <button 
            onClick={markAllAsRead}
            className="w-full rounded-lg bg-white/5 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            Mark all as read
          </button>
        </div>
      </motion.aside>
    </>
  )
}
