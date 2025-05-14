"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Globe, Share2 } from "lucide-react"
import { useState } from "react"

interface SocialLinksProps {
  className?: string
  showShareButton?: boolean
  projectName?: string
}

export default function SocialLinks({ className = "", showShareButton = false, projectName = "" }: SocialLinksProps) {
  const [showShareTooltip, setShowShareTooltip] = useState(false)

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: <Github size={18} />,
      color: "hover:text-gray-100",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: <Linkedin size={18} />,
      color: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: <Twitter size={18} />,
      color: "hover:text-blue-500",
    },
    {
      name: "Website",
      url: "https://yourwebsite.com",
      icon: <Globe size={18} />,
      color: "hover:text-green-400",
    },
  ]

  const handleShare = async () => {
    const shareData = {
      title: projectName ? `Check out this project: ${projectName}` : "Terminal Portfolio",
      text: projectName ? `Check out this awesome project: ${projectName}` : "Check out this terminal-style portfolio!",
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback - copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        setShowShareTooltip(true)
        setTimeout(() => setShowShareTooltip(false), 2000)
      }
    } catch (err) {
      console.error("Error sharing:", err)
    }
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {socialLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`text-green-400 ${link.color} transition-colors`}
          aria-label={link.name}
        >
          {link.icon}
        </motion.a>
      ))}

      {showShareButton && (
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="text-green-400 hover:text-yellow-400 transition-colors"
            aria-label="Share"
          >
            <Share2 size={18} />
          </motion.button>

          {showShareTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-green-900 text-green-100 text-xs rounded whitespace-nowrap"
            >
              URL copied!
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
