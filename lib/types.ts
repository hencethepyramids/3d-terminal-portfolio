import type { ReactNode } from "react"

export type CommandOutput = ReactNode

export interface CommandHistory {
  command: string
  output: CommandOutput
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  image?: string
}

// Update the Skill interface to remove the level property
export interface Skill {
  name: string
  category: "frontend" | "backend" | "devops" | "other"
}

// Extend Window interface to add clearTerminal function
declare global {
  interface Window {
    clearTerminal?: () => void
    launchRoomExplorer?: boolean
  }
}
