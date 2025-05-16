"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Accessibility, ZoomIn, ZoomOut, Eye } from "lucide-react"
import { TypingSoundControls } from "./typing-sound-controls"

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = Number.parseInt(localStorage.getItem("terminal-font-size") || "16")
    const savedHighContrast = localStorage.getItem("terminal-high-contrast") === "true"

    setFontSize(savedFontSize)
    setHighContrast(savedHighContrast)

    // Apply saved preferences
    document.documentElement.style.fontSize = `${savedFontSize}px`
    if (savedHighContrast) {
      document.documentElement.classList.add("high-contrast")
    }
  }, [])

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 2, 24)
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}px`
    localStorage.setItem("terminal-font-size", newSize.toString())
  }

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 2, 12)
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}px`
    localStorage.setItem("terminal-font-size", newSize.toString())
  }

  const toggleHighContrast = () => {
    const newValue = !highContrast
    setHighContrast(newValue)

    if (newValue) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    localStorage.setItem("terminal-high-contrast", newValue.toString())
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="terminal-button p-2 rounded-full shadow-lg"
        aria-label={isOpen ? "Close accessibility menu" : "Open accessibility menu"}
      >
        <Accessibility size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-14 left-0 terminal-bg terminal-border border rounded-lg p-3 shadow-lg w-64"
          >
            <h3 className="terminal-title text-sm mb-2 border-b terminal-border pb-1">Accessibility</h3>

            <div className="space-y-3">
              <div>
                <p className="terminal-text text-xs mb-1">Text Size</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={decreaseFontSize}
                    className="terminal-button p-1 rounded"
                    aria-label="Decrease font size"
                  >
                    <ZoomOut size={16} />
                  </button>

                  <span className="terminal-text text-xs">{fontSize}px</span>

                  <button
                    onClick={increaseFontSize}
                    className="terminal-button p-1 rounded"
                    aria-label="Increase font size"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
              </div>

              <div>
                <button
                  onClick={toggleHighContrast}
                  className={`flex items-center justify-between w-full p-2 rounded ${
                    highContrast ? "bg-opacity-70" : "bg-opacity-30 hover:bg-opacity-50"
                  } terminal-button`}
                  aria-pressed={highContrast}
                >
                  <div className="flex items-center">
                    <Eye size={16} className="mr-2" />
                    <span className="text-xs">High Contrast</span>
                  </div>
                  <span>{highContrast ? "ON" : "OFF"}</span>
                </button>
              </div>

              {/* Typing Sounds Controls */}
              <TypingSoundControls />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
