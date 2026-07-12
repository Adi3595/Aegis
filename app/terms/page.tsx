"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
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
            title="Terms of Service" 
            subtitle="Agreements for using the AEGIS Intelligence Platform."
          />
          
          <div className="mt-12 space-y-8 text-muted-text leading-relaxed">
            <h2 className="text-xl font-display font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing the AEGIS dashboard or utilizing our API, you agree to these Terms of Service. This platform is strictly for authorized stadium operators and security personnel.
            </p>
            
            <h2 className="text-xl font-display font-semibold text-white">2. Platform Usage</h2>
            <p>
              The AI models provided by AEGIS are designed to augment human decision-making, not replace it. All critical security and medical decisions must be verified by a human operator. AEGIS is not liable for actions taken based solely on AI inference without human oversight.
            </p>
            
            <h2 className="text-xl font-display font-semibold text-white">3. Service Level Agreement</h2>
            <p>
              We guarantee 99.99% uptime during active events. Maintenance windows are strictly scheduled outside of operational hours.
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
