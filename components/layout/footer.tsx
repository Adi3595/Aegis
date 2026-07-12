"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Globe, Briefcase, Code } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { toast } from "@/store/toastStore"

export function Footer() {
  const pathname = usePathname()
  const router = useRouter()
  const isAuthRoute = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email", "/onboarding", "/loading"].includes(pathname)
  const isDashboardRoute = pathname.startsWith("/dashboard")
  const shouldHide = isAuthRoute || isDashboardRoute

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault()
    if (href.startsWith("#")) {
      // @ts-ignore
      if (window.lenis) {
        // @ts-ignore
        window.lenis.scrollTo(href, { offset: -80 })
      } else {
        const target = document.querySelector(href)
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 80,
            behavior: "smooth"
          })
        }
      }
    } else {
      router.push(href)
    }
  }

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
              <button onClick={() => toast.info("GitHub repository will be public soon!")} className="text-muted-text hover:text-white transition-colors" aria-label="GitHub"><Code className="h-5 w-5" /></button>
              <button onClick={() => toast.info("Website is currently in beta.")} className="text-muted-text hover:text-white transition-colors" aria-label="Website"><Globe className="h-5 w-5" /></button>
              <button onClick={() => toast.info("LinkedIn page coming soon!")} className="text-muted-text hover:text-white transition-colors" aria-label="LinkedIn"><Briefcase className="h-5 w-5" /></button>
            </div>
          </div>

          <div className="flex flex-col space-y-4 text-sm">
            <h4 className="font-display font-semibold text-white mb-2">Product</h4>
            <a href="#features" onClick={(e) => handleSmoothScroll(e, "#features")} className="text-muted-text hover:text-primary-accent transition-colors">Features</a>
            <a href="#simulation" onClick={(e) => handleSmoothScroll(e, "#simulation")} className="text-muted-text hover:text-primary-accent transition-colors">Live Simulation</a>
            <a href="#technology" onClick={(e) => handleSmoothScroll(e, "#technology")} className="text-muted-text hover:text-primary-accent transition-colors">Digital Twin</a>
            <a href="#technology" onClick={(e) => handleSmoothScroll(e, "#technology")} className="text-muted-text hover:text-primary-accent transition-colors">Multi-Agent System</a>
          </div>

          <div className="flex flex-col space-y-4 text-sm">
            <h4 className="font-display font-semibold text-white mb-2">Developers</h4>
            <button onClick={() => toast.info("Documentation is being generated...")} className="text-left text-muted-text hover:text-primary-accent transition-colors">Documentation</button>
            <a href="#technology" onClick={(e) => handleSmoothScroll(e, "#technology")} className="text-muted-text hover:text-primary-accent transition-colors">Technology Stack</a>
            <button onClick={() => toast.info("API Reference is being generated...")} className="text-left text-muted-text hover:text-primary-accent transition-colors">API Reference</button>
            <button onClick={() => toast.info("GitHub repository will be public soon!")} className="text-left text-muted-text hover:text-primary-accent transition-colors">GitHub Repository</button>
          </div>

          <div className="flex flex-col space-y-4 text-sm">
            <h4 className="font-display font-semibold text-white mb-2">Company</h4>
            <button onClick={() => toast.info("About page is under construction.")} className="text-left text-muted-text hover:text-primary-accent transition-colors">About</button>
            <button onClick={() => toast.info("Contact form is under construction.")} className="text-left text-muted-text hover:text-primary-accent transition-colors">Contact</button>
            <button onClick={() => toast.info("Privacy Policy will be available soon.")} className="text-left text-muted-text hover:text-primary-accent transition-colors">Privacy Policy</button>
            <button onClick={() => toast.info("Terms of Service will be available soon.")} className="text-left text-muted-text hover:text-primary-accent transition-colors">Terms of Service</button>
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
