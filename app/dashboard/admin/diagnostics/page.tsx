"use client"

import * as React from "react"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useRouter } from "next/navigation"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Activity, Server, Zap, Database, Terminal, Cpu } from "lucide-react"

export default function DiagnosticsDashboard() {
  const router = useRouter()
  const { user } = useAuthStore()

  // Strict environment and role check
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "development" || user?.role !== "Administrator") {
      router.replace("/dashboard")
    }
  }, [user, router])

  if (process.env.NODE_ENV !== "development" || user?.role !== "Administrator") {
    return null
  }

  return (
    <div className="space-y-6 h-full flex flex-col p-2">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-error/20 text-error rounded-xl">
          <Terminal className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Developer Diagnostics</h1>
          <p className="text-muted-text">Internal monitoring panel. Not visible in production.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Memory Stats Mockup */}
        <GlassPanel className="p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Cpu className="w-20 h-20" />
          </div>
          <div className="flex items-center gap-2 text-primary-accent mb-2">
            <Cpu className="w-4 h-4" />
            <span className="font-semibold text-sm tracking-widest uppercase">Client Memory</span>
          </div>
          <div className="text-3xl font-display font-bold text-white mb-1">
            {typeof window !== 'undefined' && (performance as any).memory ? 
              Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 142} MB
          </div>
          <div className="text-xs text-muted-text">Browser JS Heap Size</div>
        </GlassPanel>

        {/* WebSocket Latency Mockup */}
        <GlassPanel className="p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap className="w-20 h-20" />
          </div>
          <div className="flex items-center gap-2 text-warning mb-2">
            <Zap className="w-4 h-4" />
            <span className="font-semibold text-sm tracking-widest uppercase">WS Latency</span>
          </div>
          <div className="text-3xl font-display font-bold text-white mb-1">
            42ms
          </div>
          <div className="text-xs text-muted-text">Simulation Engine PING</div>
        </GlassPanel>

        {/* API Response Mockup */}
        <GlassPanel className="p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Server className="w-20 h-20" />
          </div>
          <div className="flex items-center gap-2 text-ai-accent mb-2">
            <Server className="w-4 h-4" />
            <span className="font-semibold text-sm tracking-widest uppercase">API Latency</span>
          </div>
          <div className="text-3xl font-display font-bold text-white mb-1">
            185ms
          </div>
          <div className="text-xs text-muted-text">P95 Response Time</div>
        </GlassPanel>

        {/* Database Stats Mockup */}
        <GlassPanel className="p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Database className="w-20 h-20" />
          </div>
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Database className="w-4 h-4" />
            <span className="font-semibold text-sm tracking-widest uppercase">Redis Cache</span>
          </div>
          <div className="text-3xl font-display font-bold text-white mb-1">
            98.2%
          </div>
          <div className="text-xs text-muted-text">Cache Hit Ratio</div>
        </GlassPanel>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[400px]">
        <GlassPanel className="p-6 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-error" />
            Recent Errors (Last 1hr)
          </h2>
          <div className="flex-1 rounded-lg bg-black/40 border border-white/10 p-4 overflow-y-auto font-mono text-sm space-y-3">
            <div className="text-error border-l-2 border-error pl-3 py-1 bg-error/5">
              [14:32:01] Rate limit exceeded for 192.168.1.5 on /api/v1/ai/stream
            </div>
            <div className="text-warning border-l-2 border-warning pl-3 py-1 bg-warning/5">
              [14:28:45] WebSocket client disconnected ungracefully (1006)
            </div>
            <div className="text-error border-l-2 border-error pl-3 py-1 bg-error/5">
              [14:15:10] SQLAlchemy.TimeoutError on simulation_state write
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-accent" />
            Background Tasks
          </h2>
          <div className="flex-1 space-y-4">
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
              <div>
                <div className="font-semibold text-white">Digital Twin Synchronization</div>
                <div className="text-xs text-muted-text">Redis PubSub -> WebSocket Broadcast</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-accent animate-pulse" />
                <span className="text-xs text-primary-accent uppercase tracking-widest">Running</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
              <div>
                <div className="font-semibold text-white">Predictive Analytics Generator</div>
                <div className="text-xs text-muted-text">Runs every 1m</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-text uppercase tracking-widest">Idle</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
              <div>
                <div className="font-semibold text-white">Database Snapshot</div>
                <div className="text-xs text-muted-text">PostgreSQL flush</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ai-accent animate-pulse" />
                <span className="text-xs text-ai-accent uppercase tracking-widest">Writing</span>
              </div>
            </div>

          </div>
        </GlassPanel>
      </div>
    </div>
  )
}
