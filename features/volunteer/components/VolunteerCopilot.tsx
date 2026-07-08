"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Send, ChevronUp, ChevronDown, Navigation, AlertTriangle, ShieldAlert, HeartPulse, MessageSquare } from "lucide-react"
import { orchestrator } from "@/features/ai/engine/Orchestrator"

type SheetState = "collapsed" | "half" | "full"

const QUICK_ACTIONS = [
  { id: "nav", label: "Navigate to Task", icon: Navigation },
  { id: "report", label: "Report Incident", icon: AlertTriangle },
  { id: "assist", label: "Request Backup", icon: ShieldAlert },
  { id: "medical", label: "Find Medical", icon: HeartPulse },
  { id: "translate", label: "Translate", icon: MessageSquare },
]

export function VolunteerCopilot() {
  const [sheetState, setSheetState] = React.useState<SheetState>("collapsed")
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<{role: "user" | "ai", text: string}[]>([])
  const [isTyping, setIsTyping] = React.useState(false)

  const handleSend = async (text: string) => {
    if (!text.trim()) return
    
    if (sheetState === "collapsed") {
      setSheetState("half")
    }

    setMessages(prev => [...prev, { role: "user", text }])
    setInput("")
    setIsTyping(true)

    try {
      await orchestrator.ask(text)
      setMessages(prev => [...prev, { role: "ai", text: "Your request has been received. Please check the main AI Workspace for a detailed response." }])
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", text: "Connection error. Please check offline instructions." }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleAction = (label: string) => {
    handleSend(label)
  }

  const toggleState = () => {
    if (sheetState === "collapsed") setSheetState("half")
    else if (sheetState === "half") setSheetState("full")
    else setSheetState("half")
  }

  const heights = {
    collapsed: "h-16",
    half: "h-[50vh]",
    full: "h-[90vh]"
  }

  return (
    <div className="lg:hidden fixed bottom-16 left-0 right-0 z-50 flex flex-col items-center pb-safe">
      <motion.div
        layout
        initial={false}
        animate={{
          height: sheetState === "collapsed" ? 64 : sheetState === "half" ? "50vh" : "90vh"
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        className="w-full max-w-md bg-surface/95 backdrop-blur-xl border-t border-x border-white/10 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Handle / Header */}
        <div 
          onClick={toggleState}
          className="h-16 shrink-0 flex items-center justify-between px-6 cursor-pointer border-b border-white/5 active:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-ai-accent/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-ai-accent" />
            </div>
            <span className="font-semibold text-white">AI Copilot</span>
          </div>
          <div className="flex items-center text-muted-text">
            {sheetState === "collapsed" ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {sheetState !== "collapsed" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col min-h-0"
            >
              {/* Quick Actions (Horizontal scroll) */}
              <div className="flex gap-2 overflow-x-auto hide-scrollbar p-4 shrink-0 border-b border-white/5">
                {QUICK_ACTIONS.map(action => (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action.label)}
                    className="flex flex-col items-center justify-center gap-2 min-w-[80px] p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    <action.icon className="w-5 h-5 text-ai-accent" />
                    <span className="text-[10px] font-medium">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-text text-sm mt-8">
                    <Sparkles className="w-8 h-8 opacity-20 mx-auto mb-2" />
                    <p>I know your active task and location.</p>
                    <p>How can I assist you?</p>
                  </div>
                ) : (
                  messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${m.role === "user" ? "bg-primary-accent text-primary-bg rounded-br-none" : "bg-white/10 text-white rounded-bl-none"}`}>
                        {m.text}
                      </div>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white/5 rounded-bl-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-ai-accent rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-ai-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-ai-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 shrink-0 bg-surface/50">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask AEGIS..."
                    className="w-full bg-black/40 border border-white/20 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-ai-accent"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="absolute right-1 top-1 bottom-1 w-10 bg-ai-accent/20 text-ai-accent rounded-full flex items-center justify-center disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
