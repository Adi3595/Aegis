"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Shield, Code, Globe, Briefcase } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  const pathname = usePathname()
  const isAuthRoute = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email", "/onboarding", "/loading"].includes(pathname)
  const isDashboardRoute = pathname.startsWith("/dashboard")
  const shouldHide = isAuthRoute || isDashboardRoute

  if (shouldHide) return null

  return (
    <footer className="w-full border-t border-white/10 bg-surface/30 backdrop-blur-md mt-auto py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-6">
              <Logo className="h-8 w-auto" />
              <span className="font-display text-xl font-bold tracking-tight text-white">
                AEGIS
              </span>
            </div>
            <p className="text-sm text-muted-text max-w-sm mb-6">
              The intelligence operating system for modern mega-events. Powering FIFA World Cup 2026 with autonomous AI agents and real-time digital twins.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-text hover:text-white transition-colors" aria-label="GitHub"><Code className="h-5 w-5" /></a>
              <a href="#" className="text-muted-text hover:text-white transition-colors" aria-label="Website"><Globe className="h-5 w-5" /></a>
              <a href="#" className="text-muted-text hover:text-white transition-colors" aria-label="LinkedIn"><Briefcase className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="flex flex-col space-y-4 text-sm">
            <h4 className="font-display font-semibold text-white mb-2">Product</h4>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">Features</a>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">Live Simulation</a>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">Digital Twin</a>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">Multi-Agent System</a>
          </div>

          <div className="flex flex-col space-y-4 text-sm">
            <h4 className="font-display font-semibold text-white mb-2">Developers</h4>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">Documentation</a>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">Technology Stack</a>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">API Reference</a>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">GitHub Repository</a>
          </div>

          <div className="flex flex-col space-y-4 text-sm">
            <h4 className="font-display font-semibold text-white mb-2">Company</h4>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">About</a>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">Contact</a>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-text hover:text-primary-accent transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-text">
          <p>© 2026 AEGIS Stadium Intelligence. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
