"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SearchX, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-bg">
      <Navbar />
      <main className="flex-1 w-full flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="mx-auto w-20 h-20 rounded-full bg-surface/50 border border-white/10 flex items-center justify-center mb-6">
            <SearchX className="h-10 w-10 text-muted-text" />
          </div>
          
          <h1 className="font-display text-4xl font-bold text-white tracking-tight">404</h1>
          <h2 className="text-xl font-semibold text-white/80">Sector Not Found</h2>
          
          <p className="text-muted-text">
            The operational sector you are trying to access does not exist in the current simulation timeline.
          </p>

          <div className="pt-6">
            <Link href="/">
              <Button size="lg" className="flex items-center space-x-2 w-full justify-center">
                <Home className="h-5 w-5" />
                <span>Return to Base Command</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
