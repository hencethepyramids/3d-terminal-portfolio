"use client"

import type { Project } from "@/lib/types"
import { motion } from "framer-motion"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-green-500/30 rounded p-4 bg-black/50 hover:bg-green-900/10 transition-colors"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <div className="aspect-video bg-gray-900 rounded overflow-hidden flex items-center justify-center">
            {project.image ? (
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-green-500/50 text-center p-4">
                <span className="text-3xl">{"</>"}</span>
                <p className="mt-2 text-sm">No preview available</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h3 className="text-xl text-green-400 mb-2">{project.name}</h3>
          <p className="text-green-300 mb-3">{project.description}</p>

          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 text-sm underline"
              >
                GitHub
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 text-sm underline"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
