export interface IVoiceProvider {
  initialize(): Promise<void>;
  startListening(onResult: (text: string, isFinal: boolean) => void, onError: (error: string) => void): void;
  stopListening(): void;
  speak(text: string, language?: string): Promise<void>;
  cancelSpeech(): void;
  getSupportedLanguages(): string[];
  isAvailable(): boolean;
}
