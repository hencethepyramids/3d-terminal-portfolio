"use client"

import type { Skill } from "@/lib/types"
import { motion } from "framer-motion"
import { useState } from "react"
import { Code, Server, Cloud, Lightbulb } from "lucide-react"

interface SkillsListProps {
  skills: Skill[]
}

// Map categories to icons and display names
const categories = {
  frontend: {
    icon: <Code size={18} />,
    name: "Frontend",
  },
  backend: {
    icon: <Server size={18} />,
    name: "Backend",
  },
  devops: {
    icon: <Cloud size={18} />,
    name: "DevOps",
  },
  other: {
    icon: <Lightbulb size={18} />,
    name: "Other",
  },
}

export default function SkillsList({ skills }: SkillsListProps) {
  const [filter, setFilter] = useState<string | null>(null)

  // Group skills by category
  const skillsByCategory = {
    frontend: skills.filter((skill) => skill.category === "frontend"),
    backend: skills.filter((skill) => skill.category === "backend"),
    devops: skills.filter((skill) => skill.category === "devops"),
    other: skills.filter((skill) => skill.category === "other"),
  }

  // Get all categories or just the filtered one
  const categoriesToShow = filter ? [filter] : Object.keys(skillsByCategory)

  return (
    <div className="space-y-6">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter(null)}
          className={`px-3 py-1 rounded text-sm ${
            filter === null ? "terminal-button bg-opacity-70" : "terminal-button hover:bg-opacity-50"
          }`}
        >
          All
        </button>
        {Object.keys(skillsByCategory).map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${
              filter === category ? "terminal-button bg-opacity-70" : "terminal-button hover:bg-opacity-50"
            }`}
          >
            <span className="mr-1">{categories[category].icon}</span>
            <span className="capitalize">{categories[category].name}</span>
          </button>
        ))}
      </div>

      {/* Display by category */}
      <div className="space-y-6">
        {categoriesToShow.map((category) => {
          const categorySkills = skillsByCategory[category]

          if (categorySkills.length === 0) return null

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="terminal-border border rounded p-4 terminal-bg"
            >
              <h3 className="text-lg terminal-title mb-3 flex items-center">
                <span className="mr-2">{categories[category].icon}</span>
                <span>{categories[category].name}</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => (
                  <div
                    key={index}
                    className="terminal-button bg-opacity-20 border terminal-border border-opacity-20 rounded px-3 py-1.5"
                  >
                    <span className="terminal-text">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
