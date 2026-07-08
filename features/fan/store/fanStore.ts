import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SupportedLanguage = "en" | "es" | "fr" | "ar" | "hi" | "pt"

export interface FanPreferences {
  language: SupportedLanguage
  wheelchairAccess: boolean
  reducedMotion: boolean
  notificationsEnabled: boolean
  favoriteTeam: string | null
}

interface FanState {
  preferences: FanPreferences
  setLanguage: (lang: SupportedLanguage) => void
  setWheelchairAccess: (enabled: boolean) => void
  setReducedMotion: (enabled: boolean) => void
  setNotifications: (enabled: boolean) => void
  setFavoriteTeam: (team: string | null) => void
}

const DEFAULT_PREFERENCES: FanPreferences = {
  language: "en",
  wheelchairAccess: false,
  reducedMotion: false,
  notificationsEnabled: true,
  favoriteTeam: null,
}

export const useFanStore = create<FanState>()(
  persist(
    (set) => ({
      preferences: DEFAULT_PREFERENCES,
      setLanguage: (language) => set((state) => ({ preferences: { ...state.preferences, language } })),
      setWheelchairAccess: (wheelchairAccess) => set((state) => ({ preferences: { ...state.preferences, wheelchairAccess } })),
      setReducedMotion: (reducedMotion) => set((state) => ({ preferences: { ...state.preferences, reducedMotion } })),
      setNotifications: (notificationsEnabled) => set((state) => ({ preferences: { ...state.preferences, notificationsEnabled } })),
      setFavoriteTeam: (favoriteTeam) => set((state) => ({ preferences: { ...state.preferences, favoriteTeam } })),
    }),
    {
      name: "aegis-fan-storage",
    }
  )
)
