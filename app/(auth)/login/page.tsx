"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Shield, Mail, Lock, ArrowRight, Loader2,
  Users, Briefcase, HeartHandshake, ShieldAlert, Stethoscope, Store, Settings
} from "lucide-react"

import { loginSchema, LoginFormData } from "@/features/auth/schemas/authSchemas"
import { authService } from "@/features/auth/services/authService"
import { useAuthStore, UserRole } from "@/features/auth/store/authStore"
import { toast } from "@/store/toastStore"
import { PublicRoute } from "@/components/auth/PublicRoute"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const roles: { id: UserRole; title: string; description: string; icon: React.ReactNode }[] = [
  { id: "Fan", title: "Fan / Attendee", description: "Access live metrics and stadium maps.", icon: <Users className="h-5 w-5" /> },
  { id: "Organizer", title: "Event Organizer", description: "Full dashboard and scheduling access.", icon: <Briefcase className="h-5 w-5" /> },
  { id: "Volunteer", title: "Volunteer", description: "Receive tasks and coordinate operations.", icon: <HeartHandshake className="h-5 w-5" /> },
  { id: "Security", title: "Security Officer", description: "Monitor crowd flows and threat detection.", icon: <ShieldAlert className="h-5 w-5" /> },
  { id: "Medical", title: "Medical Staff", description: "Respond to health emergencies and triage.", icon: <Stethoscope className="h-5 w-5" /> },
  { id: "Vendor", title: "Vendor", description: "Manage inventory and point-of-sale data.", icon: <Store className="h-5 w-5" /> },
  { id: "Administrator", title: "Administrator", description: "AI-system access and global override.", icon: <Settings className="h-5 w-5" /> },
]

export default function LoginPage() {
  const router = useRouter()
  const { setAuth, setLoading, isLoading, isAuthenticated, user, setRole } = useAuthStore()

  // Persona Selection State
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>(null)
  const [isSubmittingRole, setIsSubmittingRole] = React.useState(false)

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
      toast.success("Authentication successful", "Welcome back to AEGIS.")
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

  const handleContinueRole = async () => {
    if (!selectedRole) return
    setIsSubmittingRole(true)
    setTimeout(() => {
      setRole(selectedRole)
      toast.success("Identity Configured", `Access granted for role: ${selectedRole}`)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <PublicRoute>
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
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
        ) : (
          <motion.div
            key="persona-selector"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">Configure Identity</h1>
              <p className="text-muted-text">Select your operational role to configure your dashboard access.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-h-[50vh] overflow-y-auto pr-2 pb-2">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent ${
                      isSelected 
                        ? "border-primary-accent bg-primary-accent/10 shadow-[inset_0_0_20px_rgba(91,140,255,0.15)]" 
                        : "border-white/10 bg-glass hover:bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className={`mb-3 p-2 rounded-lg ${isSelected ? "bg-primary-accent text-primary-bg" : "bg-white/5 text-white/70"}`}>
                      {role.icon}
                    </div>
                    <h3 className="font-semibold text-white mb-1">{role.title}</h3>
                    <p className="text-xs text-muted-text">{role.description}</p>
                    
                    {isSelected && (
                      <motion.div 
                        layoutId="role-outline"
                        className="absolute inset-0 border-2 border-primary-accent rounded-xl"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleContinueRole} 
                disabled={!selectedRole || isSubmittingRole}
                className="w-full sm:w-auto min-w-[200px]"
              >
                {isSubmittingRole ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Initialize Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PublicRoute>
  )
}
