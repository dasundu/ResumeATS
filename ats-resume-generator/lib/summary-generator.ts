import type { ResumeData } from "./resume-store"

export function generateSummary(resumeData: ResumeData): string {
  const { personalInfo, experience, education, skills, projects, keywords } = resumeData

  // Extract key information
  const name = personalInfo.fullName
  const title = personalInfo.jobTitle
  const yearsOfExperience = calculateYearsOfExperience(experience)
  const highestEducation = getHighestEducation(education)
  const topSkills = getTopSkills(skills, keywords)
  const keyAchievements = getKeyAchievements(experience, projects)

  // Generate summary based on available information
  let summary = ""

  if (yearsOfExperience > 0) {
    // For professionals with experience
    summary = `${title} with ${formatYearsOfExperience(yearsOfExperience)} of experience ${topSkills.length > 0 ? `specializing in ${topSkills.slice(0, 3).join(", ")}` : ""}. `

    if (keyAchievements.length > 0) {
      summary += `Proven track record of ${keyAchievements[0].toLowerCase()}${keyAchievements.length > 1 ? ` and ${keyAchievements[1].toLowerCase()}` : ""}. `
    }

    if (highestEducation) {
      summary += `${highestEducation}. `
    }

    // Add relevant keywords if available
    if (keywords.length > 0) {
      const relevantKeywords = keywords
        .filter((keyword) => !topSkills.includes(keyword) && !summary.toLowerCase().includes(keyword.toLowerCase()))
        .slice(0, 3)

      if (relevantKeywords.length > 0) {
        summary += `Skilled in ${relevantKeywords.join(", ")}.`
      }
    }
  } else {
    // For students or entry-level professionals
    const degreeInfo = highestEducation ? `${highestEducation}` : ""

    if (degreeInfo) {
      summary = `${degreeInfo} ${title ? `aspiring to work as a ${title}` : "professional"}. `
    } else {
      summary = `${title ? `Aspiring ${title}` : "Professional"} with a passion for ${topSkills.length > 0 ? topSkills.slice(0, 2).join(" and ") : "the field"}. `
    }

    // Add project experience if available
    if (projects.length > 0 && projects[0].title) {
      summary += `Experience with ${projects.length} ${projects.length === 1 ? "project" : "projects"} including ${projects[0].title}${projects.length > 1 ? ` and ${projects[1].title}` : ""}. `
    }

    // Add skills
    if (topSkills.length > 0) {
      summary += `Proficient in ${topSkills.slice(0, 4).join(", ")}.`
    }
  }

  // Ensure the summary is not too long (3-5 lines)
  if (summary.length > 500) {
    summary = summary.substring(0, 500).trim()
    const lastPeriodIndex = summary.lastIndexOf(".")
    if (lastPeriodIndex > 400) {
      summary = summary.substring(0, lastPeriodIndex + 1)
    } else {
      summary += "."
    }
  }

  return summary
}

// Helper functions
function calculateYearsOfExperience(experiences: ResumeData["experience"]): number {
  if (!experiences.length) return 0

  let totalMonths = 0

  experiences.forEach((exp) => {
    if (exp.startDate && (exp.endDate || exp.current)) {
      const startDate = parseDate(exp.startDate)
      const endDate = exp.current ? new Date() : parseDate(exp.endDate)

      if (startDate && endDate) {
        const months =
          (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())
        totalMonths += months > 0 ? months : 0
      }
    }
  })

  return Math.round((totalMonths / 12) * 10) / 10 // Round to 1 decimal place
}

function parseDate(dateStr: string): Date | null {
  // Handle common date formats like "MM/YYYY", "YYYY", "Month YYYY"
  if (!dateStr) return null

  // If it's just a year
  if (/^\d{4}$/.test(dateStr)) {
    return new Date(Number.parseInt(dateStr), 0, 1)
  }

  // If it's MM/YYYY
  const mmyyyyMatch = dateStr.match(/^(\d{1,2})\/(\d{4})$/)
  if (mmyyyyMatch) {
    return new Date(Number.parseInt(mmyyyyMatch[2]), Number.parseInt(mmyyyyMatch[1]) - 1, 1)
  }

  // If it's Month YYYY
  const monthYearMatch = dateStr.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (monthYearMatch) {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ]
    const monthIndex = months.findIndex((m) => m.toLowerCase() === monthYearMatch[1].toLowerCase())
    if (monthIndex >= 0) {
      return new Date(Number.parseInt(monthYearMatch[2]), monthIndex, 1)
    }
  }

  // Try standard date parsing as fallback
  const date = new Date(dateStr)
  return isNaN(date.getTime()) ? null : date
}

function formatYearsOfExperience(years: number): string {
  if (years < 1) {
    return "less than a year"
  } else if (years === 1) {
    return "1 year"
  } else if (Number.isInteger(years)) {
    return `${years} years`
  } else {
    const wholeYears = Math.floor(years)
    return `${wholeYears}+ years`
  }
}

function getHighestEducation(educations: ResumeData["education"]): string {
  if (!educations.length) return ""

  // Education levels in order of precedence
  const educationLevels = [
    { keywords: ["phd", "doctorate", "doctor of"], level: 5 },
    { keywords: ["master", "msc", "ma", "ms", "mba"], level: 4 },
    { keywords: ["bachelor", "bs", "ba", "bsc"], level: 3 },
    { keywords: ["associate", "diploma"], level: 2 },
    { keywords: ["certificate", "certification"], level: 1 },
  ]

  let highestEducation = null
  let highestLevel = 0

  educations.forEach((edu) => {
    if (edu.degree) {
      const degreeLower = edu.degree.toLowerCase()

      for (const { keywords, level } of educationLevels) {
        if (keywords.some((keyword) => degreeLower.includes(keyword)) && level > highestLevel) {
          highestLevel = level
          highestEducation = edu
          break
        }
      }

      // If no match found but we don't have any education yet, use this one
      if (!highestEducation) {
        highestEducation = edu
      }
    }
  })

  if (highestEducation) {
    return `${highestEducation.degree}${highestEducation.institution ? ` from ${highestEducation.institution}` : ""}`
  }

  return ""
}

function getTopSkills(skillCategories: ResumeData["skills"], keywords: string[]): string[] {
  // Flatten all skills
  const allSkills: string[] = []
  skillCategories.forEach((category) => {
    allSkills.push(...category.skills)
  })

  // Prioritize skills that match keywords
  const prioritizedSkills = allSkills.filter((skill) =>
    keywords.some(
      (keyword) =>
        skill.toLowerCase().includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(skill.toLowerCase()),
    ),
  )

  // Add remaining skills
  const remainingSkills = allSkills.filter((skill) => !prioritizedSkills.includes(skill))

  // Combine and limit to top 5
  return [...prioritizedSkills, ...remainingSkills].slice(0, 5)
}

function getKeyAchievements(experiences: ResumeData["experience"], projects: ResumeData["projects"]): string[] {
  const achievements: string[] = []

  // Extract achievements from work experience
  experiences.forEach((exp) => {
    achievements.push(...exp.achievements.filter((a) => a.trim().length > 0))
  })

  // If not enough work achievements, add project achievements
  if (achievements.length < 2) {
    projects.forEach((proj) => {
      achievements.push(...proj.achievements.filter((a) => a.trim().length > 0))
    })
  }

  // Return top 2 achievements
  return achievements.slice(0, 2)
}
