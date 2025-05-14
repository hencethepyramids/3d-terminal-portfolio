"use client"

import { useEffect, useState } from "react"
import Terminal from "@/components/terminal/terminal"
import BootSequence from "@/components/boot-sequence"
import { ThemeProvider } from "@/components/theme-provider"
import CrtEffect from "@/components/effects/crt-effect"
import dynamic from "next/dynamic"

// Dynamically import the 3D component with no SSR to avoid hydration issues
const ComputerIntro = dynamic(() => import("@/components/3d/computer-intro"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen w-full terminal-bg">
      <div className="terminal-text text-center">
        <div className="animate-pulse mb-2">Loading 3D scene...</div>
        <div className="h-1 w-40 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full terminal-secondary animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  ),
})

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  const [booted, setBooted] = useState(false)
  const [error, setError] = useState(false)
  const [skipIntro, setSkipIntro] = useState(false)

  // Skip to terminal if there's an error or after timeout
  useEffect(() => {
    // Safety timeout - if intro doesn't complete in 15 seconds, skip it
    const safetyTimer = setTimeout(() => {
      if (!introComplete) {
        console.log("Safety timeout - skipping intro")
        setIntroComplete(true)
      }
    }, 15000)

    return () => clearTimeout(safetyTimer)
  }, [introComplete])

  // Handle boot sequence after intro
  useEffect(() => {
    if (introComplete) {
      // Play boot sound
      const bootSound = new Audio("/sounds/boot.mp3")
      bootSound.volume = 0.2
      bootSound.play().catch(() => {
        console.log("Audio autoplay prevented")
      })

      // Set booted after delay
      const timer = setTimeout(() => {
        setBooted(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [introComplete])

  // Handle errors
  const handleError = () => {
    console.error("Error in 3D component - skipping to terminal")
    setError(true)
    setIntroComplete(true)
  }

  // Check if we should show the intro
  const showIntro = !introComplete && !error && !skipIntro

  return (
    <ThemeProvider defaultTheme="dark" storageKey="terminal-theme">
      <main className="flex min-h-screen flex-col items-center justify-center terminal-text font-mono relative overflow-hidden">
        {showIntro ? (
          <div className="w-full h-screen">
            <ComputerIntro onComplete={() => setIntroComplete(true)} onError={handleError} />
            <button
              onClick={() => setSkipIntro(true)}
              className="absolute bottom-4 left-0 right-0 mx-auto w-40 text-center terminal-text terminal-bg p-2 rounded terminal-border hover:bg-opacity-20 z-50"
            >
              Skip Intro
            </button>
          </div>
        ) : (
          <>
            <CrtEffect />

            {!booted ? (
              <BootSequence onComplete={() => setBooted(true)} />
            ) : (
              <div className="w-full max-w-4xl h-[80vh] md:h-[80vh] p-1 relative">
                <Terminal />
              </div>
            )}
          </>
        )}
      </main>
    </ThemeProvider>
  )
}
