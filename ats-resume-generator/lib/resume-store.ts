"use client"

import { create } from "zustand"
import { generateSummary } from "./summary-generator"
import { checkATSScore, type ATSScoreResult } from "./ats-score-checker"

export type PersonalInfo = {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  portfolio: string
}

export type Experience = {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
}

export type Education = {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  gpa: string
  description: string
  achievements: string[]
}

export type SkillCategory = {
  id: string
  category: string
  skills: string[]
}

export type Project = {
  id: string
  title: string
  link: string
  technologies: string
  startDate: string
  endDate: string
  description: string
  achievements: string[]
}

export type ResumeData = {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: SkillCategory[]
  projects: Project[]
  jobDescription: string
  jobTitle: string
  company: string
  keywords: string[]
  generatedSummary?: string
}

type ResumeStore = {
  resumeData: ResumeData
  generatedSummary: string
  atsScoreResult: ATSScoreResult | null
  updatePersonalInfo: (personalInfo: PersonalInfo) => void
  updateExperience: (experience: Experience[]) => void
  updateEducation: (education: Education[]) => void
  updateSkills: (skills: SkillCategory[]) => void
  updateProjects: (projects: Project[]) => void
  updateJobDescription: (jobDescription: string, jobTitle?: string, company?: string) => void
  updateKeywords: (keywords: string[]) => void
  generateResume: () => void
  checkATSCompatibility: () => void
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  jobDescription: "",
  jobTitle: "",
  company: "",
  keywords: [],
}

const initialATSScoreResult: ATSScoreResult = {
  overallScore: 0,
  keywordMatchScore: 0,
  formatScore: 0,
  contentScore: 0,
  missingKeywords: [],
  suggestions: ["Complete your resume and add a job description to get an ATS compatibility score."],
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumeData: initialResumeData,
  generatedSummary: "",
  atsScoreResult: null,

  updatePersonalInfo: (personalInfo) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalInfo,
      },
    }))
  },

  updateExperience: (experience) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience,
      },
    }))
  },

  updateEducation: (education) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education,
      },
    }))
  },

  updateSkills: (skills) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills,
      },
    }))
  },

  updateProjects: (projects) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects,
      },
    }))
  },

  updateJobDescription: (jobDescription, jobTitle, company) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        jobDescription,
        ...(jobTitle && { jobTitle }),
        ...(company && { company }),
      },
    }))
  },

  updateKeywords: (keywords) => {
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        keywords,
      },
    }))
  },

  generateResume: () => {
    const { resumeData } = get()
    const summary = generateSummary(resumeData)
    set({
      generatedSummary: summary,
      resumeData: {
        ...resumeData,
        generatedSummary: summary,
      },
    })

    // Also check ATS compatibility when generating resume
    const scoreResult = checkATSScore({
      ...resumeData,
      generatedSummary: summary,
    })
    set({ atsScoreResult: scoreResult })
  },

  checkATSCompatibility: () => {
    const { resumeData, generatedSummary } = get()
    const scoreResult = checkATSScore({
      ...resumeData,
      generatedSummary,
    })
    set({ atsScoreResult: scoreResult })
  },
}))
