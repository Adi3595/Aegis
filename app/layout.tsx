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
  title: "AEGIS | Stadium Intelligence Platform",
  description: "Next-generation stadium management and crowd intelligence platform powering live events.",
  keywords: ["stadium", "intelligence", "crowd control", "events", "management", "predictive"],
  authors: [{ name: "AEGIS Team" }],
  creator: "AEGIS",
  themeColor: "#040814",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aegis-intelligence.vercel.app",
    title: "AEGIS | Stadium Intelligence Platform",
    description: "Next-generation stadium management and crowd intelligence platform powering live events.",
    siteName: "AEGIS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AEGIS Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AEGIS | Stadium Intelligence Platform",
    description: "Next-generation stadium management and crowd intelligence platform powering live events.",
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
