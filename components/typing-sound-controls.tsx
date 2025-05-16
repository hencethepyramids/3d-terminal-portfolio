"use client"

import { useTypingSounds } from "./typing-sounds"

export function TypingSoundControls() {
  const {
    isEnabled,
    setIsEnabled,
    currentVolume,
    setCurrentVolume,
    currentProfile,
    setCurrentProfile,
  } = useTypingSounds()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">Typing Sounds</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
          />
          <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <div
        className={`transition-all duration-300 overflow-hidden ${isEnabled ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
        aria-hidden={!isEnabled}
      >
        <div className="space-y-1 mt-1">
          <label className="text-xs font-medium">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={currentVolume}
            onChange={(e) => setCurrentVolume(parseFloat(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
        <div className="space-y-1 mt-1" onClick={e => e.stopPropagation()}>
          <label className="text-xs font-medium">Sound Profile</label>
          <select
            value={currentProfile}
            onChange={(e) => setCurrentProfile(e.target.value as any)}
            className="w-full p-1 bg-background border rounded text-xs"
          >
            <option value="mechanical">Mechanical</option>
            <option value="soft">Soft</option>
            <option value="vintage">Vintage</option>
          </select>
        </div>
      </div>
    </div>
  )
} 