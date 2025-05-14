import { projects } from "./data/projects"
import { skills } from "./data/skills"
import type { CommandOutput } from "./types"
import AsciiArt from "@/components/ascii-art"
import ProjectCard from "@/components/projects/project-card"
import SkillsList from "@/components/skills/skills-list"
import ContactForm from "@/components/contact/contact-form"
import dynamic from "next/dynamic"
import InteractiveResume from "@/components/resume/interactive-resume"

// Dynamically import the RoomExplorer component
const RoomExplorer = dynamic(() => import("@/components/room-explorer/room-explorer"), {
  ssr: false,
  loading: () => (
    <div className="text-green-500">
      <p>Loading room explorer...</p>
    </div>
  ),
})

export async function executeCommand(command: string): Promise<CommandOutput> {
  // Trim and lowercase the command
  const trimmedCommand = command.trim().toLowerCase()

  // Split command and arguments
  const [cmd, ...args] = trimmedCommand.split(" ")

  // Process command
  switch (cmd) {
    case "help":
      return (
        <div className="terminal-text">
          <p className="terminal-highlight mb-2">Available commands:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <li>
              <span className="terminal-command">whoami</span> - Learn about me
            </li>
            <li>
              <span className="terminal-command">skills</span> - My tech stack
            </li>
            <li>
              <span className="terminal-command">projects</span> - Portfolio list
            </li>
            <li>
              <span className="terminal-command">contact</span> - Reach out
            </li>
            <li>
              <span className="terminal-command">clear</span> - Clears terminal
            </li>
            <li>
              <span className="terminal-command">theme [name]</span> - Switch UI mode
            </li>
            <li>
              <span className="terminal-command">ls projects/</span> - List projects
            </li>
            <li>
              <span className="terminal-command">cat resume.txt</span> - View resume
            </li>
            <li>
              <span className="terminal-command">interactive-resume</span> - Visual resume
            </li>
            <li>
              <span className="terminal-command">matrix</span> - Matrix animation
            </li>
            <li>
              <span className="terminal-command">reboot</span> - Reload portfolio
            </li>
          </ul>
        </div>
      )

    case "whoami":
      return (
        <div className="text-green-300">
          <AsciiArt art="avatar" className="mb-2" />
          <p className="text-xl mb-2">Developer | Creative Coder | Automation Enthusiast</p>
          <p className="mb-1">I build digital experiences with a focus on performance and user experience.</p>
          <p>Based in Earth (Remote Ready) and passionate about creating innovative solutions.</p>
        </div>
      )

    case "skills":
      return <SkillsList skills={skills} />

    case "projects":
    case "ls":
      if (args[0] === "projects/" || args[0] === "projects") {
        return (
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        )
      } else if (args[0] === ".hidden/") {
        return (
          <div>
            <p className="text-yellow-400">Hidden directory listing:</p>
            <ul className="grid grid-cols-1 gap-1 mt-2">
              <li className="text-red-400">room-explorer.exe</li>
            </ul>
          </div>
        )
      } else if (args[0]?.startsWith("skills/")) {
        const category = args[0].split("/")[1]
        const filteredSkills = skills.filter((skill) => skill.category === category)

        return (
          <div>
            <p className="text-yellow-400">{category.charAt(0).toUpperCase() + category.slice(1)} Skills:</p>
            <ul className="grid grid-cols-1 gap-1 mt-2">
              {filteredSkills.map((skill, index) => (
                <li key={index} className="text-green-400">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )
      }
      return (
        <div>
          <p className="text-yellow-400">Directory listing:</p>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-2">
            <li className="text-blue-400">projects/</li>
            <li className="text-blue-400 opacity-50">.hidden/</li>
            <li className="text-green-400">resume.txt</li>
            <li className="text-green-400">contact.sh</li>
            <li className="text-yellow-400">skills.json</li>
            <li className="text-red-400">secrets.enc</li>
          </ul>
        </div>
      )

    case "cat":
      if (args[0] === "resume.txt") {
        return (
          <div className="border border-green-500/30 p-4 bg-black/50 rounded">
            <h2 className="text-xl text-green-400 border-b border-green-500/30 pb-2 mb-4">RESUME.TXT</h2>

            <div className="mb-4">
              <h3 className="text-yellow-400 mb-2">SKILLS</h3>
              <p className="text-green-300">
                🔧 Languages: JavaScript/TypeScript, Python, Rust, Go
                <br />
                🛠️ Frontend: React, Next.js, Vue, Svelte
                <br />🧰 Backend: Node.js, Express, Django, FastAPI
                <br />
                🗄️ Database: PostgreSQL, MongoDB, Redis
                <br />
                ☁️ Cloud: AWS, Vercel, Netlify, Docker
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-yellow-400 mb-2">EXPERIENCE</h3>
              <p className="text-green-300">
                <span className="text-white">Senior Developer @ TechCorp</span>
                <br />
                2020 - Present
                <br />
                Led development of scalable web applications and microservices.
              </p>
              <p className="text-green-300 mt-2">
                <span className="text-white">Frontend Engineer @ StartupX</span>
                <br />
                2018 - 2020
                <br />
                Built responsive UIs and implemented complex state management.
              </p>
            </div>

            <div>
              <h3 className="text-yellow-400 mb-2">EDUCATION</h3>
              <p className="text-green-300">
                <span className="text-white">B.S. Computer Science</span>
                <br />
                Tech University, 2018
              </p>
            </div>
          </div>
        )
      } else if (args[0]?.startsWith("projects/")) {
        const projectName = args[0].split("/")[1]?.replace(".md", "")
        const project = projects.find((p) => p.name === projectName)

        if (project) {
          return (
            <div className="border border-green-500/30 p-4 bg-black/50 rounded">
              <h2 className="text-xl text-green-400 border-b border-green-500/30 pb-2 mb-4">{project.name}</h2>

              {project.image && (
                <div className="mb-4">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full max-w-md mx-auto rounded border border-green-500/30"
                  />
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-yellow-400 mb-2">DESCRIPTION</h3>
                <p className="text-green-300">{project.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-yellow-400 mb-2">TECHNOLOGIES</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-green-900/30 text-green-300 px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    GitHub Repository
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          )
        }
        return <p className="text-red-400">Error: Project {projectName} not found.</p>
      } else if (args[0] === "contact.sh") {
        return <ContactForm />
      } else if (args[0] === "skills.json") {
        return (
          <div className="font-mono text-green-300 bg-black/50 p-4 rounded border border-green-500/30 overflow-x-auto">
            <pre>{JSON.stringify({ skills }, null, 2)}</pre>
          </div>
        )
      }
      return <p className="text-red-400">Error: File {args[0]} not found.</p>

    case "contact":
      return <ContactForm />

    case "clear":
      if (typeof window !== "undefined" && window.clearTerminal) {
        window.clearTerminal()
      }
      return <></>

    case "theme":
      const theme = args[0]
      if (!theme) {
        return <p className="terminal-highlight">Usage: theme [dark|light|hacker|synth]</p>
      }

      // Set theme
      if (typeof window !== "undefined") {
        const validThemes = ["dark", "light", "hacker", "synth"]
        if (validThemes.includes(theme)) {
          document.documentElement.setAttribute("data-theme", theme)
          localStorage.setItem("terminal-theme", theme)
          return <p className="terminal-command">Theme switched to {theme}</p>
        } else {
          return <p className="text-red-400">Invalid theme. Available themes: dark, light, hacker, synth</p>
        }
      }
      return <p className="text-red-400">Error setting theme</p>

    case "matrix":
      return (
        <div>
          <p className="text-green-400 mb-2">Initializing Matrix protocol...</p>
          <div className="matrix-animation h-40 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="matrix-line">
                {Array.from({ length: 40 }).map((_, j) => (
                  <span key={j} className="matrix-char" style={{ animationDelay: `${Math.random() * 5}s` }}>
                    {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="text-green-400 mt-2">Matrix initialized. Press any key to exit.</p>
        </div>
      )

    case "reboot":
      if (typeof window !== "undefined") {
        window.location.reload()
      }
      return <p className="text-yellow-400">Rebooting system...</p>

    case "sudo":
      if (args.join(" ") === "rm -rf /") {
        return (
          <div>
            <p className="text-red-500 mb-2">WARNING: SYSTEM DESTRUCTION INITIATED</p>
            <div className="ascii-explosion">
              <pre className="text-red-500 animate-pulse">
                {`
   .--.
  |o_o |
  |:_/ |
 //   \\ \\
(|     | )
/'\\_   _/\`\\
\\___)=(___/
                `}
              </pre>
            </div>
            <p className="text-red-500 mt-2">Just kidding! That would be a terrible idea.</p>
          </div>
        )
      }
      return <p className="text-red-400">Permission denied: Are you sure you're a sudoer?</p>

    case "run":
    case "./":
    case "./.hidden/room-explorer.exe":
    case "./room-explorer.exe":
      if (
        args[0] === ".hidden/room-explorer.exe" ||
        args[0] === "room-explorer.exe" ||
        cmd === "./.hidden/room-explorer.exe" ||
        cmd === "./room-explorer.exe"
      ) {
        if (typeof window !== "undefined") {
          window.launchRoomExplorer = true
        }
        return (
          <div>
            <p className="text-green-400 mb-2">Launching Room Explorer...</p>
            <p className="text-yellow-400">Use mouse to look around and scroll to zoom in/out.</p>
          </div>
        )
      }
      return <p className="text-red-400">Error: Cannot execute {args[0]}. File not found or permission denied.</p>

    case "grep":
      if (args.length < 2) {
        return <p className="text-yellow-400">Usage: grep [pattern] [file]</p>
      }

      const pattern = args[0]
      const fileToGrep = args[1]

      if (fileToGrep === "*.txt" || fileToGrep === "*") {
        if (pattern.toLowerCase() === "hidden" || pattern.toLowerCase() === "secret") {
          return (
            <div>
              <p className="text-green-300">
                resume.txt: Check out the <span className="text-yellow-400">.hidden</span> directory for more content
              </p>
              <p className="text-green-300">
                system.log: Created <span className="text-yellow-400">.hidden</span> directory for developer tools
              </p>
            </div>
          )
        }
      }

      return (
        <p className="text-yellow-400">
          No matches found for pattern '{pattern}' in {fileToGrep}
        </p>
      )

    case "find":
      if (args.length < 1) {
        return <p className="text-yellow-400">Usage: find [path] -name [pattern]</p>
      }

      const path = args[0]
      const nameFlag = args.indexOf("-name")

      if (nameFlag !== -1 && args.length > nameFlag + 1) {
        const namePattern = args[nameFlag + 1]

        if (namePattern === "*.exe" || namePattern === "*explorer*") {
          return (
            <div>
              <p className="text-green-300">./.hidden/room-explorer.exe</p>
            </div>
          )
        }
      }

      if (path === "." || path === "/" || path === "*") {
        return (
          <div>
            <p className="text-green-300">./projects</p>
            <p className="text-green-300">./resume.txt</p>
            <p className="text-green-300">./contact.sh</p>
            <p className="text-green-300">./skills.json</p>
            <p className="text-green-300">./.hidden</p>
          </div>
        )
      }

      return <p className="text-yellow-400">No matching files found</p>

    case "file":
      if (args.length < 1) {
        return <p className="text-yellow-400">Usage: file [filename]</p>
      }

      const fileToCheck = args[0]

      if (fileToCheck === ".hidden/room-explorer.exe") {
        return (
          <p className="text-green-300">.hidden/room-explorer.exe: executable, x86-64, 3D room exploration utility</p>
        )
      }

      if (fileToCheck.endsWith(".exe")) {
        return <p className="text-yellow-400">{fileToCheck}: file not found</p>
      }

      if (fileToCheck === ".hidden") {
        return <p className="text-green-300">.hidden: directory, contains developer tools and utilities</p>
      }

      return <p className="text-yellow-400">file: cannot determine file type of '{fileToCheck}'</p>

    case "":
      return <></>

    case "resume":
    case "interactive-resume":
      return <InteractiveResume />

    default:
      return <p className="text-red-400">Command not found: {cmd}. Type 'help' for available commands.</p>
  }
}
