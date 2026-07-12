"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Code, BookOpen, Terminal, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-primary-bg">
      <Navbar />
      <main className="flex-1 w-full pt-32 pb-20">
        <motion.div 
          className="container mx-auto px-4 max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading 
            title="Developer Documentation" 
            subtitle="Integrate with the AEGIS platform."
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="p-3 rounded-xl bg-primary-accent/10 w-fit mb-4">
                <BookOpen className="h-6 w-6 text-primary-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Platform Guide</h3>
              <p className="text-muted-text text-sm mb-6">Learn the core concepts of the AEGIS Digital Twin and how the Multi-Agent system coordinates stadium operations.</p>
              <Button variant="outline" className="w-full">Read Guide</Button>
            </Card>

            <Card className="p-6">
              <div className="p-3 rounded-xl bg-ai-accent/10 w-fit mb-4">
                <Code className="h-6 w-6 text-ai-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">API Reference</h3>
              <p className="text-muted-text text-sm mb-6">Explore our REST and WebSocket APIs for injecting custom telemetry or building custom dashboard modules.</p>
              <Button variant="outline" className="w-full">View API</Button>
            </Card>

            <Card className="p-6">
              <div className="p-3 rounded-xl bg-success/10 w-fit mb-4">
                <Terminal className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">CLI Tool</h3>
              <p className="text-muted-text text-sm mb-6">Manage agents and deployments directly from your terminal using the AEGIS CLI.</p>
              <Button variant="outline" className="w-full">Install CLI</Button>
            </Card>

            <Card className="p-6">
              <div className="p-3 rounded-xl bg-warning/10 w-fit mb-4">
                <ShieldAlert className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Security Audits</h3>
              <p className="text-muted-text text-sm mb-6">Review our latest penetration testing reports and AI model safety alignments.</p>
              <Button variant="outline" className="w-full">View Reports</Button>
            </Card>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
