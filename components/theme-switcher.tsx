"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, X } from "lucide-react"

interface Theme {
  name: string
  label: string
  colors: {
    bg: string
    text: string
    accent: string
  }
}

const themes: Theme[] = [
  {
    name: "dark",
    label: "Terminal",
    colors: {
      bg: "#000000",
      text: "#00FF00",
      accent: "#003300",
    },
  },
  {
    name: "light",
    label: "Light",
    colors: {
      bg: "#F0F0F0",
      text: "#006400",
      accent: "#E0E0E0",
    },
  },
  {
    name: "hacker",
    label: "Hacker",
    colors: {
      bg: "#000A00",
      text: "#00FF41",
      accent: "#003B00",
    },
  },
  {
    name: "synth",
    label: "Synthwave",
    colors: {
      bg: "#14052A",
      text: "#FF00FF",
      accent: "#500A8C",
    },
  },
]

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("dark")

  useEffect(() => {
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("terminal-theme") || "dark"
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  const handleThemeChange = (themeName: string) => {
    document.documentElement.setAttribute("data-theme", themeName)
    localStorage.setItem("terminal-theme", themeName)
    setCurrentTheme(themeName)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="terminal-button p-2 rounded-full shadow-lg"
        aria-label={isOpen ? "Close theme switcher" : "Open theme switcher"}
      >
        {isOpen ? <X size={20} /> : <Palette size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-14 right-0 terminal-bg terminal-border border rounded-lg p-3 shadow-lg w-48"
          >
            <h3 className="terminal-title text-sm mb-2 border-b terminal-border pb-1">Select Theme</h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleThemeChange(theme.name)}
                  className={`flex items-center w-full p-2 rounded transition-colors ${
                    currentTheme === theme.name ? "bg-opacity-50" : "hover:bg-opacity-30"
                  }`}
                  style={{
                    backgroundColor: currentTheme === theme.name ? theme.colors.accent : "transparent",
                  }}
                  aria-pressed={currentTheme === theme.name}
                >
                  <div
                    className="w-6 h-6 rounded mr-2 border border-gray-600 flex items-center justify-center"
                    style={{ background: theme.colors.bg }}
                  >
                    <div className="w-3 h-3 rounded-sm" style={{ background: theme.colors.text }}></div>
                  </div>
                  <span className="terminal-text text-sm">{theme.label}</span>
                  {currentTheme === theme.name && <span className="ml-auto terminal-text text-xs">✓</span>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
