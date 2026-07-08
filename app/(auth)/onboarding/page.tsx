"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { 
  Users, 
  Briefcase, 
  HeartHandshake, 
  ShieldAlert, 
  Stethoscope, 
  Store, 
  Settings,
  ArrowRight,
  Loader2
} from "lucide-react"

import { useAuthStore, UserRole } from "@/features/auth/store/authStore"
import { toast } from "@/store/toastStore"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
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

export default function OnboardingPage() {
  const router = useRouter()
  const { user, setRole } = useAuthStore()
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // If role is already set, redirect to loading
  React.useEffect(() => {
    if (user?.role) {
      router.replace("/loading")
    }
  }, [user, router])

  const handleContinue = async () => {
    if (!selectedRole) return

    setIsSubmitting(true)
    // Simulate API call to save role
    setTimeout(() => {
      setRole(selectedRole)
      toast.success("Identity Configured", `Access granted for role: ${selectedRole}`)
      router.push("/loading")
    }, 1500)
  }

  if (user?.role) return null

  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="mb-8 text-center sm:text-left">
          <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tight">Configure Identity</h1>
          <p className="text-muted-text">Select your operational role to configure your dashboard access.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-h-[50vh] sm:max-h-none overflow-y-auto pr-2 pb-2">
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
            onClick={handleContinue} 
            disabled={!selectedRole || isSubmitting}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {isSubmitting ? (
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
    </ProtectedRoute>
  )
}
