"use client"

import * as React from "react"
import { Send, Bot, User, Sparkles, Loader2, AlertCircle } from "lucide-react"
import { useAIStore } from "../store/aiStore"
import { orchestrator } from "../engine/Orchestrator"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Button } from "@/components/ui/button"
import { AgentVisualizer } from "./AgentVisualizer"
import { ExplainabilityPanel } from "./ExplainabilityPanel"

const SUGGESTED_PROMPTS = [
  "Find the fastest gate.",
  "What happens if Gate B closes?",
  "Nearest medical center."
]

export function AIChatPanel() {
  const { messages, isGenerating, activeMilestone, metadata } = useAIStore()
  const [input, setInput] = React.useState("")
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return
    const query = input.trim()
    setInput("")
    orchestrator.ask(query)
  }

  const handleSuggested = (prompt: string) => {
    if (isGenerating) return
    orchestrator.ask(prompt)
  }

  return (
    <GlassPanel className="tour-step-ai flex flex-col h-full overflow-hidden p-0 w-80 lg:w-96 shrink-0 border-l border-white/5 rounded-none md:rounded-2xl shadow-2xl">
      <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-ai-accent" />
          <h2 className="font-display font-semibold text-white">AI Orchestrator</h2>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 hide-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`flex items-end gap-2 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-primary-accent/20 text-primary-accent' : 
                msg.role === 'system' ? 'bg-warning/20 text-warning' : 
                'bg-ai-accent/20 text-ai-accent'
              }`}>
                {msg.role === 'user' ? <User className="h-3 w-3" /> : 
                 msg.role === 'system' ? <AlertCircle className="h-3 w-3" /> : 
                 <Bot className="h-3 w-3" />}
              </div>

              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary-accent/10 border border-primary-accent/20 text-white rounded-br-sm' 
                  : msg.role === 'system'
                    ? 'bg-warning/10 border border-warning/20 text-warning rounded-bl-sm text-xs'
                    : 'bg-white/5 border border-white/10 text-white rounded-bl-sm'
              }`}>
                {msg.content}
              </div>

            </div>

            {/* Rich Recommendation Card UI */}
            {msg.recommendation && (
              <div className="mt-2 ml-8 w-full max-w-[90%] bg-surface/50 border border-ai-accent/20 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    msg.recommendation.priority === 'Critical' ? 'bg-error/20 text-error' :
                    msg.recommendation.priority === 'High' ? 'bg-warning/20 text-warning' :
                    'bg-primary-accent/20 text-primary-accent'
                  }`}>
                    {msg.recommendation.priority} Priority
                  </span>
                  <span className="text-xs text-ai-accent font-mono font-semibold">
                    {msg.recommendation.confidenceScore}% Confidence
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">{msg.recommendation.title}</h4>
                  <ul className="text-xs text-muted-text space-y-1 list-disc pl-4">
                    {msg.recommendation.reasoning.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
                
                {msg.metadata?.activeAgents && (
                  <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1">
                    {msg.metadata.activeAgents.map(agent => (
                      <span key={agent} className="text-[10px] bg-white/5 text-white/60 px-1.5 py-0.5 rounded-sm">
                        {agent}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-ai-accent text-sm mb-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Orchestrating Multi-Agent Pipeline...
            </div>
            <AgentVisualizer activeMilestone={activeMilestone as any} />
          </div>
        )}

        {!isGenerating && metadata && messages.length > 1 && (
          <ExplainabilityPanel metadata={metadata} />
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-white/[0.02]">
        {/* Suggested Prompts */}
        {messages.length < 3 && !isGenerating && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3 pb-1">
            {SUGGESTED_PROMPTS.map(p => (
              <button 
                key={p} 
                onClick={() => handleSuggested(p)}
                className="shrink-0 text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-muted-text hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
            placeholder="Ask AI Orchestrator..."
            className="w-full panel-solid pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-ai-accent transition-colors disabled:opacity-50"
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            disabled={!input.trim() || isGenerating}
            className="absolute right-1 h-9 w-9 text-ai-accent hover:text-white hover:bg-ai-accent"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </GlassPanel>
  )
}
