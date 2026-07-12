"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function AboutPage() {
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
            title="About AEGIS" 
            subtitle="Pioneering the future of autonomous stadium intelligence."
            align="center"
          />
          
          <div className="mt-12 space-y-8 text-muted-text leading-relaxed">
            <p className="text-lg">
              AEGIS (Autonomous Event Generation & Intelligence System) was conceptualized to solve the unprecedented logistical, security, and operational challenges of modern mega-events. As the world prepares for the FIFA World Cup 2026, the need for a cohesive, real-time intelligence platform has never been more critical.
            </p>
            <p>
              By leveraging cutting-edge Generative AI, real-time Digital Twins, and a massive Multi-Agent Network, AEGIS transforms passive stadiums into active, thinking entities. Our platform ingests millions of data points per second—from IoT sensors and CCTV grids to mobile app telemetry—and synthesizes it into actionable intelligence for human operators.
            </p>
            <p>
              Our mission is simple: To ensure that every fan, volunteer, and organizer experiences a perfectly orchestrated, flawlessly secure, and remarkably efficient event. 
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
