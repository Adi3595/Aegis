"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useVoiceStore } from "../store/useVoiceStore"
import { Mic, X } from "lucide-react"
import { orchestrator } from "@/features/ai/engine/Orchestrator"
import { useLayoutStore } from "@/store/layoutStore"

export function VoiceListeningOverlay() {
  const { isListening, interimTranscript, transcript, stopListening, clearTranscript } = useVoiceStore()

  const { setRightPanel } = useLayoutStore()

  // Auto-send when listening stops and there's a final transcript
  React.useEffect(() => {
    if (!isListening && transcript) {
      // Send to orchestrator
      orchestrator.ask(transcript.trim())
      // Make sure panel is open to see response
      setRightPanel(true)
      // Clear
      clearTranscript()
    }
  }, [isListening, transcript, setRightPanel, clearTranscript])

  return (
    <AnimatePresence>
      {isListening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-end bg-black/80 backdrop-blur-md pb-32"
        >
          <button 
            onClick={stopListening}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center max-w-2xl px-6">
            <Mic className="w-12 h-12 text-primary-accent mx-auto mb-8 animate-pulse" />
            
            <div className="min-h-[100px]">
              {transcript && (
                <span className="text-3xl md:text-5xl font-display font-medium text-white leading-tight">
                  {transcript}{" "}
                </span>
              )}
              <span className="text-3xl md:text-5xl font-display font-medium text-muted-text leading-tight">
                {interimTranscript || (!transcript && "Listening...")}
              </span>
            </div>

            {/* Pseudo Waveform Animation */}
            <div className="flex items-center justify-center gap-1 mt-12 h-16">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: ["20%", "100%", "20%"] 
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 bg-primary-accent rounded-full"
                  style={{ height: "20%" }}
                />
              ))}
            </div>

            <p className="text-muted-text mt-8 text-sm">
              Tap anywhere or say your command to finish.
            </p>
          </div>

          <div className="absolute inset-0 z-[-1]" onClick={stopListening} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
