import { create } from "zustand"

export type ToastVariant = "default" | "success" | "error" | "warning" | "info" | "loading"

export interface Toast {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastState {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  dismissAll: () => void
}

let toastCount = 0

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${++toastCount}`
    const newToast = { ...toast, id }
    
    // Check for duplicates based on title and description
    set((state) => {
      const isDuplicate = state.toasts.some(
        (t) => t.title === toast.title && t.description === toast.description
      )
      
      if (isDuplicate) return state
      
      return { toasts: [...state.toasts, newToast] }
    })
    
    // Auto remove if not loading and duration > 0 (or default)
    if (toast.variant !== "loading") {
      const duration = toast.duration ?? 5000
      if (duration > 0) {
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }))
        }, duration)
      }
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  dismissAll: () => set({ toasts: [] }),
}))

// Simple API for outside react components
export const toast = {
  success: (title: string, description?: string, options?: Partial<Toast>) =>
    useToastStore.getState().addToast({ title, description, variant: "success", ...options }),
  error: (title: string, description?: string, options?: Partial<Toast>) =>
    useToastStore.getState().addToast({ title, description, variant: "error", ...options }),
  warning: (title: string, description?: string, options?: Partial<Toast>) =>
    useToastStore.getState().addToast({ title, description, variant: "warning", ...options }),
  info: (title: string, description?: string, options?: Partial<Toast>) =>
    useToastStore.getState().addToast({ title, description, variant: "info", ...options }),
  loading: (title: string, description?: string, options?: Partial<Toast>) =>
    useToastStore.getState().addToast({ title, description, variant: "loading", ...options }),
  dismiss: (id: string) => useToastStore.getState().removeToast(id),
  dismissAll: () => useToastStore.getState().dismissAll(),
}
