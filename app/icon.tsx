import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg 
          width="64"
          height="64"
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M100 15L180 55V145L100 185L20 145V55L100 15Z" 
            fill="#5B8CFF" 
            fillOpacity="0.1" 
            stroke="#5B8CFF" 
            strokeWidth="6" 
            strokeLinejoin="round"
          />
          <path 
            d="M100 40L145 140H115L108 115H92L85 140H55L100 40Z" 
            fill="#32D4FF" 
            stroke="#32D4FF"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="100" cy="80" r="10" fill="#040814" stroke="#32D4FF" strokeWidth="4" />
          <circle cx="55" cy="140" r="5" fill="#7C5CFF" />
          <circle cx="145" cy="140" r="5" fill="#7C5CFF" />
          <circle cx="100" cy="15" r="4" fill="#5B8CFF" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
