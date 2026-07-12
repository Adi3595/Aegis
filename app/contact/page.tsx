"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-bg">      <main className="flex-1 w-full pt-32 pb-20">
        <motion.div 
          className="container mx-auto px-4 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading 
            title="Contact Operations" 
            subtitle="Get in touch with our enterprise integration team."
            align="center"
          />
          
          <form className="mt-12 space-y-6 bg-surface/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-text">First Name</label>
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-accent" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-text">Last Name</label>
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-accent" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-text">Organization Email</label>
              <input type="email" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-accent" placeholder="john@enterprise.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-text">Message</label>
              <textarea rows={5} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-accent resize-none" placeholder="How can AEGIS help your organization?" />
            </div>
            <Button size="lg" className="w-full h-12">Submit Inquiry</Button>
          </form>
        </motion.div>
      </main>    </div>
  )
}
