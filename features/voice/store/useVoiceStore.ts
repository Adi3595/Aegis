import { create } from "zustand"
import { IVoiceProvider } from "../providers/IVoiceProvider"
import { BrowserVoiceProvider } from "../providers/BrowserVoiceProvider"

interface VoiceState {
  provider: IVoiceProvider | null
  isListening: boolean
  isSpeaking: boolean
  transcript: string
  interimTranscript: string
  error: string | null
  isSupported: boolean
  
  initialize: () => Promise<void>
  startListening: () => void
  stopListening: () => void
  speak: (text: string, lang?: string) => Promise<void>
  cancelSpeech: () => void
  clearTranscript: () => void
}

export const useVoiceStore = create<VoiceState>((set, get) => ({
  provider: null,
  isListening: false,
  isSpeaking: false,
  transcript: "",
  interimTranscript: "",
  error: null,
  isSupported: false,

  initialize: async () => {
    // Default to Browser provider as per requirements
    const provider = new BrowserVoiceProvider()
    await provider.initialize()
    
    set({ 
      provider,
      isSupported: provider.isAvailable()
    })
  },

  startListening: () => {
    const { provider } = get()
    if (!provider || !provider.isAvailable()) {
      set({ error: "Voice not supported" })
      return
    }

    set({ isListening: true, error: null, transcript: "", interimTranscript: "" })

    provider.startListening(
      (text, isFinal) => {
        if (isFinal) {
          set((state) => ({ transcript: state.transcript + " " + text, interimTranscript: "" }))
        } else {
          set({ interimTranscript: text })
        }
      },
      (error) => {
        set({ error, isListening: false })
      }
    )
  },

  stopListening: () => {
    const { provider } = get()
    if (provider) {
      provider.stopListening()
      set({ isListening: false })
    }
  },

  speak: async (text, lang) => {
    const { provider } = get()
    if (provider) {
      set({ isSpeaking: true })
      try {
        await provider.speak(text, lang)
      } finally {
        set({ isSpeaking: false })
      }
    }
  },

  cancelSpeech: () => {
    const { provider } = get()
    if (provider) {
      provider.cancelSpeech()
      set({ isSpeaking: false })
    }
  },

  clearTranscript: () => set({ transcript: "", interimTranscript: "" })
}))
