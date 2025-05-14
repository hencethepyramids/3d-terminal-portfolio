"use client"

import { useEffect, useState } from "react"

export default function CrtEffect() {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    // Allow toggling CRT effect with a key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        setEnabled((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Scanlines effect */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-scanlines opacity-10"></div>

      {/* CRT flicker */}
      <div className="pointer-events-none fixed inset-0 z-40 bg-black opacity-[0.01] animate-flicker"></div>

      {/* Screen glow */}
      <div className="pointer-events-none fixed inset-0 z-30 bg-green-500/5 animate-pulse"></div>

      {/* Vignette effect */}
      <div className="pointer-events-none fixed inset-0 z-20 bg-vignette opacity-50"></div>
    </>
  )
}
