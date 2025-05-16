import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ThemeSwitcher from "@/components/theme-switcher"
import AccessibilityControls from "@/components/accessibility-controls"
import { TypingSoundsProvider } from "@/components/typing-sounds"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Terminal Portfolio",
  description: "A terminal-style developer portfolio",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add preload for Three.js to ensure it loads early */}
        <link rel="preload" href="https://unpkg.com/three@0.157.0/build/three.module.js" as="script" />
      </head>
      <body className={inter.className}>
        <TypingSoundsProvider>
          {children}
          <ThemeSwitcher />
          <AccessibilityControls />
        </TypingSoundsProvider>
      </body>
    </html>
  )
}
