"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"

import { forgotPasswordSchema, ForgotPasswordFormData } from "@/features/auth/schemas/authSchemas"
import { authService } from "@/features/auth/services/authService"
import { toast } from "@/store/toastStore"
import { PublicRoute } from "@/components/auth/PublicRoute"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true)
      await authService.forgotPassword(data)
      setIsSubmitted(true)
      toast.success("Recovery protocol initiated", "Check your secure email for instructions.")
    } catch (error: any) {
      toast.error("Recovery failed", error.message || "An error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PublicRoute>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">Recover Access</h1>
          <p className="text-muted-text">Initiate a password reset sequence.</p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-success/20 bg-success/5 p-6 flex flex-col items-center text-center space-y-4 backdrop-blur-xl"
          >
            <CheckCircle2 className="h-12 w-12 text-success" />
            <h3 className="font-semibold text-white text-lg">Signal Transmitted</h3>
            <p className="text-sm text-muted-text">
              If the email matches an active operative, recovery instructions have been sent.
            </p>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/login">Return to Login</Link>
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Secure Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-text/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="operative@aegis.ai"
                  className="pl-10"
                  error={!!errors.email}
                  {...register("email")}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-error mt-1">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Transmit Signal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}

        {!isSubmitted && (
          <div className="mt-8 text-center text-sm text-muted-text">
            Remembered your passkey?{" "}
            <Link href="/login" className="text-white hover:text-primary-accent transition-colors font-medium">
              Initialize Session
            </Link>
          </div>
        )}
      </motion.div>
    </PublicRoute>
  )
}
