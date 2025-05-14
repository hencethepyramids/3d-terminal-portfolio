"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface CommandLineProps {
  onSubmit: (command: string) => void
  onNavigate: (direction: "up" | "down") => string
}

export default function CommandLine({ onSubmit, onNavigate }: CommandLineProps) {
  const [command, setCommand] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Blink cursor
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Focus input on mount and when clicked outside
    const handleClick = () => {
      inputRef.current?.focus()
    }

    window.addEventListener("click", handleClick)
    inputRef.current?.focus()

    return () => window.removeEventListener("click", handleClick)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle key navigation
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const prevCommand = onNavigate("up")
      if (prevCommand) setCommand(prevCommand)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const nextCommand = onNavigate("down")
      setCommand(nextCommand)
    } else if (e.key === "Tab") {
      e.preventDefault()
      // TODO: Implement tab completion
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(command)
    setCommand("")
  }

  // Play key sound on keypress
  const playKeySound = () => {
    const keySound = new Audio("/sounds/key.mp3")
    keySound.volume = 0.05
    keySound.play().catch(() => {})
  }

  return (
    <div className="border-t terminal-border p-2">
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="terminal-command mr-2 whitespace-nowrap">ethan@portfolio:~$</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => {
              setCommand(e.target.value)
              playKeySound()
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none terminal-text caret-transparent"
            autoComplete="off"
            spellCheck="false"
          />
          {cursorVisible && (
            <motion.span
              className="absolute h-5 w-2.5 terminal-cursor"
              style={{ left: `${command.length * 0.6}em` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
          )}
        </div>
      </form>
    </div>
  )
}
