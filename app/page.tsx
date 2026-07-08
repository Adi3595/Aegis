"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { BootSequence } from "@/features/boot/BootSequence"
import { Hero } from "@/features/hero/Hero"
import { LazySection } from "@/features/landing/LazySection"

// Lazy load all heavy landing page sections
const LiveStadiumExperience = dynamic(() => import("@/features/landing/LiveStadiumExperience"), { ssr: false })
const AIThinkingExperience = dynamic(() => import("@/features/landing/AIThinkingExperience"), { ssr: false })
const DigitalTwinPreview = dynamic(() => import("@/features/landing/DigitalTwinPreview"), { ssr: false })
const UserPersonas = dynamic(() => import("@/features/landing/UserPersonas"), { ssr: false })
const MultiAgentNetwork = dynamic(() => import("@/features/landing/MultiAgentNetwork"), { ssr: false })
const LiveSimulation = dynamic(() => import("@/features/landing/LiveSimulation"), { ssr: false })
const PlatformFeatures = dynamic(() => import("@/features/landing/PlatformFeatures"), { ssr: false })
const DashboardPreview = dynamic(() => import("@/features/landing/DashboardPreview"), { ssr: false })
const TechnologyArchitecture = dynamic(() => import("@/features/landing/TechnologyArchitecture"), { ssr: false })
const LiveMetrics = dynamic(() => import("@/features/landing/LiveMetrics"), { ssr: false })
const CallToAction = dynamic(() => import("@/features/landing/CallToAction"), { ssr: false })

export default function Home() {
  const [bootComplete, setBootComplete] = React.useState(false)

  return (
    <main className="flex-1 w-full relative">
      {!bootComplete && (
        <BootSequence onComplete={() => setBootComplete(true)} />
      )}
      
      <div className={`transition-opacity duration-1000 ${bootComplete ? "opacity-100" : "opacity-0"}`}>
        <Hero />
        
        {bootComplete && (
          <div className="flex flex-col w-full relative z-10">
            <LazySection minHeight="min-h-[70vh]">
              <LiveStadiumExperience />
            </LazySection>

            <LazySection minHeight="min-h-[80vh]">
              <AIThinkingExperience />
            </LazySection>

            <LazySection minHeight="min-h-[80vh]">
              <DigitalTwinPreview />
            </LazySection>

            <LazySection minHeight="min-h-[60vh]">
              <UserPersonas />
            </LazySection>

            <LazySection minHeight="min-h-[80vh]">
              <MultiAgentNetwork />
            </LazySection>

            <LazySection minHeight="min-h-[80vh]">
              <LiveSimulation />
            </LazySection>

            <LazySection minHeight="min-h-[70vh]">
              <PlatformFeatures />
            </LazySection>

            <LazySection minHeight="min-h-[90vh]">
              <DashboardPreview />
            </LazySection>

            <LazySection minHeight="min-h-[70vh]">
              <TechnologyArchitecture />
            </LazySection>

            <LazySection minHeight="min-h-[40vh]">
              <LiveMetrics />
            </LazySection>

            <LazySection minHeight="min-h-[50vh]">
              <CallToAction />
            </LazySection>
          </div>
        )}
      </div>
    </main>
  );
}
