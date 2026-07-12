"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen bg-primary-bg">
      {/* Left side: Form content */}
      <div className="flex w-full flex-col justify-between overflow-y-auto lg:w-1/2 p-8 lg:p-12 relative z-10 bg-primary-bg">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-accent to-ai-accent text-primary-bg shadow-lg group-hover:scale-105 transition-transform">
              <Shield className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tighter text-white">
              AEGIS
            </span>
          </Link>
          <div className="text-xs font-mono text-muted-text flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span>SECURE CONNECTION</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        <div className="text-center text-xs text-muted-text">
          &copy; {new Date().getFullYear()} AEGIS Systems. All rights reserved.
        </div>
      </div>

      {/* Right side: Ambient Graphic/Video */}
      <div className="hidden lg:flex w-1/2 relative bg-surface overflow-hidden">
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,212,255,0.1)_0%,transparent_70%)]" />
        
        {/* Placeholder for 3D/Video element */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-lg aspect-square rounded-full border border-white/5 bg-white/5 backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(124,92,255,0.2)] flex items-center justify-center relative"
          >
            <div className="absolute inset-0 rounded-full border border-primary-accent/20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-ai-accent/20 animate-[spin_15s_linear_infinite_reverse]" />
            <Shield className="h-32 w-32 text-white/10" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
