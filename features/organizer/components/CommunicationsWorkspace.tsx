"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Megaphone, Send, Sparkles, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CommunicationsWorkspace() {
  const [message, setMessage] = React.useState("")
  const [isEnhancing, setIsEnhancing] = React.useState(false)

  const handleEnhance = async () => {
    if (!message.trim()) return
    setIsEnhancing(true)
    // Mocking an AI call to enhance the announcement
    setTimeout(() => {
      setMessage(`Attention all attendees: ${message}. We appreciate your cooperation and patience.`)
      setIsEnhancing(false)
    }, 1500)
  }

  const handleSend = () => {
    setMessage("")
    // In reality this would hit an API to broadcast to the fans via WebSocket
    alert("Broadcast sent to all active Fan dashboards.")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <GlassPanel className="p-6 flex flex-col h-[500px]">
        <div className="flex items-center gap-2 mb-6">
          <Megaphone className="w-5 h-5 text-white" />
          <h3 className="font-semibold text-white">Broadcast Announcement</h3>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Draft emergency or informational broadcast..."
            className="flex-1 bg-surface border border-white/10 rounded-xl p-4 text-white resize-none focus:outline-none focus:border-primary-accent transition-colors"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={handleEnhance} 
              disabled={isEnhancing || !message.trim()}
              className="flex-1 border-ai-accent/30 text-ai-accent hover:bg-ai-accent/10"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isEnhancing ? "Enhancing..." : "AI Enhance"}
            </Button>
            <Button 
              variant="glass" 
              onClick={handleSend}
              disabled={!message.trim()}
              className="flex-1"
            >
              <Send className="w-4 h-4 mr-2" />
              Broadcast Now
            </Button>
          </div>
        </div>
      </GlassPanel>

      <div className="flex flex-col gap-6">
        <GlassPanel className="p-6 bg-white/[0.02] border-dashed border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="w-5 h-5 text-muted-text" />
            <h3 className="font-semibold text-white">Multilingual Translation</h3>
          </div>
          <p className="text-sm text-muted-text mb-4">
            Broadcasts are automatically translated into 5+ supported languages (Spanish, French, Arabic, Hindi, Portuguese) upon transmission using the AEGIS AI Translation Service.
          </p>
          <div className="flex gap-2">
            {['EN', 'ES', 'FR', 'AR', 'HI', 'PT'].map(lang => (
              <div key={lang} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-muted-text">
                {lang}
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 flex-1">
          <h3 className="font-semibold text-white mb-4">Recent Broadcasts</h3>
          <div className="space-y-3">
            <div className="p-3 bg-surface border border-white/5 rounded-lg">
              <div className="text-xs text-muted-text mb-1">14:32 - General Public</div>
              <p className="text-sm text-white">Please be advised that Gate North is currently experiencing high volume. Alternate entry available at Gate West.</p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
