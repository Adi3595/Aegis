"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Bell, AlertTriangle } from "lucide-react"
import { Translate } from "@/features/i18n/hooks/useTranslation"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"

export function LiveAlertsFeed() {
  const { events } = useSimulationStore()
  
  // Show only active events
  const activeAlerts = events.filter(e => e.status === "active").slice(0, 3)

  return (
    <GlassPanel className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-white" />
          <h3 className="font-semibold text-white"><Translate>Live Alerts</Translate></h3>
        </div>
        {activeAlerts.length > 0 && (
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-error text-[10px] font-bold text-white">
            {activeAlerts.length}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 hide-scrollbar">
        {activeAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-text space-y-2 py-4">
            <Bell className="w-8 h-8 opacity-20" />
            <p className="text-sm"><Translate>All systems nominal. Enjoy the match!</Translate></p>
          </div>
        ) : (
          activeAlerts.map(alert => (
            <div key={alert.id} className="p-3 rounded-xl border border-warning/20 bg-warning/5 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white mb-0.5"><Translate>{alert.title}</Translate></h4>
                <p className="text-xs text-muted-text"><Translate>{alert.description}</Translate></p>
              </div>
            </div>
          ))
        )}
      </div>
    </GlassPanel>
  )
}
