"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSimulationStore } from "@/features/simulation/store/simulationStore"
import { useDigitalTwinStore } from "../store/digitalTwinStore"

// Define the SVG paths and coordinates for each zone
const ZONE_SHAPES: Record<string, { d?: string, x?: number, y?: number, w?: number, h?: number, type: "path" | "rect" | "circle", cx?: number, cy?: number, r?: number }> = {
  // Center Pitch (Not interactive, just for context)
  "pitch": { type: "rect", x: 350, y: 300, w: 300, h: 400 },
  
  // Outer Concourses / Fan Zones
  "fan-zone": { type: "path", d: "M 300 250 L 700 250 L 750 200 L 250 200 Z" }, // North Stand
  "media-zone": { type: "path", d: "M 750 300 L 800 250 L 800 750 L 750 700 Z" }, // East Stand
  "vip-west": { type: "path", d: "M 250 300 L 200 250 L 200 750 L 250 700 Z" }, // West Stand
  "emergency-exit": { type: "path", d: "M 300 750 L 700 750 L 750 800 L 250 800 Z" }, // South Stand
  
  // Gates
  "gate-north": { type: "rect", x: 450, y: 120, w: 100, h: 60 },
  "gate-south": { type: "rect", x: 450, y: 820, w: 100, h: 60 },
  "gate-east": { type: "rect", x: 820, y: 470, w: 60, h: 100 },
  "gate-west": { type: "rect", x: 120, y: 470, w: 60, h: 100 },
  "vip-entrance": { type: "rect", x: 120, y: 350, w: 60, h: 80 },

  // Parking
  "parking-a": { type: "rect", x: 50, y: 50, w: 200, h: 150 }, // NW
  "parking-b": { type: "rect", x: 750, y: 50, w: 200, h: 150 }, // NE
  "parking-c": { type: "rect", x: 50, y: 800, w: 200, h: 150 }, // SW

  // Transport
  "metro-station": { type: "rect", x: 750, y: 850, w: 200, h: 100 }, // SE
  "bus-terminal": { type: "rect", x: 750, y: 730, w: 200, h: 100 }, // SE Inner

  // Services (Food, Restrooms, Medical, Security, Volunteers)
  "food-court-a": { type: "rect", x: 300, y: 150, w: 100, h: 40 }, // North concourse
  "food-court-b": { type: "rect", x: 600, y: 150, w: 100, h: 40 },
  "restrooms": { type: "rect", x: 820, y: 300, w: 40, h: 100 },
  "medical-center": { type: "rect", x: 120, y: 600, w: 60, h: 60 },
  "security-office": { type: "rect", x: 820, y: 650, w: 60, h: 60 },
  "volunteer-hub": { type: "rect", x: 450, y: 760, w: 100, h: 30 },
}

export function StadiumMap() {
  const selectedZoneId = useDigitalTwinStore(state => state.selectedZoneId)
  const setSelectedZoneId = useDigitalTwinStore(state => state.setSelectedZoneId)

  // Handle deselecting when clicking background
  const handleBgClick = () => {
    setSelectedZoneId(null)
  }

  return (
    <div className={`tour-step-map relative w-full h-full flex items-center justify-center bg-[#0a0a0f] overflow-hidden rounded-2xl border border-white/10 ${className}`}>
      
      {/* 3D Map Container */}
      <div 
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <svg 
        viewBox="0 0 1000 1000" 
        className="w-full h-full max-w-[900px] max-h-[900px] drop-shadow-2xl"
        onClick={handleBgClick}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Pitch (Static) */}
        <rect 
          x={320} y={270} w={360} h={460} rx={40}
          fill="rgba(255, 255, 255, 0.02)" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="2"
        />
        <rect 
          x={350} y={300} w={300} h={400} 
          fill="transparent" 
          stroke="rgba(255,255,255,0.15)" 
          strokeWidth="2"
        />
        <circle cx={500} cy={500} r={50} fill="transparent" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <line x1={350} y1={500} x2={650} y2={500} stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

        {/* Dynamic Zones */}
        {Object.entries(ZONE_SHAPES).map(([zoneId, shape]) => {
          if (zoneId === "pitch") return null
          return <ZoneInteractive key={zoneId} zoneId={zoneId} shape={shape} />
        })}
      </svg>
    </div>
  )
}

