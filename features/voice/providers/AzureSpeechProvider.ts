import { IVoiceProvider } from "./IVoiceProvider"

export class AzureSpeechProvider implements IVoiceProvider {
  // Placeholder for future Azure AI Speech SDK integration
  
  async initialize(): Promise<void> {
    console.log("AzureSpeechProvider initialized (Placeholder)")
  }

  startListening(onResult: (text: string, isFinal: boolean) => void, onError: (error: string) => void): void {
    console.warn("AzureSpeechProvider startListening not implemented")
  }

  stopListening(): void {
    console.warn("AzureSpeechProvider stopListening not implemented")
  }

  async speak(text: string, language?: string): Promise<void> {
    console.warn("AzureSpeechProvider speak not implemented")
  }

  cancelSpeech(): void {
    console.warn("AzureSpeechProvider cancelSpeech not implemented")
  }

  getSupportedLanguages(): string[] {
    return ["en-US"]
  }

  isAvailable(): boolean {
    return false // Force fallback to BrowserVoiceProvider if configured
  }
}
