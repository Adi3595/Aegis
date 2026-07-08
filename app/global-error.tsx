"use client"

import * as React from "react"

// global-error.tsx must define its own HTML and BODY tags
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <head>
        <title>AEGIS OS - Critical Failure</title>
      </head>
      <body style={{ backgroundColor: '#050505', color: 'white', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '20px', textAlign: 'center' }}>
          <h1 style={{ color: '#ff5757', marginBottom: '10px' }}>Critical System Failure</h1>
          <p style={{ color: '#888', marginBottom: '30px', maxWidth: '400px' }}>
            A catastrophic error occurred at the root application level. The system has automatically halted to prevent data corruption.
          </p>
          <button 
            onClick={() => reset()}
            style={{ padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Restart Application
          </button>
        </div>
      </body>
    </html>
  )
}
