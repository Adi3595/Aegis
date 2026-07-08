import { IVoiceProvider } from "./IVoiceProvider"

export class BrowserVoiceProvider implements IVoiceProvider {
  private recognition: any = null
  private synth: SpeechSynthesis | null = null
  private isRecognizing = false

  async initialize(): Promise<void> {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition()
        this.recognition.continuous = true
        this.recognition.interimResults = true
      }
      this.synth = window.speechSynthesis
    }
  }

  startListening(onResult: (text: string, isFinal: boolean) => void, onError: (error: string) => void): void {
    if (!this.recognition) {
      onError("Speech recognition not supported in this browser.")
      return
    }

    if (this.isRecognizing) return

    this.recognition.onresult = (event: any) => {
      let interimTranscript = ""
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        } else {
          interimTranscript += event.results[i][0].transcript
        }
      }

      if (finalTranscript) {
        onResult(finalTranscript, true)
      } else if (interimTranscript) {
        onResult(interimTranscript, false)
      }
    }

    this.recognition.onerror = (event: any) => {
      onError(event.error)
      this.isRecognizing = false
    }

    this.recognition.onend = () => {
      this.isRecognizing = false
    }

    try {
      this.recognition.start()
      this.isRecognizing = true
    } catch (e) {
      console.error(e)
    }
  }

  stopListening(): void {
    if (this.recognition && this.isRecognizing) {
      this.recognition.stop()
      this.isRecognizing = false
    }
  }

  async speak(text: string, language: string = "en-US"): Promise<void> {
    if (!this.synth) return

    this.cancelSpeech()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    
    return new Promise((resolve) => {
      utterance.onend = () => resolve()
      this.synth!.speak(utterance)
    })
  }

  cancelSpeech(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel()
    }
  }

  getSupportedLanguages(): string[] {
    return ["en-US", "es-ES", "fr-FR", "de-DE", "zh-CN", "ja-JP", "ar-SA"]
  }

  isAvailable(): boolean {
    return this.recognition !== null && this.synth !== null
  }
}
