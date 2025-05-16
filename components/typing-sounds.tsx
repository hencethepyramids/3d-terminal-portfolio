"use client"

import React, { useContext, useState, createContext, useCallback } from "react"

type SoundProfile = "mechanical" | "soft" | "vintage"

interface TypingSoundsContextType {
  isEnabled: boolean
  setIsEnabled: (v: boolean) => void
  currentVolume: number
  setCurrentVolume: (v: number) => void
  currentProfile: SoundProfile
  setCurrentProfile: (v: SoundProfile) => void
  playKeydownSound: () => void
  playKeyupSound: () => void
}

const TypingSoundsContext = createContext<TypingSoundsContextType | undefined>(undefined)

const SOUND_PROFILES = {
  mechanical: "/sounds/mechanical-keyboard.mp3",
  soft: "/sounds/soft-keyboard.mp3",
  vintage: "/sounds/vintage-keyboard.mp3",
}

export function TypingSoundsProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(true)
  const [currentVolume, setCurrentVolume] = useState(0.5)
  const [currentProfile, setCurrentProfile] = useState<SoundProfile>("mechanical")

  const playSound = useCallback(() => {
    if (!isEnabled) return
    const audio = new Audio(SOUND_PROFILES[currentProfile])
    audio.volume = currentVolume
    audio.currentTime = 0
    audio.play().catch(() => {})
  }, [isEnabled, currentProfile, currentVolume])

  const value: TypingSoundsContextType = {
    isEnabled,
    setIsEnabled,
    currentVolume,
    setCurrentVolume,
    currentProfile,
    setCurrentProfile,
    playKeydownSound: playSound,
    playKeyupSound: playSound,
  }

  return (
    <TypingSoundsContext.Provider value={value}>
      {children}
    </TypingSoundsContext.Provider>
  )
}

export function useTypingSounds() {
  const ctx = useContext(TypingSoundsContext)
  if (!ctx) throw new Error("useTypingSounds must be used within a TypingSoundsProvider")
  return ctx
} 