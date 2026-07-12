"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card } from "@/components/ui/card"
import { LifeBuoy, MessageSquare, BookOpen, ExternalLink, ChevronDown } from "lucide-react"

export default function SupportPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="space-y-6 pb-20 max-w-5xl mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="text-center mb-10">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-accent to-ai-accent text-primary-bg shadow-lg mb-6">
          <LifeBuoy className="h-8 w-8" />
        </div>
        <SectionHeading 
          title="How can we help you?" 
          subtitle="Access knowledge bases, contact support, or view system status."
          align="center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item}>
          <Card className="p-6 flex flex-col items-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
            <BookOpen className="h-8 w-8 text-primary-accent mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-2">Documentation</h3>
            <p className="text-sm text-muted-text">Read comprehensive guides on operating the AEGIS platform.</p>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="p-6 flex flex-col items-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
            <MessageSquare className="h-8 w-8 text-ai-accent mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-2">Live Chat</h3>
            <p className="text-sm text-muted-text">Connect directly with an AEGIS technical support specialist.</p>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 flex flex-col items-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
            <ExternalLink className="h-8 w-8 text-success mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-2">System Status</h3>
            <p className="text-sm text-muted-text">Check the operational status of all network nodes and clusters.</p>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item} className="mt-12">
        <h3 className="font-display font-bold text-2xl text-white mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            { q: "How do I add a new Responder to my organization?", a: "Navigate to the Settings > Account page and click 'Invite Member'. They will receive an email with onboarding instructions." },
            { q: "What happens if a sensor goes offline?", a: "AEGIS automatically re-routes intelligence gathering to neighboring sensors and alerts the Operations team." },
            { q: "Can I export simulation data?", a: "Yes. Go to the Reports module and click 'Export All' to download a CSV of telemetry logs." },
          ].map((faq, i) => (
            <Card key={i} className="p-0 overflow-hidden">
              <button className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none">
                <span className="font-medium text-white">{faq.q}</span>
                <ChevronDown className="h-4 w-4 text-muted-text" />
              </button>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
