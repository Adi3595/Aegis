import { useState, useEffect } from "react"
import { useFanStore } from "@/features/fan/store/fanStore"

const translationCache = new Map<string, string>()

export function useTranslation(text: string) {
  const { preferences } = useFanStore()
  const targetLanguage = preferences.language
  const [translated, setTranslated] = useState<string>(text)
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    if (!text) {
      setTranslated("")
      return
    }

    if (targetLanguage === "en") {
      setTranslated(text)
      return
    }

    const cacheKey = `${targetLanguage}:${text}`
    if (translationCache.has(cacheKey)) {
      setTranslated(translationCache.get(cacheKey)!)
      return
    }

    let isMounted = true

    const fetchTranslation = async () => {
      setIsTranslating(true)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://aegis-backend-qlx8.onrender.com/api/v1"
        const res = await fetch(`${apiUrl}/ai/translate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // For MVP, just pass mock token if no real auth is required or grab from store
            "Authorization": "Bearer mock" 
          },
          body: JSON.stringify({ text, target_language: targetLanguage })
        })

        if (!res.ok) throw new Error("Translation failed")
        
        const data = await res.json()
        if (isMounted && data.translated) {
          translationCache.set(cacheKey, data.translated)
          setTranslated(data.translated)
        }
      } catch (err) {
        console.error("Translation error:", err)
        // Fallback to original text
        if (isMounted) setTranslated(text)
      } finally {
        if (isMounted) setIsTranslating(false)
      }
    }

    fetchTranslation()

    return () => {
      isMounted = false
    }
  }, [text, targetLanguage])

  return { translated, isTranslating }
}

// A simple component for translating dynamic strings easily in JSX
export function Translate({ children }: { children: string }) {
  const { translated, isTranslating } = useTranslation(children)
  return (
    <span className={isTranslating ? "opacity-50 transition-opacity" : "opacity-100 transition-opacity"}>
      {translated}
    </span>
  )
}
