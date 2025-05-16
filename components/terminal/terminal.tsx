"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CommandLine from "./command-line"
import CommandOutput from "./command-output"
import { executeCommand } from "@/lib/command-processor"
import type { CommandHistory } from "@/lib/types"
import dynamic from "next/dynamic"
import { Home } from "lucide-react"
import SocialLinks from "../social-links"
import { TypingSoundControls } from "../typing-sound-controls"
import { TypingSoundsProvider } from "../typing-sounds"

// Dynamically import the RoomExplorer component
const RoomExplorer = dynamic(() => import("@/components/room-explorer/room-explorer"), {
  ssr: false,
})

type ButtonContext = "main" | "help" | "projects" | "skills" | "files"

interface ButtonConfig {
  command: string
  label: string | React.ReactNode
}

const buttonContexts: Record<ButtonContext, ButtonConfig[]> = {
  main: [
    { command: "whoami", label: "About Me" },
    { command: "skills", label: "Skills" },
    { command: "projects", label: "Projects" },
    { command: "contact", label: "Contact" },
    { command: "help", label: "Help" },
  ],
  help: [
    { command: "ls", label: "List Files" },
    { command: "cat resume.txt", label: "View Resume" },
    { command: "theme dark", label: "Dark Theme" },
    { command: "theme synth", label: "Synth Theme" },
    { command: "matrix", label: "Matrix Effect" },
  ],
  projects: [
    { command: "ls projects/", label: "List Projects" },
    { command: "cat projects/monero_miner.md", label: "Monero Miner" },
    { command: "cat projects/shift_automation.md", label: "Shift Automation" },
    { command: "cat projects/altcoin_dashboard.md", label: "Altcoin Dashboard" },
    { command: "cat projects/react_terminal_ui.md", label: "Terminal UI" },
  ],
  skills: [
    { command: "ls skills/frontend", label: "Frontend" },
    { command: "ls skills/backend", label: "Backend" },
    { command: "ls skills/devops", label: "DevOps" },
    { command: "ls skills/other", label: "Other Skills" },
  ],
  files: [
    { command: "cat resume.txt", label: "Resume" },
    { command: "cat contact.sh", label: "Contact" },
    { command: "cat skills.json", label: "Skills" },
    { command: "./.hidden/room-explorer.exe", label: "Room Explorer" },
  ],
}

function CommandButton({ command, label, onClick }: { command: string; label: string | React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={() => (onClick ? onClick() : null)}
      className="terminal-button rounded px-3 py-1.5 text-sm hover:bg-opacity-50 transition-colors"
    >
      {label}
    </button>
  )
}

function CommandButtons({
  onExecute,
  context,
  onChangeContext,
}: {
  onExecute: (command: string) => void
  context: ButtonContext
  onChangeContext: (context: ButtonContext) => void
}) {
  // Get the buttons for the current context
  const buttons = buttonContexts[context] || buttonContexts.main

  return (
    <div className="p-2 border-t terminal-border">
      <div className="flex flex-wrap gap-2 justify-center">
        {/* Show back/home button if not in main context */}
        {context !== "main" && (
          <CommandButton
            command="home"
            label={
              <div className="flex items-center">
                <Home size={14} className="mr-1" /> Main
              </div>
            }
            onClick={() => onChangeContext("main")}
          />
        )}

        {/* Display context-specific buttons */}
        {buttons.map((btn: ButtonConfig) => (
          <CommandButton
            key={btn.command}
            command={btn.command}
            label={btn.label}
            onClick={() => {
              onExecute(btn.command)
              // Change context based on command
              if (btn.command === "help") onChangeContext("help")
              else if (btn.command === "projects") onChangeContext("projects")
              else if (btn.command === "skills") onChangeContext("skills")
              else if (btn.command === "ls") onChangeContext("files")
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Terminal() {
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output: (
        <div className="terminal-title">
          <p className="text-xl mb-2">Welcome to Terminal Portfolio v1.0.0</p>
          <p>
            Type <span className="terminal-highlight">help</span> to see available commands
          </p>
        </div>
      ),
    },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showRoomExplorer, setShowRoomExplorer] = useState(false)
  const [buttonContext, setButtonContext] = useState<ButtonContext>("main")
  const terminalRef = useRef<HTMLDivElement>(null)

  const handleCommand = async (command: string) => {
    // Add command to history
    if (command.trim()) {
      setCommandHistory((prev) => [...prev, command])
    }

    // Process the command
    const output = await executeCommand(command)

    // Update terminal history
    setHistory((prev) => [...prev, { command, output }])

    // Reset history navigation
    setHistoryIndex(-1)

    // Update button context based on command
    if (command === "help") {
      setButtonContext("help")
    } else if (command === "projects" || command.startsWith("ls projects")) {
      setButtonContext("projects")
    } else if (command === "skills") {
      setButtonContext("skills")
    } else if (command === "ls" || command.startsWith("ls .")) {
      setButtonContext("files")
    }

    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 100)
  }

  const handleKeyNavigation = (direction: "up" | "down") => {
    if (commandHistory.length === 0) return ""

    let newIndex
    if (direction === "up") {
      newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
    } else {
      newIndex = historyIndex > 0 ? historyIndex - 1 : -1
    }

    setHistoryIndex(newIndex)
    return newIndex >= 0 ? commandHistory[commandHistory.length - 1 - newIndex] : ""
  }

  const clearTerminal = () => {
    setHistory([])
  }

  // Check if room explorer should be launched
  useEffect(() => {
    if (typeof window !== "undefined" && window.launchRoomExplorer) {
      setShowRoomExplorer(true)
      window.launchRoomExplorer = false
    }
  }, [history])

  useEffect(() => {
    // Register clear terminal function
    window.clearTerminal = clearTerminal
  }, [])

  return (
    <TypingSoundsProvider>
      <>
        {showRoomExplorer && <RoomExplorer onClose={() => setShowRoomExplorer(false)} />}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full terminal-bg terminal-border border rounded-md overflow-hidden flex flex-col"
        >
          <div className="terminal-header p-1 border-b flex items-center">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-xs terminal-text">ethan@portfolio ~ </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <SocialLinks className="mr-2" />
              </div>
            </div>
          </div>

          <div ref={terminalRef} className="flex-1 p-3 overflow-y-auto scrollbar-thin">
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                {item.command && (
                  <div className="flex">
                    <span className="terminal-command mr-2">guest@portfolio:~$</span>
                    <span className="terminal-text">{item.command}</span>
                  </div>
                )}
                <CommandOutput output={item.output} />
              </div>
            ))}
          </div>

          <CommandLine onSubmit={handleCommand} onNavigate={handleKeyNavigation} />

          {/* Mobile-friendly command buttons with context */}
          <AnimatePresence mode="wait">
            <motion.div
              key={buttonContext}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CommandButtons onExecute={handleCommand} context={buttonContext} onChangeContext={setButtonContext} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </>
    </TypingSoundsProvider>
  )
}
