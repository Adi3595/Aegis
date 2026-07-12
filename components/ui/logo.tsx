import * as React from "react"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      className={cn("h-8 w-auto shrink-0", className)} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="aegis-grad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id="aegis-grad-2" x1="200" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      
      {/* Outer Hexagon / Shield base */}
      <path 
        d="M100 15L180 55V145L100 185L20 145V55L100 15Z" 
        fill="url(#aegis-grad)" 
        fillOpacity="0.1" 
        stroke="url(#aegis-grad)" 
        strokeWidth="6" 
        strokeLinejoin="round"
      />
      
      {/* Inner Core A / Stadium Structure */}
      <path 
        d="M100 40L145 140H115L108 115H92L85 140H55L100 40Z" 
        fill="url(#aegis-grad-2)" 
        stroke="url(#aegis-grad-2)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* Center Intelligence Node */}
      <circle cx="100" cy="80" r="10" fill="#0A0A0A" stroke="#F59E0B" strokeWidth="4" />
      
      {/* Peripheral Data Nodes */}
      <circle cx="55" cy="140" r="5" fill="#34D399" />
      <circle cx="145" cy="140" r="5" fill="#34D399" />
      <circle cx="100" cy="15" r="4" fill="#10B981" />
    </svg>
  )
}
