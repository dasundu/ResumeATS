"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useResumeStore } from "@/lib/resume-store"
import { extractKeywords } from "@/lib/keyword-extractor"

export function JobDescriptionForm() {
  const { resumeData, updateJobDescription, updateKeywords } = useResumeStore()
  const [jobDescription, setJobDescription] = useState(resumeData.jobDescription || "")
  const [jobTitle, setJobTitle] = useState(resumeData.jobTitle || "")
  const [company, setCompany] = useState(resumeData.company || "")
  const [keywords, setKeywords] = useState<string[]>(resumeData.keywords || [])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value)
    updateJobDescription(e.target.value)
  }

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value)
    updateJobDescription(jobDescription, e.target.value, company)
  }

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value)
    updateJobDescription(jobDescription, jobTitle, e.target.value)
  }

  const analyzeJobDescription = () => {
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)

    // Extract keywords from job description
    setTimeout(() => {
      const extractedKeywords = extractKeywords(jobDescription)
      setKeywords(extractedKeywords)
      updateKeywords(extractedKeywords)
      setIsAnalyzing(false)
    }, 1000)
  }

  useEffect(() => {
    if (jobDescription.trim().length > 100 && keywords.length === 0) {
      analyzeJobDescription()
    }
  }, [jobDescription])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Job Description</h2>
        <p className="text-sm text-muted-foreground">
          Paste the job description to optimize your resume for ATS and keyword matching.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={jobTitle}
            onChange={handleJobTitleChange}
            placeholder="e.g., Frontend Developer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" value={company} onChange={handleCompanyChange} placeholder="e.g., Acme Inc." />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobDescription">Job Description *</Label>
        <Textarea
          id="jobDescription"
          value={jobDescription}
          onChange={handleJobDescriptionChange}
          placeholder="Paste the full job description here"
          rows={8}
          className="resize-none"
          required
        />
      </div>

      <Button
        type="button"
        onClick={analyzeJobDescription}
        disabled={!jobDescription.trim() || isAnalyzing}
        className="w-full"
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Job Description"}
      </Button>

      {keywords.length > 0 && (
        <Card className="border shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Key Skills & Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  These keywords were extracted from the job description. Make sure to include them in your resume.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
