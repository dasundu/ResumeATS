import type { ResumeData } from "./resume-store"

// Types for the ATS score results
export interface ATSScoreResult {
  overallScore: number // 0-100
  keywordMatchScore: number // 0-100
  formatScore: number // 0-100
  contentScore: number // 0-100
  missingKeywords: string[]
  suggestions: string[]
}

export function checkATSScore(resumeData: ResumeData): ATSScoreResult {
  const { personalInfo, experience, education, skills, projects, jobDescription, keywords } = resumeData

  // Initialize the result
  const result: ATSScoreResult = {
    overallScore: 0,
    keywordMatchScore: 0,
    formatScore: 0,
    contentScore: 0,
    missingKeywords: [],
    suggestions: [],
  }

  // If no job description or keywords, return basic score
  if (!jobDescription || keywords.length === 0) {
    result.suggestions.push("Add a job description to get a more accurate ATS score.")
    result.formatScore = calculateFormatScore(resumeData)
    result.contentScore = calculateContentScore(resumeData)
    result.overallScore = Math.round((result.formatScore + result.contentScore) / 2)
    return result
  }

  // Calculate keyword match score
  const { score: keywordScore, missingKeywords } = calculateKeywordMatchScore(resumeData)
  result.keywordMatchScore = keywordScore
  result.missingKeywords = missingKeywords

  // Calculate format score
  result.formatScore = calculateFormatScore(resumeData)

  // Calculate content score
  result.contentScore = calculateContentScore(resumeData)

  // Calculate overall score (weighted average)
  result.overallScore = Math.round(
    result.keywordMatchScore * 0.5 + result.formatScore * 0.3 + result.contentScore * 0.2,
  )

  // Generate suggestions
  result.suggestions = generateSuggestions(resumeData, result)

  return result
}

// Calculate how well the resume matches keywords from the job description
function calculateKeywordMatchScore(resumeData: ResumeData): { score: number; missingKeywords: string[] } {
  const { keywords } = resumeData
  if (!keywords || keywords.length === 0) {
    return { score: 0, missingKeywords: [] }
  }

  // Create a single string with all resume content for keyword searching
  const resumeContent = createResumeContentString(resumeData).toLowerCase()

  // Count matched keywords
  let matchedCount = 0
  const missingKeywords: string[] = []

  keywords.forEach((keyword) => {
    if (resumeContent.includes(keyword.toLowerCase())) {
      matchedCount++
    } else {
      missingKeywords.push(keyword)
    }
  })

  // Calculate score as percentage of matched keywords
  const score = Math.round((matchedCount / keywords.length) * 100)

  return { score, missingKeywords }
}

// Check for formatting issues that might affect ATS parsing
function calculateFormatScore(resumeData: ResumeData): number {
  let score = 100 // Start with perfect score and deduct for issues
  const { personalInfo, experience, education } = resumeData

  // Check for essential contact information
  if (!personalInfo.email || !personalInfo.phone) {
    score -= 15
  }

  // Check for proper section structure
  if (experience.length === 0) {
    score -= 20
  } else {
    // Check for proper date formatting in experience
    const hasProperDates = experience.every((exp) => exp.startDate && exp.endDate)
    if (!hasProperDates) {
      score -= 10
    }

    // Check for achievements in experience
    const hasAchievements = experience.some(
      (exp) => exp.achievements && exp.achievements.length > 0 && exp.achievements[0].trim() !== "",
    )
    if (!hasAchievements) {
      score -= 10
    }
  }

  // Check for education section
  if (education.length === 0) {
    score -= 10
  }

  return Math.max(0, score) // Ensure score doesn't go below 0
}

// Evaluate the quality and completeness of resume content
function calculateContentScore(resumeData: ResumeData): number {
  let score = 100
  const { personalInfo, experience, education, skills, projects, generatedSummary } = resumeData

  // Check for professional summary
  if (!generatedSummary) {
    score -= 15
  }

  // Check for skills
  let hasSkills = false
  if (skills.length > 0) {
    hasSkills = skills.some((category) => category.skills.length > 0)
  }
  if (!hasSkills) {
    score -= 15
  }

  // Check experience quality
  if (experience.length > 0) {
    // Check for quantifiable achievements
    const hasQuantifiableAchievements = experience.some((exp) =>
      exp.achievements.some((achievement) =>
        /\d+%|\d+x|\$\d+|\d+ percent|increased|decreased|improved|reduced|generated|saved|delivered/i.test(achievement),
      ),
    )
    if (!hasQuantifiableAchievements) {
      score -= 15
    }

    // Check for action verbs
    const hasActionVerbs = experience.some((exp) =>
      exp.achievements.some((achievement) =>
        /^(developed|created|implemented|managed|led|designed|built|launched|achieved|improved|increased|decreased|reduced|negotiated|coordinated|organized)/i.test(
          achievement.trim(),
        ),
      ),
    )
    if (!hasActionVerbs) {
      score -= 10
    }
  }

  // Check for projects (especially important for students/entry-level)
  if (experience.length < 2 && projects.length === 0) {
    score -= 15
  }

  return Math.max(0, score) // Ensure score doesn't go below 0
}

