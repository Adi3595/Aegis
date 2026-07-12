"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Megaphone, Globe2, Send, Wand2, ShieldAlert } from "lucide-react"

export default function AnnouncementsPage() {
  const [title, setTitle] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [category, setCategory] = React.useState("Info")
  const [priority, setPriority] = React.useState("Info")
  const [targetRoles, setTargetRoles] = React.useState<string[]>(["fan", "volunteer", "security", "medical", "organizer"])
  
  const [translatedPreview, setTranslatedPreview] = React.useState("")
  const [targetLang, setTargetLang] = React.useState("es")
  const [isTranslating, setIsTranslating] = React.useState(false)
  const [isSending, setIsSending] = React.useState(false)

  const handleTranslatePreview = async () => {
    setIsTranslating(true)
    try {
      const res = await fetch("https://aegis-backend-qlx8.onrender.com/api/v1/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message, target_language: targetLang })
      })
      const data = await res.json()
      setTranslatedPreview(data.translated_text)
    } catch (err) {
      console.error(err)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleBroadcast = async () => {
    setIsSending(true)
    try {
      await fetch("https://aegis-backend-qlx8.onrender.com/api/v1/notifications/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          message,
          category,
          priority,
          roles: targetRoles.length === 5 ? null : targetRoles // null means all
        })
      })
      // Clear form
      setTitle("")
      setMessage("")
      setTranslatedPreview("")
    } catch (err) {
      console.error(err)
    } finally {
      setIsSending(false)
    }
  }

  const toggleRole = (role: string) => {
    setTargetRoles(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    )
  }

  return (
    <div className="flex flex-col gap-6 h-full max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-ai-accent/20 rounded-xl">
          <Megaphone className="w-6 h-6 text-ai-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Announcement Center</h1>
          <p className="text-muted-text">Draft and broadcast real-time messages across the venue.</p>
        </div>
      </div>

      <GlassPanel className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Announcement Title</label>
            <Input 
              placeholder="e.g. Weather Update: Approaching Storm" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-white">Message Body</label>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-ai-accent">
                <Wand2 className="w-3 h-3 mr-1" /> AI Enhance
              </Button>
            </div>
            <Textarea 
              placeholder="Enter the main announcement text..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-black/20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-accent"
              >
                <option value="Info">General Info</option>
                <option value="Operations">Operations</option>
                <option value="Transportation">Transportation</option>
                <option value="Weather">Weather</option>
                <option value="Security">Security</option>
                <option value="Medical">Medical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Priority Level</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-accent"
              >
                <option value="Info">Info (Standard)</option>
                <option value="Warning">Warning (Important)</option>
                <option value="Emergency">Emergency (Critical Takeover)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Target Audience (Roles)</label>
            <div className="flex flex-wrap gap-2">
              {['fan', 'volunteer', 'security', 'medical', 'organizer'].map(role => (
                <button
                  key={role}
                  onClick={() => toggleRole(role)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-colors ${
                    targetRoles.includes(role) 
                      ? 'bg-primary-accent/20 text-primary-accent border border-primary-accent/50' 
                      : 'bg-white/5 text-muted-text border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Multilingual Preview */}
          <div className="p-4 bg-surface/50 border border-white/10 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-white">Translation Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                >
                  <option value="es">Spanish (ES)</option>
                  <option value="fr">French (FR)</option>
                  <option value="de">German (DE)</option>
                  <option value="zh">Chinese (ZH)</option>
                </select>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 text-xs border-white/20"
                  onClick={handleTranslatePreview}
                  disabled={!message || isTranslating}
                >
                  {isTranslating ? 'Translating...' : 'Translate'}
                </Button>
              </div>
            </div>
            <div className="min-h-[60px] p-3 bg-black/20 rounded-lg text-sm text-muted-text italic">
              {translatedPreview || "Translation preview will appear here..."}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <Button 
              onClick={handleBroadcast}
              disabled={!title || !message || isSending || targetRoles.length === 0}
              className={`px-8 py-6 text-lg font-bold shadow-lg flex items-center gap-2 ${
                priority === 'Emergency' ? 'bg-error hover:bg-error-light text-white' : 'bg-primary-accent text-primary-bg'
              }`}
            >
              {priority === 'Emergency' ? <ShieldAlert className="w-5 h-5" /> : <Send className="w-5 h-5" />}
              {isSending ? 'Broadcasting...' : priority === 'Emergency' ? 'TRIGGER EMERGENCY ALERT' : 'Broadcast Now'}
            </Button>
          </div>

        </div>
      </GlassPanel>
    </div>
  )
}
