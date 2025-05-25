export function extractKeywords(jobDescription: string): string[] {
  if (!jobDescription) return []

  // Common technical skills to look for
  const technicalSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Express",
    "Next.js",
    "Python",
    "Django",
    "Flask",
    "Java",
    "Spring",
    "C#",
    ".NET",
    "PHP",
    "Laravel",
    "Ruby",
    "Rails",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
    "REST API",
    "GraphQL",
    "HTML",
    "CSS",
    "Sass",
    "LESS",
    "Tailwind",
    "Bootstrap",
    "Material UI",
    "Redux",
    "MobX",
    "Zustand",
    "Webpack",
    "Vite",
    "Rollup",
    "Jest",
    "Mocha",
    "Cypress",
    "Selenium",
    "Agile",
    "Scrum",
    "Kanban",
    "Jira",
    "Confluence",
    "Figma",
    "Sketch",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "UI/UX",
    "Responsive Design",
    "Mobile Development",
    "iOS",
    "Android",
    "React Native",
    "Flutter",
    "Xamarin",
    "Unity",
    "Machine Learning",
    "AI",
    "Data Science",
    "TensorFlow",
    "PyTorch",
    "NLP",
    "Computer Vision",
    "DevOps",
    "SRE",
    "Linux",
    "Unix",
    "Shell Scripting",
    "Bash",
    "PowerShell",
    "Networking",
    "Security",
    "Blockchain",
    "Ethereum",
    "Solidity",
    "Smart Contracts",
    "Web3",
    "NFT",
  ]

  // Common soft skills to look for
  const softSkills = [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Critical Thinking",
    "Creativity",
    "Leadership",
    "Time Management",
    "Adaptability",
    "Flexibility",
    "Organization",
    "Attention to Detail",
    "Analytical Skills",
    "Decision Making",
    "Conflict Resolution",
    "Emotional Intelligence",
    "Interpersonal Skills",
    "Negotiation",
    "Persuasion",
    "Presentation",
    "Public Speaking",
    "Customer Service",
    "Project Management",
    "Multitasking",
    "Self-Motivation",
    "Work Ethic",
    "Collaboration",
    "Initiative",
    "Patience",
    "Persistence",
    "Resilience",
    "Stress Management",
  ]

  // Combine all skills
  const allSkills = [...technicalSkills, ...softSkills]

  // Find matches in the job description
  const matches: string[] = []
  const jobDescLower = jobDescription.toLowerCase()

  allSkills.forEach((skill) => {
    if (jobDescLower.includes(skill.toLowerCase())) {
      // Avoid duplicates
      if (!matches.includes(skill)) {
        matches.push(skill)
      }
    }
  })

  // Extract additional requirements and responsibilities
  const requirementsRegex =
    /requirements|qualifications|what you'll need|what we're looking for|skills|experience required/i
  const requirementsSection = jobDescription.split(/\n\n|\r\n\r\n/).find((section) => requirementsRegex.test(section))

  // Extract bullet points if they exist
  const bulletPoints: string[] = []
  if (requirementsSection) {
    const lines = requirementsSection.split(/\n|\r\n/)
    lines.forEach((line) => {
      const trimmedLine = line.trim().replace(/^[-•*]\s*/, "")
      if (trimmedLine && trimmedLine.length > 10 && !bulletPoints.includes(trimmedLine)) {
        // Extract key phrases from bullet points
        const words = trimmedLine.split(/\s+/)
        if (words.length >= 2 && words.length <= 5) {
          bulletPoints.push(trimmedLine)
        }
      }
    })
  }

  // Combine matches with additional extracted keywords
  const combinedKeywords = [...matches, ...bulletPoints]

  // Limit to top 20 keywords to avoid overwhelming the user
  return combinedKeywords.slice(0, 20)
}