// Generate helpful suggestions based on the scores
function generateSuggestions(resumeData: ResumeData, result: ATSScoreResult): string[] {
  const suggestions: string[] = []
  const { missingKeywords, keywordMatchScore, formatScore, contentScore } = result

  // Keyword match suggestions
  if (missingKeywords.length > 0) {
    if (missingKeywords.length <= 3) {
      suggestions.push(`Try to incorporate these missing keywords: ${missingKeywords.join(", ")}.`)
    } else {
      suggestions.push(
        `You're missing ${missingKeywords.length} important keywords from the job description. Try to incorporate more of them.`,
      )
    }
  }

  // Format suggestions
  if (formatScore < 80) {
    const { personalInfo, experience, education } = resumeData

    if (!personalInfo.email || !personalInfo.phone) {
      suggestions.push("Include your email and phone number in the contact information.")
    }

    if (experience.length === 0) {
      suggestions.push("Add your work experience with detailed responsibilities and achievements.")
    } else {
      const hasProperDates = experience.every((exp) => exp.startDate && exp.endDate)
      if (!hasProperDates) {
        suggestions.push("Ensure all work experiences have both start and end dates.")
      }
    }

    if (education.length === 0) {
      suggestions.push("Include your educational background.")
    }
  }

  // Content suggestions
  if (contentScore < 80) {
    const { experience, skills, projects, generatedSummary } = resumeData

    if (!generatedSummary) {
      suggestions.push("Add a professional summary that highlights your experience and skills.")
    }

    let hasSkills = false
    if (skills.length > 0) {
      hasSkills = skills.some((category) => category.skills.length > 0)
    }
    if (!hasSkills) {
      suggestions.push("Add relevant skills to your resume, organized by categories.")
    }

    if (experience.length > 0) {
      const hasQuantifiableAchievements = experience.some((exp) =>
        exp.achievements.some((achievement) =>
          /\d+%|\d+x|\$\d+|\d+ percent|increased|decreased|improved|reduced|generated|saved|delivered/i.test(
            achievement,
          ),
        ),
      )
      if (!hasQuantifiableAchievements) {
        suggestions.push("Include quantifiable achievements in your work experience (e.g., 'Increased sales by 20%').")
      }

      const hasActionVerbs = experience.some((exp) =>
        exp.achievements.some((achievement) =>
          /^(developed|created|implemented|managed|led|designed|built|launched|achieved|improved|increased|decreased|reduced|negotiated|coordinated|organized)/i.test(
            achievement.trim(),
          ),
        ),
      )
      if (!hasActionVerbs) {
        suggestions.push(
          "Start achievement bullets with strong action verbs (e.g., 'Developed', 'Implemented', 'Managed').",
        )
      }
    }

    if (experience.length < 2 && projects.length === 0) {
      suggestions.push("Add relevant projects to showcase your skills, especially if you have limited work experience.")
    }
  }

  // General suggestions
  if (keywordMatchScore < 50) {
    suggestions.push(
      "Your resume doesn't match many keywords from the job description. Consider tailoring it more specifically.",
    )
  }

  if (suggestions.length === 0) {
    suggestions.push("Your resume looks great! It's well-formatted and matches the job description well.")
  }

  return suggestions
}

// Helper function to create a single string with all resume content
function createResumeContentString(resumeData: ResumeData): string {
  const { personalInfo, experience, education, skills, projects, generatedSummary } = resumeData

  let content = `${personalInfo.fullName} ${personalInfo.jobTitle} ${generatedSummary || ""}`

  // Add experience
  experience.forEach((exp) => {
    content += ` ${exp.title} ${exp.company} ${exp.description || ""}`
    exp.achievements.forEach((achievement) => {
      content += ` ${achievement}`
    })
  })

  // Add education
  education.forEach((edu) => {
    content += ` ${edu.degree} ${edu.institution} ${edu.description || ""}`
  })

  // Add skills
  skills.forEach((category) => {
    content += ` ${category.category}`
    category.skills.forEach((skill) => {
      content += ` ${skill}`
    })
  })

  // Add projects
  projects.forEach((project) => {
    content += ` ${project.title} ${project.technologies} ${project.description || ""}`
    project.achievements.forEach((achievement) => {
      content += ` ${achievement}`
    })
  })

  return content
}
