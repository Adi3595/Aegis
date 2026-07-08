"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Shield, Sparkles, Activity, Map, Video } from "lucide-react"
import { useAuthStore } from "@/features/auth/store/authStore"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Button } from "@/components/ui/button"

export default function RoleDashboardPage(props: { params: Promise<{ role: string }> }) {
  const params = React.use(props.params)
  const { user } = useAuthStore()

  // Format the role for display (e.g. "fan" -> "Fan", "organizer" -> "Organizer")
  const roleDisplay = params.role.charAt(0).toUpperCase() + params.role.slice(1)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-2">
            {roleDisplay} Command Center
          </h1>
          <p className="text-muted-text">
            Welcome back, {user?.name || "Operative"}. Systems are running nominally.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9">
            Generate Report
          </Button>
          <Button variant="glass" className="h-9">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Actions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Active AI Agents", value: "1,204", change: "+12%", icon: Sparkles },
          { title: "System Latency", value: "12ms", change: "-2ms", icon: Activity },
          { title: "Active Sectors", value: "32/32", change: "Nominal", icon: Map },
          { title: "Live Feeds", value: "142", change: "Stable", icon: Video },
        ].map((stat, i) => (
          <GlassPanel key={i} className="p-5 flex flex-col justify-between" interactive>
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-medium text-muted-text">{stat.title}</span>
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                <stat.icon className="h-4 w-4 text-primary-accent" />
              </div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-success">{stat.change} from last hour</div>
            </div>
          </GlassPanel>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <GlassPanel className="lg:col-span-2 p-6 min-h-[400px] flex flex-col items-center justify-center border-dashed border-white/20 bg-white/5">
          <Activity className="h-12 w-12 text-white/20 mb-4" />
          <h3 className="font-semibold text-white mb-2">Business Widgets Placeholder</h3>
          <p className="text-sm text-muted-text text-center max-w-sm">
            This sector is reserved for {roleDisplay}-specific real-time telemetry, charts, and AI agent visualizations.
          </p>
        </GlassPanel>

        <GlassPanel className="p-6 min-h-[400px] flex flex-col items-center justify-center border-dashed border-white/20 bg-white/5">
          <Shield className="h-12 w-12 text-white/20 mb-4" />
          <h3 className="font-semibold text-white mb-2">Recent Activity</h3>
          <p className="text-sm text-muted-text text-center">
            System logs and event streams will mount here.
          </p>
        </GlassPanel>
      </div>
    </div>
  )
}
