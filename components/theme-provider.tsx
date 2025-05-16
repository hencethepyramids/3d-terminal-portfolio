"use client"

import * as React from "react"

type Theme = "dark" | "light" | "hacker" | "synth"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

export const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = "dark", storageKey = "theme", ...props }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)

  React.useEffect(() => {
    // Get theme from localStorage after component mounts
    const storedTheme = localStorage.getItem(storageKey) as Theme
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [storageKey])

  React.useEffect(() => {
    const root = window.document.documentElement

    // Remove old theme
    root.classList.remove("dark", "light", "hacker", "synth")

    // Add the new theme attribute
    root.setAttribute("data-theme", theme)

    // Store the theme preference
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
