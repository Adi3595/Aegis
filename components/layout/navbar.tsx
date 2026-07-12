"use client"

import * as React from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { Shield, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  
  const pathname = usePathname()
  const isAuthRoute = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email", "/onboarding", "/loading"].includes(pathname)
  const isDashboardRoute = pathname.startsWith("/dashboard")
  const shouldHide = isAuthRoute || isDashboardRoute

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    
    // Glassmorphism toggle
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }

    // Hide/Reveal logic based on scroll direction
    if (latest > 150 && latest > previous) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Technology", href: "#technology" },
    { name: "Simulation", href: "#simulation" },
    { name: "Dashboards", href: "#dashboards" },
    { name: "About", href: "#about" },
  ]

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    
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
  }

  if (shouldHide) return null

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 z-50 w-full transition-colors duration-300",
          isScrolled 
            ? "border-b border-white/10 bg-primary-bg/80 backdrop-blur-md shadow-lg" 
            : "bg-transparent border-transparent"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={(e) => handleSmoothScroll(e as any, 'body')}>
            <Logo className="h-10 w-auto" />
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              AEGIS
            </span>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-white/80" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="hover:text-primary-accent transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent rounded-sm px-1 py-0.5"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/10" aria-label="System Status: Online">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono text-muted-text">SYSTEM ONLINE</span>
            </div>
            <Link href="/dashboard" className="hidden xl:flex">
              <Button variant="glass" size="sm">
                Launch Platform
              </Button>
            </Link>
          </div>

          <button 
            className="lg:hidden text-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent rounded-md"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-primary-bg/95 backdrop-blur-xl flex flex-col p-8 lg:hidden"
            role="dialog"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex justify-end">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent rounded-md"
                aria-label="Close menu"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
            <nav className="flex flex-col space-y-8 mt-12 text-2xl font-display font-medium text-white/90">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="hover:text-primary-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent rounded-md"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-8 border-t border-white/10">
                <Link href="/dashboard" className="w-full">
                  <Button className="w-full h-14 text-lg">Launch Platform</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
