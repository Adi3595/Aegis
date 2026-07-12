"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User as UserIcon, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"

import { registerSchema, RegisterFormData } from "@/features/auth/schemas/authSchemas"
import { authService } from "@/features/auth/services/authService"
import { useAuthStore } from "@/features/auth/store/authStore"
import { toast } from "@/store/toastStore"
import { PublicRoute } from "@/components/auth/PublicRoute"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const { setAuth, setLoading, isLoading } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true)
      const user = await authService.register(data)
      setAuth(user)
      toast.success("Profile created", "Your identity has been registered.")
      // PublicRoute will auto-redirect based on role (which is null initially)
    } catch (error: any) {
      toast.error("Registration failed", error.message || "Unable to create account.")
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
          <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">Request Access</h1>
          <p className="text-muted-text">Create an identity to enter the platform.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-5 w-5 text-muted-text/50" />
              <Input
                id="name"
                placeholder="Jane Doe"
                className="pl-10"
                error={!!errors.name}
                {...register("name")}
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-error mt-1">{errors.name.message}</p>
            )}
          </div>

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
            <Label htmlFor="password">Passkey</Label>
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
            <Label htmlFor="confirmPassword">Confirm Passkey</Label>
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

          <Button type="submit" className="w-full h-12 text-base mt-2" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Generate Identity
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-text">
          Already have clearance?{" "}
          <Link href="/login" className="text-white hover:text-primary-accent transition-colors font-medium">
            Initialize Session
          </Link>
        </div>
      </motion.div>
    </PublicRoute>
  )
}
