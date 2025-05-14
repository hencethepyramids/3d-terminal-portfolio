"use client"

import { motion } from "framer-motion"
import { Download, Briefcase, GraduationCap, Award, Code } from "lucide-react"
import SocialLinks from "../social-links"
import { QRCodeSVG } from 'qrcode.react'
import { useRef, ReactNode } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface ResumeSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

interface ResumeItemProps {
  title: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

export default function InteractiveResume() {
  const resumeRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={resumeRef} className="border border-green-500/30 rounded-lg bg-black/50 p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl text-green-400 font-bold">Ethan Ellerstein</h2>
          <p className="text-green-300 mt-1">
            <a href="http://ethanellerstein.com/" className="underline text-green-400">ethanellerstein.com</a> |
            <a href="mailto:eellerstein@gmail.com" className="underline text-green-400 ml-1">eellerstein@gmail.com</a> |
            <span className="ml-1">(484)–752–2434</span>
          </p>
        </div>
        <a
          href="/ethan-ellerstein-resume.pdf"
          download
          className="flex items-center bg-green-700 hover:bg-green-600 text-white px-3 py-2 rounded transition-colors"
          aria-label="Download resume as PDF"
        >
          <Download size={16} className="mr-2" />
          <span>Download PDF</span>
        </a>
      </div>

      {/* Education */}
      <ResumeSection icon={<GraduationCap />} title="Education">
        <div className="space-y-2">
          <p className="text-green-300 font-bold">University of Minnesota, Duluth – Bachelor of Science <span className="float-right font-normal">12/2024</span></p>
          <p className="text-green-400">Major: Computer Science <span className="ml-4 text-green-300">3.5/4.0 GPA</span></p>
          <p className="text-green-400">Minor: Professional Writing <span className="ml-4 text-green-300">4.0/4.0 GPA</span></p>
        </div>
      </ResumeSection>

      {/* Skills */}
      <ResumeSection icon={<Code />} title="Computer Skills">
        <div className="space-y-1">
          <p><span className="font-bold text-green-300">Languages:</span> <span className="text-green-400">C++, JavaScript, PHP, Python, HTML, CSS, SQL, NoSQL, UML, Lua, Assembly</span></p>
          <p><span className="font-bold text-green-300">Frameworks:</span> <span className="text-green-400">React, Node.js, Next.js, Three.js, Tailwind CSS</span></p>
          <p><span className="font-bold text-green-300">Tools &amp; Systems:</span> <span className="text-green-400">Docker, Visual Studio Code, IntelliJ, iTerm2, Nmap, VirtualBox, DataGrip, DBeaver, Hostinger</span></p>
          <p><span className="font-bold text-green-300">OS:</span> <span className="text-green-400">Windows, Mac, Linux</span></p>
          <p><span className="font-bold text-green-300">Development:</span> <span className="text-green-400">Agile Methodology, Git, REST APIs</span></p>
        </div>
      </ResumeSection>

      {/* Experience */}
      <ResumeSection icon={<Briefcase />} title="Experience">
        <div className="space-y-4">
          <ResumeItem
            title="Outlier AI – AI Research/Contributor"
            organization="01/2024-Current"
            description="Contributed to exploratory and applied AI solutions with a focus on automation and prompt engineering. Developed and tested data pipelines and model interaction layers using Python."
          />
          <ResumeItem
            title="Freelancer Developer – Upwork"
            organization="01/2025-Current"
            description="Completed client projects in front-end development and automation scripting. Delivered clean, responsive codebases using React, Tailwind, and Python with 5-star feedback."
          />
          <ResumeItem
            title="Youth Tech Inc. – Technology Instructor"
            organization="06/2024-08/2024"
            description="Taught coding, game development, and digital design to students aged 6–17 at a non-profit computer camp dedicated to providing enrichment opportunities for students with a passion for learning. Developed and delivered curriculum in areas such as video game design, animation, web design, and robotics. Fostered a fun, interactive learning environment, encouraging creativity and problem-solving skills among students."
          />
        </div>
      </ResumeSection>

      {/* Projects */}
      <ResumeSection icon={<Code />} title="Projects">
        <div className="space-y-4">
          <ResumeItem
            title="3D-Terminal-Portfolio"
            organization="05/2025-Current"
            description="Created an interactive 3D terminal-style portfolio website using Three.js and React, designed to showcase personal projects in a retro command-line interface. Implemented animated scene transitions, camera controls, and interactive CLI-like inputs to create a highly engaging user experience. Optimized WebGL rendering performance and ensured full responsiveness across desktop and mobile devices."
          />
          <ResumeItem
            title="Traffic-Stop-Detection"
            organization="03/2025-Current"
            description="Developed a real-time traffic light detection system using Python and YOLOv5. The application identifies traffic light states (Red, Yellow, Green) from live camera feeds or video inputs, incorporating a countdown timer for red lights. This project demonstrates proficiency in computer vision and real-time object detection."
          />
          <ResumeItem
            title="SpyderByte"
            organization="09/2024"
            description="Built a full-stack price comparison platform using React, Node.js, and Puppeteer.js for real-time scraping, responsive UI, and dynamic deal tracking across e-commerce retailers. Designed a modular scraping engine that supports plug-and-play APIs for new vendors, improving extensibility."
          />
          <ResumeItem
            title="AI-Powered Threat Detection System"
            organization="07/2024"
            description="Developed a machine learning system for real-time cybersecurity threat prediction. Focused on data preprocessing, predictive modeling, and integration with existing security infrastructure. Built a scalable pipeline for ingesting and analyzing logs in near real-time, enabling proactive threat response through alerts and automated triage."
          />
          <ResumeItem
            title="Beta GetFit APP – UMD"
            organization="10/2023-12/2023"
            description="Led a student team through agile development of a fitness tracking app. Coordinated across roles, implemented features, and maintained high team engagement and productivity."
          />
        </div>
      </ResumeSection>

      {/* Activities, Certificates, Honors */}
      <ResumeSection icon={<Award />} title="Activities, Certificates & Honors">
        <div className="space-y-2">
          <p><span className="font-bold text-green-300">Activities:</span> <span className="text-green-400">Association for Computing Machinery (ACM), Robotics, YOUMatter, UMD Esports, Powerlifting</span></p>
          <p><span className="font-bold text-green-300">Certificates:</span> <span className="text-green-400">ISC2 Certified in Cybersecurity, AWS Certifications</span></p>
          <p><span className="font-bold text-green-300">Honors:</span> <span className="text-green-400">Dean's List</span></p>
        </div>
      </ResumeSection>
    </div>
  )
}

function ResumeSection({ icon, title, children }: ResumeSectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <div className="text-green-400 mr-2">{icon}</div>
        <h3 className="text-xl text-green-400">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function ResumeItem({ title, organization, description }: { title: string; organization: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="border-l-2 border-green-500/30 pl-4"
    >
      <h4 className="text-green-300 font-medium">{title}</h4>
      <div className="flex justify-between text-sm">
        <p className="text-green-400">{organization}</p>
      </div>
      <p className="text-green-300/90 mt-1 text-sm">{description}</p>
    </motion.div>
  )
}
