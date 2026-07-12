import { create } from "zustand"

export interface Notification {
  id: string
  title: string
  message: string
  category: string
  priority: "Info" | "Warning" | "Emergency"
  timestamp: number
  targetRoles: string[] | null
  isRead: boolean
}

interface NotificationState {
  notifications: Notification[]
  preferences: {
    language: string
    sound: boolean
  }
  
  addNotification: (notif: Omit<Notification, "isRead">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  setLanguage: (lang: string) => void
  setSound: (enabled: boolean) => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  preferences: {
    language: "en",
    sound: true,
  },

  addNotification: (notif) => {
    // Only add if we don't already have it
    if (!get().notifications.find(n => n.id === notif.id)) {
      
      // Auto-translate if language preference is not English (MVP simple logic)
      const { language } = get().preferences
      
      if (language !== "en") {
        // Optimistically add while translating
        set(state => ({
          notifications: [{ ...notif, isRead: false }, ...state.notifications]
        }))

        // Call our translation API
        fetch("https://aegis-backend-qlx8.onrender.com/api/v1/ai/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: notif.message, target_language: language })
        })
        .then(res => res.json())
        .then(data => {
          set(state => ({
            notifications: state.notifications.map(n => 
              n.id === notif.id ? { ...n, message: data.translated_text } : n
            )
          }))
        })
        .catch(console.error)

      } else {
        set(state => ({
          notifications: [{ ...notif, isRead: false }, ...state.notifications]
        }))
      }

      // Play sound if critical or enabled
      if (get().preferences.sound && typeof window !== "undefined") {
        if (notif.priority === "Emergency") {
          // Play loud alert
          try {
            const audio = new Audio('/alert.mp3') // placeholder
            audio.play().catch(() => {})
          } catch(e){}
        }
      }
    }
  },

  markAsRead: (id) => set(state => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
  })),

  markAllAsRead: () => set(state => ({
    notifications: state.notifications.map(n => ({ ...n, isRead: true }))
  })),

  setLanguage: (lang) => set(state => ({
    preferences: { ...state.preferences, language: lang }
  })),

  setSound: (enabled) => set(state => ({
    preferences: { ...state.preferences, sound: enabled }
  }))
}))
