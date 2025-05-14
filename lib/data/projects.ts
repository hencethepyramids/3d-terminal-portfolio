import type { Project } from "../types"

export const projects: Project[] = [
  {
    name: "monero_miner",
    description: "A cryptocurrency mining dashboard with real-time statistics and monitoring capabilities.",
    technologies: ["React", "Node.js", "WebSockets", "Chart.js"],
    github: "https://github.com/username/monero_miner",
    image: "/images/projects/monero.png",
  },
  {
    name: "shift_automation",
    description: "Automated shift scheduling tool for remote teams with AI-powered optimization.",
    technologies: ["Python", "Django", "TensorFlow", "PostgreSQL"],
    link: "https://shift-automation.example.com",
    github: "https://github.com/username/shift_automation",
    image: "/images/projects/shift.png",
  },
  {
    name: "altcoin_dashboard",
    description: "Real-time cryptocurrency tracking dashboard with portfolio management.",
    technologies: ["Vue.js", "Express", "MongoDB", "D3.js"],
    link: "https://altcoin-dashboard.example.com",
    github: "https://github.com/username/altcoin_dashboard",
    image: "/images/projects/altcoin.png",
  },
  {
    name: "react_terminal_ui",
    description: "A React library for building terminal-like interfaces in web applications.",
    technologies: ["TypeScript", "React", "Styled Components", "Jest"],
    github: "https://github.com/username/react_terminal_ui",
    image: "/images/projects/terminal.png",
  },
]
