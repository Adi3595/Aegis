"use client"

import * as React from "react"
import { WifiOff } from "lucide-react"

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = React.useState(false)

  React.useEffect(() => {
    // Only run on the client
    setIsOffline(!window.navigator.onLine)

    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="flex items-center gap-2 bg-error/20 border border-error/50 text-error px-3 py-1.5 rounded-full text-xs font-semibold animate-pulse">
      <WifiOff className="w-3.5 h-3.5" />
      <span>Offline Mode</span>
    </div>
  )
}
