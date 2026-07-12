"use client"

import * as React from "react"
import { Shield, Bell, Search, Menu, Command, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLayoutStore } from "@/store/layoutStore"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/features/i18n/components/LanguageSwitcher"
import { OfflineIndicator } from "@/features/fan/components/OfflineIndicator"
import { useAuthStore } from "@/features/auth/store/authStore"
import { Logo } from "@/components/ui/logo"

export function TopNav() {
  const { toggleSidebar, toggleNotificationCenter, toggleCommandPalette, notificationCenterOpen } = useLayoutStore()
  const { user } = useAuthStore()

  return (
    <header className="tour-step-1 sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/5 bg-primary-bg/80 px-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          aria-label="Toggle Navigation Sidebar"
          className="rounded-md p-2 text-muted-text hover:bg-white/5 hover:text-white transition-colors lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <Link href="/dashboard" className="flex items-center gap-2 group hidden sm:flex">
          <Logo className="h-7 w-auto group-hover:scale-105 transition-transform" />
          <span className="font-display text-lg font-bold tracking-tight text-white hidden md:block">
            AEGIS
          </span>
        </Link>
        
        {/* Breadcrumb Placeholder */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-muted-text ml-4 pl-4 border-l border-white/10">
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
          <span className="text-white/20">/</span>
          <span className="text-white font-medium">Overview</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
        {/* Global Search Button */}
        <button
          onClick={toggleCommandPalette}
          aria-label="Open Global Search"
          className="flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-muted-text transition-colors hover:border-white/20 hover:bg-white/5 sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary-accent"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left hidden sm:inline-block">Search intelligence...</span>
          <span className="flex-1 text-left sm:hidden">Search...</span>
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/50">
            <Command className="h-3 w-3" />
            <span>K</span>
          </kbd>
        </button>

        <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />

        <OfflineIndicator />
        {user?.role?.toLowerCase() === "fan" && <LanguageSwitcher />}

        {/* Notifications */}
        <button 
          onClick={toggleNotificationCenter}
          aria-label="Toggle Notification Center"
          className={`relative rounded-md p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-accent ${notificationCenterOpen ? 'bg-white/10 text-white' : 'text-muted-text hover:bg-white/5 hover:text-white'}`}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
          </span>
        </button>

        {/* Profile Placeholder (Will be replaced with Avatar/Dropdown component) */}
        <button aria-label="User Profile" className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-accent/50 to-ai-accent/50 border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-accent ring-offset-1 ring-offset-primary-bg">
          <div className="h-full w-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            OP
          </div>
        </button>
      </div>
    </header>
  )
}
