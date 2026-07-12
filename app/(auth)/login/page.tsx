"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Loader2, Mail, Lock, LogIn } from "lucide-react"

import { authService } from "@/features/auth/services/authService"
import { useAuthStore } from "@/features/auth/store/authStore"
import { toast } from "@/store/toastStore"
import { PublicRoute } from "@/components/auth/PublicRoute"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const { setAuth, setLoading, isLoading } = useAuthStore()
  
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Validation Error", "Please enter both email and password.")
      return
    }

    try {
      setLoading(true)
      // Mocking a standard login, setting them up to select a persona on the dashboard
      const user = await authService.mockLogin("Pending")
      setAuth({ ...user, email })
      toast.success("Authentication successful", "Welcome to AEGIS.")
      router.push("/dashboard")
    } catch (error: any) {
      toast.error("Authentication failed", error.message || "Invalid credentials.")
      setLoading(false)
    }
  }

  return (
    <PublicRoute>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">Access Terminal</h1>
          <p className="text-muted-text">Enter your credentials to access the operational intelligence platform.</p>
        </div>

        <Card className="p-8 border-white/10 bg-surface/50 backdrop-blur-md">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-text">Operator Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-text" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary-accent transition-colors"
                  placeholder="operator@aegis.system"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-text">Security Passcode</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-text" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary-accent transition-colors"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 flex items-center justify-center space-x-2" 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Authenticate</span>
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-xs text-muted-text">
            <p>Demo Mode: Any credentials will work.</p>
          </div>
        </Card>
      </motion.div>
    </PublicRoute>
  )
}
