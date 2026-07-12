"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-bg">
      <Navbar />
      <main className="flex-1 w-full pt-32 pb-20">
        <motion.div 
          className="container mx-auto px-4 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading 
            title="Privacy Policy" 
            subtitle="How we handle data securely and responsibly."
          />
          
          <div className="mt-12 space-y-8 text-muted-text leading-relaxed">
            <h2 className="text-xl font-display font-semibold text-white">1. Data Collection</h2>
            <p>
              AEGIS collects telemetry data from stadium sensors, opt-in mobile applications, and network infrastructure to build a real-time Digital Twin. We strictly adhere to GDPR, CCPA, and all local regulations.
            </p>
            
            <h2 className="text-xl font-display font-semibold text-white">2. AI Inference Processing</h2>
            <p>
              All video and audio streams processed by our Multi-Agent Network are analyzed in real-time on edge devices. We do not store raw PII (Personally Identifiable Information) unless explicitly flagged for security purposes by an authorized human operator.
            </p>
            
            <h2 className="text-xl font-display font-semibold text-white">3. Data Sharing</h2>
            <p>
              We do not sell data to third parties. Data is only shared with authorized event organizers and local emergency responders strictly for the duration of the event.
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
