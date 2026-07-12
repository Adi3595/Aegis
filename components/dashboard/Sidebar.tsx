"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, 
  Activity, 
  Map, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Settings, 
  LifeBuoy, 
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  LogOut,
  MonitorPlay
} from "lucide-react"

import { useLayoutStore } from "@/store/layoutStore"
import { useAuthStore } from "@/features/auth/store/authStore"
import { cn } from "@/lib/utils"

const getRoleNavigation = (role: string | undefined) => {
  switch (role) {
    case "Fan":
      return {
        main: [
          { name: "Overview", href: "/dashboard/fan", icon: LayoutDashboard },
          { name: "Live Match", href: "/dashboard/fan/live", icon: Activity },
        ],
        secondary: [
          { name: "Settings", href: "/dashboard/settings", icon: Settings },
          { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
        ]
      }
    case "Volunteer":
      return {
        main: [
          { name: "Overview", href: "/dashboard/volunteer", icon: LayoutDashboard },
        ],
        secondary: [
          { name: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: 1 },
          { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ]
      }
    case "Organizer":
    case "Administrator":
      return {
        main: [
          { name: "Overview", href: `/dashboard/${role === 'Administrator' ? 'admin' : 'organizer'}`, icon: LayoutDashboard },
          { name: "Digital Twin", href: "/dashboard/twin", icon: Map },
          { name: "Live Simulation", href: "/dashboard/simulation", icon: Activity },
          { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        ],
        secondary: [
          { name: "Reports", href: "/dashboard/reports", icon: FileText },
          { name: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: 3 },
          { name: "Settings", href: "/dashboard/settings", icon: Settings },
          { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
        ]
      }
    case "Security":
    case "Medical":
      return {
        main: [
          { name: "Overview", href: `/dashboard/${role.toLowerCase()}`, icon: LayoutDashboard },
          { name: "Digital Twin", href: "/dashboard/twin", icon: Map },
          { name: "Live Simulation", href: "/dashboard/simulation", icon: Activity },
        ],
        secondary: [
          { name: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: 5 },
          { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ]
      }
    case "Executive":
      return {
        main: [
          { name: "Overview", href: "/dashboard/executive", icon: LayoutDashboard },
          { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
        ],
        secondary: [
          { name: "Reports", href: "/dashboard/reports", icon: FileText },
          { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ]
      }
    default:
      return {
        main: [
          { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        ],
        secondary: [
          { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ]
      }
  }
}

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const { sidebarOpen, setSidebar, toggleSidebar } = useLayoutStore()

  // Handle mobile behavior
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 1024 : false

  const { main: mainNavigation, secondary: secondaryNavigation } = getRoleNavigation(user?.role)

  return (
    <>
      {/* Global Backdrop (Desktop & Mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebar(false)}
            className="fixed inset-0 z-40 bg-primary-bg/70 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: 260,
          x: sidebarOpen ? 0 : -260
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-white/5 bg-surface/80 backdrop-blur-3xl shadow-2xl"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-4">
          <AnimatePresence mode="popLayout">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="font-mono text-xs font-semibold tracking-wider text-muted-text uppercase"
              >
                Module Access
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={toggleSidebar}
            className="flex rounded-md p-1.5 text-muted-text hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-accent"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden scrollbar-hide pt-4 pb-4">
          <nav className="flex-1 space-y-1 px-3">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <NavItem 
                  key={item.name} 
                  item={item} 
                  isActive={isActive} 
                  sidebarOpen={sidebarOpen} 
                />
              )
            })}
            
            <div className="my-6 border-t border-white/5 mx-2" />
            
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <NavItem 
                  key={item.name} 
                  item={item} 
                  isActive={isActive} 
                  sidebarOpen={sidebarOpen} 
                />
              )
            })}

            {/* Admin only route */}
            {user?.role === "Administrator" && (
              <>
                <div className="my-6 border-t border-white/5 mx-2" />
                <NavItem 
                  item={{ name: "Admin Console", href: "/dashboard/admin", icon: ShieldAlert }} 
                  isActive={pathname === "/dashboard/admin"} 
                  sidebarOpen={sidebarOpen} 
                  danger
                />
                <NavItem 
                  item={{ name: "Demo Control", href: "/dashboard/admin/demo", icon: MonitorPlay }} 
                  isActive={pathname === "/dashboard/admin/demo"} 
                  sidebarOpen={sidebarOpen} 
                  danger={false}
                />
              </>
            )}

            <div className="mt-auto pt-6 pb-2">
              <button
                onClick={() => {
                  logout()
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("access_token")
                    localStorage.removeItem("refresh_token")
                    window.location.href = "/login"
                  }
                }}
                className={cn(
                  "group relative flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-accent text-muted-text hover:bg-white/5 hover:text-error"
                )}
                title={!sidebarOpen ? "Log Out" : undefined}
              >
                <LogOut className="h-5 w-5 shrink-0 transition-colors text-muted-text group-hover:text-error" />
                <span className="ml-3 truncate">
                  Log Out
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.aside>
    </>
  )
}

function NavItem({ item, isActive, sidebarOpen, danger = false }: any) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary-accent",
        isActive 
          ? danger 
            ? "bg-error/10 text-error shadow-[inset_0_0_12px_rgba(244,63,94,0.1)]"
            : "bg-primary-accent/10 text-primary-accent shadow-[inset_0_0_12px_rgba(91,140,255,0.1)]" 
          : "text-muted-text hover:bg-white/5 hover:text-white"
      )}
      title={!sidebarOpen ? item.name : undefined}
    >
      <item.icon className={cn(
        "h-5 w-5 shrink-0 transition-colors",
        isActive ? (danger ? "text-error" : "text-primary-accent") : "text-muted-text group-hover:text-white"
      )} />
      <span className="ml-3 truncate">
        {item.name}
      </span>

      {item.badge && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-ai-accent text-[10px] font-bold text-white">
          {item.badge}
        </span>
      )}
      
      {/* Active Indicator Line */}
      {isActive && (
        <motion.div 
          layoutId="activeNavIndicator"
          className={cn(
            "absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full",
            danger ? "bg-error" : "bg-primary-accent"
          )}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  )
}
