"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { useVolunteerStore } from "@/features/volunteer/store/volunteerStore"
import { Camera, AlertTriangle, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function IncidentReporter() {
  const { addIncidentReport } = useVolunteerStore()
  const [category, setCategory] = React.useState("Crowd")
  const [zoneId, setZoneId] = React.useState("gate-north")
  const [description, setDescription] = React.useState("")
  const [priority, setPriority] = React.useState("Medium")
  const [isGenerating, setIsGenerating] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description) return

    addIncidentReport({
      category,
      zoneId,
      description,
      priority,
    })

    setDescription("")
    alert(!navigator.onLine ? "Saved offline. Will sync when connection is restored." : "Incident reported successfully.")
  }

  const handleAIEnhance = () => {
    if (!description) return
    setIsGenerating(true)
    setTimeout(() => {
      setDescription(`Observed ${category.toLowerCase()} issue at ${zoneId}: ${description}. Requires immediate assessment.`)
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <GlassPanel className="p-6 h-full overflow-y-auto hide-scrollbar">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <h3 className="font-semibold text-white">Report Field Incident</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-text uppercase tracking-wider mb-2">Category</label>
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-ai-accent"
          >
            {["Crowd", "Medical", "Security", "Infrastructure", "Lost Child", "Accessibility", "Cleanliness"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-text uppercase tracking-wider mb-2">Zone</label>
          <select 
            value={zoneId} 
            onChange={e => setZoneId(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-ai-accent"
          >
            {["gate-north", "gate-south", "gate-east", "gate-west", "food-court-a", "medical-center", "pitch"].map(z => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-text uppercase tracking-wider mb-2">Description</label>
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-surface border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-ai-accent resize-none"
            placeholder="Describe the situation..."
          />
          <div className="flex justify-end mt-2">
            <button 
              type="button"
              onClick={handleAIEnhance}
              disabled={isGenerating || !description}
              className="text-xs text-ai-accent flex items-center gap-1 hover:underline disabled:opacity-50"
            >
              <Sparkles className="w-3 h-3" />
              {isGenerating ? "Formatting..." : "AI Auto-Format"}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-text uppercase tracking-wider mb-2">Priority</label>
          <div className="flex gap-2">
            {["Low", "Medium", "High", "Critical"].map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium border ${
                  priority === p 
                    ? p === 'Critical' ? 'bg-error/20 border-error text-error' 
                    : p === 'High' ? 'bg-warning/20 border-warning text-warning'
                    : 'bg-primary-accent/20 border-primary-accent text-primary-accent'
                    : 'bg-white/5 border-white/10 text-muted-text hover:bg-white/10'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button type="button" variant="outline" className="flex-1 border-white/10 hover:bg-white/5">
            <Camera className="w-4 h-4 mr-2" />
            Photo
          </Button>
          <Button type="submit" variant="glass" disabled={!description} className="flex-1">
            <Send className="w-4 h-4 mr-2" />
            Submit
          </Button>
        </div>
      </form>
    </GlassPanel>
  )
}
