"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { GlassPanel } from "@/components/ui/glass-panel"
import { Slide } from "@/animations"
import { ChevronRight, ChevronLeft, Search, Menu, Bell, LayoutDashboard } from "lucide-react"

const DASHBOARDS = [
  { id: "organizer", title: "Organizer Command Center", color: "bg-ai-accent" },
  { id: "security", title: "Security Dashboard", color: "bg-warning" },
  { id: "medical", title: "Medical Dispatch", color: "bg-error" },
  { id: "volunteer", title: "Volunteer Hub", color: "bg-success" },
  { id: "fan", title: "Fan Mobile App", color: "bg-primary-accent" },
  { id: "vendor", title: "Vendor Portal", color: "bg-secondary-accent" },
]

export default function DashboardPreview() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(1) // 1 for right, -1 for left

  const next = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % DASHBOARDS.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + DASHBOARDS.length) % DASHBOARDS.length)
  }

  const currentDash = DASHBOARDS[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    })
  }

  return (
    <div className="container mx-auto px-4 py-32 border-t border-white/10 overflow-hidden" id="dashboards">
      <Slide direction="up">
        <SectionHeading 
          title="Role-Based Interfaces" 
          subtitle="A unified backend serving customized frontend experiences tailored to every persona."
          align="center"
        />
      </Slide>

      <div className="mt-12 flex flex-col items-center">
        {/* Carousel Controls */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button onClick={prev} className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
            <ChevronLeft className="text-white h-5 w-5" />
          </button>
          <div className="text-sm font-medium w-48 text-center text-white">{currentDash.title}</div>
          <button onClick={next} className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
            <ChevronRight className="text-white h-5 w-5" />
          </button>
        </div>

        {/* Dashboard Mock Container */}
        <div className="relative w-full max-w-5xl aspect-video mx-auto perspective-[1000px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute inset-0 w-full h-full"
            >
              <GlassPanel className="w-full h-full p-0 flex flex-col overflow-hidden border-white/20 shadow-2xl">
                {/* Mock Browser/App Header */}
                <div className="h-12 border-b border-white/10 bg-surface/80 flex items-center px-4 justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  </div>
                  <div className="text-xs font-mono text-muted-text opacity-50 flex items-center space-x-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>AEGIS_OS // {currentDash.title.toUpperCase()}</span>
                  </div>
                  <div className="flex space-x-3 text-white/50">
                    <Search className="h-4 w-4" />
                    <Bell className="h-4 w-4" />
                    <Menu className="h-4 w-4" />
                  </div>
                </div>
                
                {/* Mock Content Body */}
                <div className="flex-1 flex bg-primary-bg relative">
                  {/* Sidebar Mock */}
                  <div className="w-16 md:w-48 border-r border-white/5 p-4 hidden sm:flex flex-col space-y-4">
                    <div className="h-8 w-full bg-white/5 rounded-md" />
                    <div className="h-8 w-full bg-white/5 rounded-md" />
                    <div className="h-8 w-full bg-white/5 rounded-md" />
                    <div className="h-8 w-3/4 bg-white/5 rounded-md" />
                  </div>
                  
                  {/* Main Grid Mock */}
                  <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Header bar mock */}
                    <div className="col-span-full h-16 rounded-xl border border-white/5 bg-surface/30 flex items-center px-6">
                      <div className={`w-3 h-3 rounded-full ${currentDash.color} mr-4 animate-pulse`} />
                      <div className="h-4 w-48 bg-white/10 rounded-full" />
                    </div>
                    
                    {/* Charts / Data mocks */}
                    <div className="col-span-full md:col-span-2 h-48 rounded-xl border border-white/5 bg-surface/30 p-6 flex items-end space-x-2">
                      <div className={`w-full bg-gradient-to-t from-${currentDash.color.replace('bg-', '')}/20 to-transparent h-[40%] rounded-t-sm`} />
                      <div className={`w-full bg-gradient-to-t from-${currentDash.color.replace('bg-', '')}/20 to-transparent h-[60%] rounded-t-sm`} />
                      <div className={`w-full bg-gradient-to-t from-${currentDash.color.replace('bg-', '')}/40 to-transparent h-[80%] rounded-t-sm`} />
                      <div className={`w-full bg-gradient-to-t from-${currentDash.color.replace('bg-', '')}/60 to-transparent h-[50%] rounded-t-sm`} />
                      <div className={`w-full bg-gradient-to-t from-${currentDash.color.replace('bg-', '')}/80 to-transparent h-[90%] rounded-t-sm`} />
                    </div>
                    
                    <div className="col-span-full md:col-span-1 h-48 rounded-xl border border-white/5 bg-surface/30 p-6 flex flex-col space-y-4 justify-center">
                      <div className="h-3 w-full bg-white/5 rounded-full" />
                      <div className="h-3 w-5/6 bg-white/5 rounded-full" />
                      <div className="h-3 w-4/6 bg-white/5 rounded-full" />
                      <div className="h-3 w-full bg-white/5 rounded-full" />
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
