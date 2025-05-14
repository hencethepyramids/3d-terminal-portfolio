"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
      if (Math.random() > 0.1) {
        // 90% success rate for demo
        setStatus("success")
        setFormState({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="border border-green-500/30 rounded p-4 bg-black/50 max-w-lg"
    >
      <h3 className="text-lg text-green-400 mb-4">Contact Form</h3>

      {status === "success" ? (
        <div className="text-green-400 p-4 border border-green-500/30 rounded bg-green-900/20">
          <p>Message sent successfully! I'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-green-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full bg-black border border-green-500/30 rounded p-2 text-green-100 focus:border-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-green-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full bg-black border border-green-500/30 rounded p-2 text-green-100 focus:border-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-green-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-black border border-green-500/30 rounded p-2 text-green-100 focus:border-green-400 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {status === "error" && <p className="text-red-400 mt-2">Error sending message. Please try again.</p>}
        </form>
      )}
    </motion.div>
  )
}
