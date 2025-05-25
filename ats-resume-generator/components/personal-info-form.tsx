"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useResumeStore } from "@/lib/resume-store"

export function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore()
  const [formData, setFormData] = useState({
    fullName: resumeData.personalInfo.fullName || "",
    jobTitle: resumeData.personalInfo.jobTitle || "",
    email: resumeData.personalInfo.email || "",
    phone: resumeData.personalInfo.phone || "",
    location: resumeData.personalInfo.location || "",
    linkedin: resumeData.personalInfo.linkedin || "",
    github: resumeData.personalInfo.github || "",
    portfolio: resumeData.personalInfo.portfolio || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    updatePersonalInfo(formData)
  }, [formData, updatePersonalInfo])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Personal Information</h2>
        <p className="text-sm text-muted-foreground">
          Enter your personal details to be displayed at the top of your resume.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title *</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Frontend Developer"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="New York, NY"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="github.com/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio Website</Label>
          <Input
            id="portfolio"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="johndoe.com"
          />
        </div>
      </div>
    </div>
  )
}
