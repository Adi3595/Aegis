import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { SmoothScroll } from "@/components/ui/smooth-scroll"
import { PageTransition } from "@/components/ui/page-transition"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

import { ToastProvider } from "@/components/ui/toast"
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister"
import { RouteProgressProvider } from "@/components/ui/route-progress"
import { GuidedTour } from "@/components/tour/GuidedTour"
import { DemoModeInjector } from "@/components/tour/DemoModeInjector"

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "AEGIS AI | Stadium Intelligence Platform",
  description: "The autonomous intelligence operating system for modern mega-events. Powering FIFA World Cup 2026 with real-time digital twins and multi-agent Generative AI.",
  keywords: ["AI", "Stadium", "Intelligence", "Digital Twin", "FIFA 2026", "Generative AI", "Smart Venue"],
  authors: [{ name: "AEGIS Systems" }],
  creator: "AEGIS AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aegis-ai.dev",
    title: "AEGIS AI | Stadium Intelligence Platform",
    description: "The autonomous intelligence operating system for modern mega-events.",
    siteName: "AEGIS AI",
    images: [
      {
        url: "/og-image.jpg", // Placeholder for actual OG image
        width: 1200,
        height: 630,
        alt: "AEGIS AI Dashboard Preview",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AEGIS AI | Stadium Intelligence Platform",
    description: "Powering FIFA World Cup 2026 with autonomous AI agents.",
    creator: "@aegis_ai",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-primary-bg bg-mesh text-white selection:bg-ai-accent/30 selection:text-white overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <CustomCursor />
            <RouteProgressProvider />
            <ToastProvider />
            <ServiceWorkerRegister />
            <DemoModeInjector />
            <GuidedTour />
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
