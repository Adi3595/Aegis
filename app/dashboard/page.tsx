"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, UserRole } from "@/features/auth/store/authStore"
import { motion } from "framer-motion"
import { Shield, Activity, Users, Calendar, ShieldAlert, Briefcase, Settings, Fingerprint, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Magnetic } from "@/components/ui/magnetic"

const roles = [
  { id: "Fan", title: "Fan / Attendee", href: "/dashboard/fan", icon: Users, color: "text-primary-accent", bg: "bg-primary-accent/10", border: "border-primary-accent/20" },
  { id: "Organizer", title: "Event Organizer", href: "/dashboard/organizer", icon: Calendar, color: "text-ai-accent", bg: "bg-ai-accent/10", border: "border-ai-accent/20" },
  { id: "Security", title: "Security Officer", href: "/dashboard/security", icon: ShieldAlert, color: "text-error", bg: "bg-error/10", border: "border-error/20" },
  { id: "Medical", title: "Medical Responder", href: "/dashboard/medical", icon: Activity, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
  { id: "Volunteer", title: "Ground Volunteer", href: "/dashboard/volunteer", icon: Shield, color: "text-secondary-accent", bg: "bg-secondary-accent/10", border: "border-secondary-accent/20" },
  { id: "Executive", title: "Executive Board", href: "/dashboard/executive", icon: Briefcase, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  { id: "Administrator", title: "System Admin", href: "/dashboard/admin", icon: Settings, color: "text-white", bg: "bg-white/10", border: "border-white/20" },
]

export default function DashboardIndexPage() {
  const router = useRouter()
  const { setRole, user } = useAuthStore()

  React.useEffect(() => {
    // If not authenticated at all, kick to login
    if (!user) {
      router.replace("/login")
    }
  }, [user, router])

  const handleRoleSelection = (roleId: string, href: string) => {
    setRole(roleId as UserRole)
    router.push(href)
  }

  if (!user) return null

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.05),transparent_50%)]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 mb-4">
            <Fingerprint className="h-6 w-6 text-primary-accent" />
          </div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-white mb-2">Initialize Persona Module</h1>
          <p className="text-muted-text">Select your authorized clearance level to test the platform capabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {roles.map((role, idx) => (
            <Magnetic key={role.id} intensity={0.15}>
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => handleRoleSelection(role.id, role.href)}
                className={cn(
                  "group relative flex w-full h-full flex-col items-start p-6 text-left rounded-2xl border bg-surface/40 backdrop-blur-md transition-all duration-300",
                  "hover:scale-105 hover:bg-surface/80 hover:shadow-2xl",
                  role.border
                )}
              >
                <div className={cn("p-3 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110", role.bg)}>
                  <role.icon className={cn("h-6 w-6", role.color)} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{role.title}</h3>
                <p className="text-xs text-muted-text mb-4">Initialize {role.id.toLowerCase()} environment.</p>
                
                <div className="mt-auto flex items-center text-xs font-medium text-white/50 group-hover:text-white transition-colors w-full">
                  <span>Access Module</span>
                  <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            </Magnetic>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
