"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import TypewriterComponent from "typewriter-effect"

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl p-4 text-green-500 font-mono"
    >
      <div className="mb-6">
        <TypewriterComponent
          options={{
            strings: [
              "BIOS v3.14.15",
              "Initializing system...",
              "Loading kernel...",
              "Mounting file systems...",
              "Starting network services...",
              "Launching terminal interface...",
            ],
            autoStart: true,
            loop: false,
            delay: 30,
            deleteSpeed: 5,
          }}
        />
      </div>

      <div className="mb-4">
        <div className="text-xs mb-1">System boot progress:</div>
        <div className="w-full bg-gray-900 h-2 rounded-sm overflow-hidden">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="text-right text-xs mt-1">{progress}%</div>
      </div>

      <div className="text-xs opacity-70">
        <p>CPU: Quantum Core i9 @ 5.2GHz</p>
        <p>RAM: 64GB DDR5 Cybernetic Memory</p>
        <p>GPU: NeoForce RTX 9090 Ti</p>
        <p>STORAGE: 2TB NVMe Quantum Drive</p>
      </div>
    </motion.div>
  )
}
