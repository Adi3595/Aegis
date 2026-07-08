"use client"

import * as React from "react"
import { useDemoStore } from "@/store/demoStore"

export function DemoModeInjector() {
  const { presentationMode } = useDemoStore()

  React.useEffect(() => {
    if (presentationMode) {
      document.body.classList.add("presentation-mode")
    } else {
      document.body.classList.remove("presentation-mode")
    }
  }, [presentationMode])

  return null
}
