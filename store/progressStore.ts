import { create } from "zustand"

interface ProgressState {
  isAnimating: boolean
  progress: number
  start: () => void
  done: () => void
  setProgress: (value: number) => void
}

export const useProgressStore = create<ProgressState>((set) => ({
  isAnimating: false,
  progress: 0,
  start: () => set({ isAnimating: true, progress: 0 }),
  done: () => set({ progress: 100 }),
  setProgress: (value) => set({ progress: value }),
}))
