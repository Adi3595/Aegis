"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { MailCheck, ArrowRight } from "lucide-react"
import { PublicRoute } from "@/components/auth/PublicRoute"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  return (
    <PublicRoute>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center flex flex-col items-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-accent/10 border border-primary-accent/20 text-primary-accent mb-6 shadow-[inset_0_0_20px_rgba(91,140,255,0.2)]">
          <MailCheck className="h-10 w-10" />
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-4 tracking-tight">Verify Identity</h1>
        
        <p className="text-muted-text max-w-sm mb-8 leading-relaxed">
          We've sent a secure transmission to your email. Please verify your identity to proceed with the onboarding protocol.
        </p>

        <div className="w-full max-w-sm space-y-4">
          <Button variant="default" className="w-full h-12" asChild>
            <Link href="/login">
              Return to Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button variant="ghost" className="w-full">
            Resend Transmission
          </Button>
        </div>
      </motion.div>
    </PublicRoute>
  )
}
