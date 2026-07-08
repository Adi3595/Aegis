"use client"

import * as React from "react"
import { GlassPanel } from "@/components/ui/glass-panel"
import { StadiumMap } from "@/features/digital-twin/components/StadiumMap"
import { Translate } from "@/features/i18n/hooks/useTranslation"

export function FanMapWidget() {
  return (
    <GlassPanel className="p-0 overflow-hidden relative col-span-1 lg:col-span-3 min-h-[400px]">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="font-semibold text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
          <Translate>Interactive Stadium Map</Translate>
        </h3>
      </div>
      <div className="w-full h-full p-2 bg-black">
        {/* We reuse the existing StadiumMap but since it takes full width/height, we just render it here */}
        <StadiumMap />
      </div>
    </GlassPanel>
  )
}
