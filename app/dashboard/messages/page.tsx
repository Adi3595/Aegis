"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { Send, User, Search } from "lucide-react"

export default function MessagesPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="h-[calc(100vh-100px)] flex flex-col">
      <SectionHeading title="Secure Comms" subtitle="End-to-end encrypted team messaging." />

      <Card className="flex-1 mt-6 p-0 overflow-hidden flex border border-white/10">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/10 bg-black/20 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-text" />
              <input type="text" placeholder="Search chats..." className="w-full bg-surface border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary-accent" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[
              { name: "Command Center", msg: "All units report to sectors.", time: "10:42 AM", unread: 2 },
              { name: "Medical Team Alpha", msg: "Unit 3 is on scene.", time: "10:15 AM", unread: 0 },
              { name: "Security Channel", msg: "Gate D is clear.", time: "09:30 AM", unread: 0 },
            ].map((chat, i) => (
              <div key={i} className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${i === 0 ? 'bg-primary-accent/10 border-l-2 border-l-primary-accent' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-medium text-sm ${i === 0 ? 'text-primary-accent' : 'text-white'}`}>{chat.name}</span>
                  <span className="text-[10px] text-muted-text">{chat.time}</span>
                </div>
                <p className="text-xs text-muted-text truncate pr-4">{chat.msg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-surface/50">
          <div className="p-4 border-b border-white/10 bg-black/20 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-accent/20 text-primary-accent flex items-center justify-center font-bold">
              CC
            </div>
            <div>
              <h3 className="font-bold text-white">Command Center</h3>
              <p className="text-xs text-success flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-success mr-1"/> Online</p>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex flex-col gap-1 items-start">
              <span className="text-[10px] text-muted-text ml-2">Command Center - 10:40 AM</span>
              <div className="bg-white/10 text-white rounded-2xl rounded-tl-none px-4 py-2 text-sm max-w-[80%]">
                All units, be advised of increased crowd density near Sector 4.
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-[10px] text-muted-text mr-2">You - 10:41 AM</span>
              <div className="bg-primary-accent text-primary-bg rounded-2xl rounded-tr-none px-4 py-2 text-sm max-w-[80%] font-medium">
                Copy that. Re-routing volunteer teams to assist.
              </div>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <span className="text-[10px] text-muted-text ml-2">Command Center - 10:42 AM</span>
              <div className="bg-white/10 text-white rounded-2xl rounded-tl-none px-4 py-2 text-sm max-w-[80%]">
                All units report to sectors.
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="relative">
              <input type="text" placeholder="Type a secure message..." className="w-full bg-surface border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-accent text-primary-bg rounded-full hover:brightness-110 transition-all">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
