"use client"

import * as React from "react"
import { Mic, MicOff } from "lucide-react"
import { useVoiceStore } from "../store/useVoiceStore"

export function VoiceCommandButton() {
  const { isSupported, isListening, startListening, stopListening, initialize } = useVoiceStore()

  React.useEffect(() => {
    initialize()
  }, [initialize])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+V or similar
      if (e.ctrlKey && e.code === 'KeyM') {
        e.preventDefault()
        isListening ? stopListening() : startListening()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isListening, startListening, stopListening])

  if (!isSupported) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
          isListening 
            ? 'bg-error scale-110' 
            : 'bg-primary-accent hover:scale-105'
        }`}
      >
        {isListening ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error opacity-75" />
            <MicOff className="h-6 w-6 text-white relative z-10" />
          </>
        ) : (
          <Mic className="h-6 w-6 text-primary-bg" />
        )}
      </button>
    </div>
  )
}
