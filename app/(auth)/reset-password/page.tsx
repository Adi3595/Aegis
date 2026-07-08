"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, ArrowRight, Loader2, ShieldCheck } from "lucide-react"

import { resetPasswordSchema, ResetPasswordFormData } from "@/features/auth/schemas/authSchemas"
import { authService } from "@/features/auth/services/authService"
import { toast } from "@/store/toastStore"
import { PublicRoute } from "@/components/auth/PublicRoute"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || "mock-token"
  
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true)
      await authService.resetPassword(data, token)
      setIsSuccess(true)
      toast.success("Security Updated", "Your passkey has been reset successfully.")
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error: any) {
      toast.error("Reset failed", error.message || "An error occurred.")
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
          <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">Update Passkey</h1>
          <p className="text-muted-text">Secure your identity with a new passkey.</p>
        </div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-success/20 bg-success/5 p-6 flex flex-col items-center text-center space-y-4 backdrop-blur-xl"
          >
            <ShieldCheck className="h-12 w-12 text-success" />
            <h3 className="font-semibold text-white text-lg">Identity Secured</h3>
            <p className="text-sm text-muted-text">
              Redirecting you to the login gateway...
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">New Passkey</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-text/50" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  error={!!errors.password}
                  {...register("password")}
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-error mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Passkey</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-text/50" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-10"
                  error={!!errors.confirmPassword}
                  {...register("confirmPassword")}
                  disabled={isLoading}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-error mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Update Credentials
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </motion.div>
    </PublicRoute>
  )
}

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={null}>
      <ResetPasswordForm />
    </React.Suspense>
  )
}
