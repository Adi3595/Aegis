import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = 
  | "Fan" 
  | "Organizer" 
  | "Volunteer" 
  | "Security" 
  | "Medical" 
  | "Vendor" 
  | "Administrator"

export interface User {
  id: string
  email: string
  name: string
  role?: UserRole
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  setAuth: (user: User) => void
  setRole: (role: UserRole) => void
  logout: () => void
  setLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      setRole: (role) => 
        set((state) => ({
          user: state.user ? { ...state.user, role } : null
        })),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "aegis-auth-storage",
    }
  )
)
