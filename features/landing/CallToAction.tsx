"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/animations/advanced"
import { Slide } from "@/animations"

export default function CallToAction() {
  return (
    <div className="relative py-32 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute inset-0 bg-primary-bg z-0" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.15),transparent_60%)] z-0 pointer-events-none" />
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(50,212,255,0.2),transparent_70%)] z-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <Slide direction="up">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl mb-6">
            Ready to Experience the Future of Stadium Intelligence?
          </h2>
        </Slide>
        
        <Slide direction="up" delay={0.2}>
          <p className="text-xl text-muted-text max-w-2xl mb-12">
            Join the revolution for FIFA World Cup 2026. Deploy autonomous agents, optimize operations, and ensure safety at unprecedented scales.
          </p>
        </Slide>

        <Slide direction="up" delay={0.4} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <MagneticButton>
            <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto relative group overflow-hidden">
              <span className="relative z-10">Launch Platform</span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[ripple_1s_ease-in-out_infinite]" />
            </Button>
          </MagneticButton>
          
          <MagneticButton>
            <Button variant="glass" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
              Watch Live Simulation
            </Button>
          </MagneticButton>
        </Slide>

        <Slide direction="up" delay={0.6} className="mt-8 flex items-center space-x-6 text-sm font-medium text-muted-text">
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
        </Slide>
      </div>
    </div>
  )
}