// Atomic component to prevent re-rendering the whole SVG map when one zone changes
const ZoneInteractive = React.memo(({ zoneId, shape }: { zoneId: string, shape: any }) => {
  const zone = useSimulationStore(state => state.zones[zoneId])
  const activeLayers = useDigitalTwinStore(state => state.activeLayers)
  const selectedZoneId = useDigitalTwinStore(state => state.selectedZoneId)
  const setSelectedZoneId = useDigitalTwinStore(state => state.setSelectedZoneId)

  if (!zone) return null

  const isSelected = selectedZoneId === zoneId

  // Calculate Heatmap Color based on Occupancy
  const ratio = zone.capacity > 0 ? zone.occupancy / zone.capacity : 0
  
  let fillColor = "rgba(255,255,255,0.05)" // Base
  let strokeColor = "rgba(255,255,255,0.2)"
  let alertPulsing = false
  
  if (activeLayers.includes("crowd")) {
    if (ratio > 0.9) {
      fillColor = "rgba(244,63,94,0.6)" // Critical Red
      strokeColor = "rgba(244,63,94,1)"
    } else if (ratio > 0.7) {
      fillColor = "rgba(251,146,60,0.5)" // Warning Orange
      strokeColor = "rgba(251,146,60,1)"
    } else if (ratio > 0.4) {
      fillColor = "rgba(91,140,255,0.3)" // Active Blue
      strokeColor = "rgba(91,140,255,0.8)"
    } else if (ratio > 0) {
      fillColor = "rgba(91,140,255,0.1)" // Low Blue
    }
  }

  // Alerts visual override
  if (zone.status === "Critical" || zone.status === "Closed" || zone.activeAlerts > 0) {
    alertPulsing = true
    if (activeLayers.includes("security") || activeLayers.includes("medical")) {
      strokeColor = "rgba(244,63,94,1)"
      if (zone.status === "Closed") {
        fillColor = "rgba(20,20,20,0.8)"
        strokeColor = "rgba(255,0,0,1)"
      }
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedZoneId(zoneId)
  }

  const ShapeComponent = shape.type === "path" ? motion.path : shape.type === "circle" ? motion.circle : motion.rect

  return (
    <g onClick={handleClick} className="cursor-pointer">
      <ShapeComponent
        {...(shape as any)}
        initial={false}
        animate={{
          fill: isSelected ? "rgba(255,255,255,0.2)" : fillColor,
          stroke: isSelected ? "#ffffff" : strokeColor,
          strokeWidth: isSelected ? 4 : 2,
        }}
        transition={{ duration: 0.5 }}
        className="transition-colors hover:fill-white/20 hover:stroke-white focus:outline-none"
        style={isSelected ? { filter: "url(#glow)" } : undefined}
      />
      
      {/* Alert Indicator */}
      {alertPulsing && (
        <motion.circle
          cx={shape.type === "rect" ? shape.x + shape.w / 2 : shape.cx || 500}
          cy={shape.type === "rect" ? shape.y + shape.h / 2 : shape.cy || 500}
          r={15}
          fill="rgba(244,63,94,0.8)"
          animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      {/* Name Label */}
      {shape.type === "rect" && (
        <text 
          x={shape.x + shape.w / 2} 
          y={shape.y + shape.h / 2} 
          textAnchor="middle" 
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.5)"
          className="text-[10px] font-mono font-bold pointer-events-none"
        >
          {zone.name.split(" ")[0]}
        </text>
      )}
    </g>
  )
})
ZoneInteractive.displayName = "ZoneInteractive"
