"use client"

import type React from "react"
import { motion } from "framer-motion"

interface CommandOutputProps {
  output: React.ReactNode
}

export default function CommandOutput({ output }: CommandOutputProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-1 terminal-text"
    >
      {output}
    </motion.div>
  )
}
