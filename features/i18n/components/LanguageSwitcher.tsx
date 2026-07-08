"use client"

import * as React from "react"
import { Globe } from "lucide-react"
import { useFanStore, SupportedLanguage } from "@/features/fan/store/fanStore"

const LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
  { code: "pt", label: "Português" },
]

export function LanguageSwitcher() {
  const { preferences, setLanguage } = useFanStore()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md p-2 text-muted-text hover:bg-white/5 hover:text-white transition-colors focus:outline-none"
      >
        <Globe className="h-5 w-5" />
        <span className="text-xs font-semibold uppercase">{preferences.language}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-32 rounded-xl border border-white/10 bg-surface/90 backdrop-blur-xl shadow-2xl p-1 z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                preferences.language === lang.code 
                  ? "bg-primary-accent/20 text-primary-accent" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
