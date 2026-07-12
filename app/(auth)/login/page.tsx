"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Shield, Activity, Users, Star, BarChart3, HeartPulse, Loader2 } from "lucide-react"

import { authService } from "@/features/auth/services/authService"
import { useAuthStore } from "@/features/auth/store/authStore"
import { toast } from "@/store/toastStore"
import { PublicRoute } from "@/components/auth/PublicRoute"
import { Card } from "@/components/ui/card"

const PERSONAS = [
  { id: "organizer", role: "Organizer", icon: Shield, desc: "Full tactical overview", color: "text-primary-accent", bg: "bg-primary-accent/10", border: "border-primary-accent/30" },
  { id: "executive", role: "Executive", icon: BarChart3, desc: "High-level metrics", color: "text-ai-accent", bg: "bg-ai-accent/10", border: "border-ai-accent/30" },
  { id: "security", role: "Security", icon: Shield, desc: "Incident response", color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
  { id: "medical", role: "Medical", icon: HeartPulse, desc: "Triage & health", color: "text-error", bg: "bg-error/10", border: "border-error/30" },
  { id: "volunteer", role: "Volunteer", icon: Users, desc: "Ground operations", color: "text-success", bg: "bg-success/10", border: "border-success/30" },
  { id: "fan", role: "Fan", icon: Star, desc: "Live match experience", color: "text-white", bg: "bg-white/10", border: "border-white/30" },
]

export default function LoginPage() {
  const router = useRouter()
  const { setAuth, setLoading, isLoading } = useAuthStore()

  const handlePersonaLogin = async (role: string) => {
    try {
      setLoading(true)
      const user = await authService.mockLogin(role)
      setAuth(user)
      toast.success("Authentication successful", `Welcome back, ${role}.`)
      // PublicRoute will auto-redirect based on role, but we can force it here for safety
      if (role === "Fan") router.push("/dashboard/fan")
      else if (role === "Volunteer") router.push("/dashboard/volunteer")
      else if (role === "Organizer") router.push("/dashboard/organizer")
      else if (role === "Executive") router.push("/dashboard/executive")
      else router.push(`/dashboard/${role.toLowerCase()}`)
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
        className="w-full max-w-2xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">Select Persona</h1>
          <p className="text-muted-text">Initialize a simulated environment by selecting an access tier.</p>
        </div>

        {isLoading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 text-primary-accent animate-spin" />
            <p className="text-sm font-mono text-muted-text">Authenticating via secure proxy...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERSONAS.map((persona, i) => {
              const Icon = persona.icon
              return (
                <motion.div
                  key={persona.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card 
                    className={`p-6 cursor-pointer hover:scale-[1.02] transition-all border ${persona.border} hover:bg-white/5 h-full flex flex-col items-center text-center`}
                    onClick={() => handlePersonaLogin(persona.role)}
                  >
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${persona.bg} ${persona.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-white mb-1">{persona.role}</h3>
                    <p className="text-xs text-muted-text">{persona.desc}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </PublicRoute>
  )
}
