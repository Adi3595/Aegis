"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Monitor, Terminal, FileText, Settings, User } from "lucide-react"
import { useLayoutStore } from "@/store/layoutStore"

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPalette } = useLayoutStore()
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Handle Cmd+K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandPalette(!commandPaletteOpen)
      }
      if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPalette(false)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [commandPaletteOpen, setCommandPalette])

  // Focus input when opened
  React.useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery("")
    }
  }, [commandPaletteOpen])

  // Mock results
  const results = [
    { icon: Monitor, label: "View Live Simulation", shortcut: "G S" },
    { icon: Terminal, label: "Run Agent Diagnostic", shortcut: "" },
    { icon: FileText, label: "Export Incident Report", shortcut: "E R" },
    { icon: Settings, label: "System Settings", shortcut: "G ," },
    { icon: User, label: "Profile Preferences", shortcut: "G P" },
  ].filter(r => r.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPalette(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-surface/90 shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex items-center border-b border-white/10 px-4">
              <Search className="h-5 w-5 text-muted-text" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, pages, and agents..."
                className="flex h-16 w-full rounded-md bg-transparent px-4 py-3 text-lg text-white outline-none placeholder:text-muted-text/50"
              />
              <div className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-muted-text">
                <kbd className="rounded border border-white/20 bg-white/5 px-1.5 py-0.5">ESC</kbd>
                <span>to close</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
              {results.length === 0 ? (
                <div className="py-14 text-center text-sm text-muted-text">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="px-2 pb-2 pt-4 text-xs font-semibold text-muted-text uppercase tracking-wider">
                    Suggestions
                  </div>
                  {results.map((result, i) => (
                    <button
                      key={i}
                      className="group flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm text-muted-text hover:bg-white/5 hover:text-white transition-colors focus:bg-white/5 focus:text-white focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <result.icon className="h-5 w-5 text-muted-text group-hover:text-primary-accent transition-colors" />
                        <span>{result.label}</span>
                      </div>
                      {result.shortcut && (
                        <div className="flex items-center gap-1 font-mono text-[10px]">
                          {result.shortcut.split(" ").map((s, j) => (
                            <kbd key={j} className="rounded border border-white/20 bg-black/30 px-1.5 py-0.5 shadow-sm text-white/50 group-hover:text-white/80 transition-colors">
                              {s}
                            </kbd>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t border-white/10 bg-black/20 p-3 text-xs text-muted-text text-center sm:text-left flex items-center justify-between">
              <div className="hidden sm:flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="rounded border border-white/20 px-1.5 font-mono text-[10px]">↑</kbd><kbd className="rounded border border-white/20 px-1.5 font-mono text-[10px]">↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="rounded border border-white/20 px-1.5 font-mono text-[10px]">↵</kbd> to select</span>
              </div>
              <span className="text-ai-accent/70 font-mono tracking-tight mx-auto sm:mx-0">AEGIS COMMAND PROTOCOL</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
