"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { User, Bell, Shield, Key } from "lucide-react"

export default function SettingsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <motion.div 
      className="space-y-6 pb-20 max-w-4xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <SectionHeading 
        title="Settings" 
        subtitle="Manage your account preferences and system configuration."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          {['Account', 'Notifications', 'Security', 'API Keys'].map((tab, i) => (
            <button 
              key={tab}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                i === 0 ? 'bg-primary-accent/10 text-primary-accent' : 'text-muted-text hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <motion.div variants={item}>
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-accent to-ai-accent flex items-center justify-center text-xl font-bold text-white shadow-lg">
                  OP
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Operator Profile</h3>
                  <p className="text-sm text-muted-text">Update your personal information</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-text">First Name</label>
                    <input type="text" defaultValue="Admin" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-accent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-text">Last Name</label>
                    <input type="text" defaultValue="User" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-accent" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-text">Email Address</label>
                  <input type="email" defaultValue="admin@aegis.system" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-accent" />
                </div>
                <div className="pt-4">
                  <button className="bg-primary-accent text-primary-bg font-medium rounded-lg px-4 py-2 text-sm hover:brightness-110 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5">
                  <div>
                    <p className="text-sm font-medium text-white">High Contrast Mode</p>
                    <p className="text-xs text-muted-text">Increase visibility for critical alerts</p>
                  </div>
                  <div className="w-10 h-6 bg-primary-accent rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5">
                  <div>
                    <p className="text-sm font-medium text-white">Haptic Feedback</p>
                    <p className="text-xs text-muted-text">Vibrate device on critical alerts</p>
                  </div>
                  <div className="w-10 h-6 bg-white/10 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
