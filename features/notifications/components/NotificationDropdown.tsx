"use client"

import * as React from "react"
import { Bell, Check, Trash2, Globe2 } from "lucide-react"
import { useNotificationStore } from "@/features/notifications/store/notificationStore"

export function NotificationDropdown() {
  const { notifications, markAsRead, markAllAsRead, preferences, setLanguage } = useNotificationStore()
  const [isOpen, setIsOpen] = React.useState(false)

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <Bell className="w-5 h-5 text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-primary-bg animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
            <h3 className="font-semibold text-white">Notifications</h3>
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
                onClick={markAllAsRead}
                title="Mark all as read"
                className="text-muted-text hover:text-white transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto hide-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-text text-sm">
                No new notifications.
              </div>
            ) : (
              notifications.map(notif => (
                <div 
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${!notif.isRead ? 'bg-primary-accent/5' : ''}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      notif.priority === 'Emergency' ? 'text-error' :
                      notif.priority === 'Warning' ? 'text-warning' : 'text-primary-accent'
                    }`}>
                      {notif.category}
                    </span>
                    <span className="text-[10px] text-muted-text font-mono">
                      {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
                    </span>
                  </div>
                  <h4 className={`text-sm ${!notif.isRead ? 'text-white font-semibold' : 'text-muted-text'}`}>
                    {notif.title}
                  </h4>
                  <p className="text-xs text-muted-text mt-1 line-clamp-2 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
