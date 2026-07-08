"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"

import { loginSchema, LoginFormData } from "@/features/auth/schemas/authSchemas"
import { authService } from "@/features/auth/services/authService"
import { useAuthStore } from "@/features/auth/store/authStore"
import { toast } from "@/store/toastStore"
import { PublicRoute } from "@/components/auth/PublicRoute"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const { setAuth, setLoading, isLoading } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true)
      const user = await authService.login(data)
      setAuth(user)
      toast.success("Authentication successful", "Welcome back to AEGIS AI.")
      // PublicRoute will auto-redirect based on role
    } catch (error: any) {
      toast.error("Authentication failed", error.message || "Invalid credentials.")
      setLoading(false)
    }
  }

  const handleOAuth = async (provider: "google" | "microsoft") => {
    try {
      setLoading(true)
      const user = await authService.oauthLogin(provider)
      setAuth(user)
      toast.success("Authentication successful", `Connected with ${provider}.`)
    } catch (error: any) {
      toast.error("OAuth failed", error.message)
      setLoading(false)
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
          <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">Access Control</h1>
          <p className="text-muted-text">Authenticate to access the stadium intelligence platform.</p>
        </div>

        <div className="flex gap-4 mb-8">
          <Button 
            variant="glass" 
            className="flex-1 border-white/10 hover:bg-white/5 h-12"
            onClick={() => handleOAuth("google")}
            disabled={isLoading}
          >
            Google
          </Button>
          <Button 
            variant="glass" 
            className="flex-1 border-white/10 hover:bg-white/5 h-12"
            onClick={() => handleOAuth("microsoft")}
            disabled={isLoading}
          >
            Microsoft
          </Button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-primary-bg px-4 text-muted-text">Or continue with email</span>
          </div>
        </div>

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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Passkey</Label>
              <Link 
                href="/forgot-password" 
                className="text-xs text-primary-accent hover:text-white transition-colors"
              >
                Forgot credentials?
              </Link>
            </div>
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

          <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Initialize Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-text">
          Don't have clearance?{" "}
          <Link href="/register" className="text-white hover:text-primary-accent transition-colors font-medium">
            Request access
          </Link>
        </div>
      </motion.div>
    </PublicRoute>
  )
}
