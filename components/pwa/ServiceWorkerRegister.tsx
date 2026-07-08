"use client"

import * as React from "react"
import { toast } from "@/store/toastStore"
import { RefreshCw } from "lucide-react"

export function ServiceWorkerRegister() {

  React.useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope)

            registration.onupdatefound = () => {
              const installingWorker = registration.installing
              if (installingWorker == null) return

              installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed") {
                  if (navigator.serviceWorker.controller) {
                    // New update available
                    toast.info(
                      "Update Available",
                      "A new version of AEGIS is available. Refresh to update.",
                      { duration: 10000 }
                    )
                  } else {
                    // Content is cached for offline use
                    console.log("Content is cached for offline use.")
                  }
                }
              }
            }
          },
          function (err) {
            console.log("Service Worker registration failed: ", err)
          }
        )
      })
    }
  }, [])

  return null
}
