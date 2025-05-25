"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ArrowLeft, Download, Eye, BarChart } from "lucide-react"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { ExperienceForm } from "@/components/experience-form"
import { EducationForm } from "@/components/education-form"
import { SkillsForm } from "@/components/skills-form"
import { ProjectsForm } from "@/components/projects-form"
import { JobDescriptionForm } from "@/components/job-description-form"
import { ResumePreview } from "@/components/resume-preview"
import { ATSScoreDisplay } from "@/components/ats-score-display"
import { useResumeStore } from "@/lib/resume-store"
import { generatePDF } from "@/lib/pdf-generator"

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [previewMode, setPreviewMode] = useState(false)
  const [showATSScore, setShowATSScore] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const { generateResume, resumeData, atsScoreResult, checkATSCompatibility } = useResumeStore()
  const resumeRef = useRef<HTMLDivElement>(null)

  const handleNextTab = (current: string) => {
    const tabs = ["personal", "experience", "education", "skills", "projects", "job-description"]
    const currentIndex = tabs.indexOf(current)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handlePrevTab = (current: string) => {
    const tabs = ["personal", "experience", "education", "skills", "projects", "job-description"]
    const currentIndex = tabs.indexOf(current)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const handleGenerateResume = () => {
    generateResume()
    setPreviewMode(true)
    setShowATSScore(false)
  }

  const handleCheckATSScore = () => {
    if (!atsScoreResult) {
      checkATSCompatibility()
    }
    setShowATSScore(true)
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generatePDF(resumeData.personalInfo.fullName || "resume")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating your PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6" />
            <span>ResumeATS</span>
          </Link>
          <div className="flex items-center gap-4">
            {!previewMode ? (
              <Button variant="outline" size="sm" onClick={handleGenerateResume}>
                <Eye className="mr-2 h-4 w-4" />
                Preview Resume
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setPreviewMode(false)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Editor
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 px-4 md:px-6 max-w-7xl mx-auto">
        {previewMode ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Resume Preview</h1>
              <div className="flex gap-2">
                <Button onClick={() => setPreviewMode(false)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Edit Resume
                </Button>
                <Button variant="outline" onClick={handleCheckATSScore}>
                  <BarChart className="mr-2 h-4 w-4" />
                  Check ATS Score
                </Button>
                <Button variant="secondary" onClick={handleDownloadPDF} disabled={isGeneratingPDF}>
                  <Download className="mr-2 h-4 w-4" />
                  {isGeneratingPDF ? "Generating..." : "Download PDF"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`${showATSScore ? "lg:col-span-2" : "lg:col-span-3"}`}>
                <Card className="border shadow-md">
                  <CardContent className="p-6" id="resume-to-download">
                    <ResumePreview />
                  </CardContent>
                </Card>
              </div>

              {showATSScore && atsScoreResult && (
                <div className="lg:col-span-1">
                  <ATSScoreDisplay scoreResult={atsScoreResult} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Resume Builder</h1>
              <Button onClick={handleGenerateResume}>
                <Eye className="mr-2 h-4 w-4" />
                Preview Resume
              </Button>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="job-description">Job Description</TabsTrigger>
              </TabsList>
              <Card>
                <CardContent className="p-6">
                  <TabsContent value="personal" className="space-y-4">
                    <PersonalInfoForm />
                    <div className="flex justify-end">
                      <Button onClick={() => handleNextTab("personal")}>Next: Experience</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="experience" className="space-y-4">
                    <ExperienceForm />
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => handlePrevTab("experience")}>
                        Previous: Personal
                      </Button>
                      <Button onClick={() => handleNextTab("experience")}>Next: Education</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="education" className="space-y-4">
                    <EducationForm />
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => handlePrevTab("education")}>
                        Previous: Experience
                      </Button>
                      <Button onClick={() => handleNextTab("education")}>Next: Skills</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="skills" className="space-y-4">
                    <SkillsForm />
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => handlePrevTab("skills")}>
                        Previous: Education
                      </Button>
                      <Button onClick={() => handleNextTab("skills")}>Next: Projects</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="projects" className="space-y-4">
                    <ProjectsForm />
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => handlePrevTab("projects")}>
                        Previous: Skills
                      </Button>
                      <Button onClick={() => handleNextTab("projects")}>Next: Job Description</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="job-description" className="space-y-4">
                    <JobDescriptionForm />
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => handlePrevTab("job-description")}>
                        Previous: Projects
                      </Button>
                      <Button onClick={handleGenerateResume}>Generate Resume</Button>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>
        )}
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-6 px-4 md:flex-row md:items-center md:gap-6 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-bold">
            <FileText className="h-5 w-5" />
            <span>ResumeATS</span>
          </div>
          <p className="text-sm text-muted-foreground md:ml-auto">
            © {new Date().getFullYear()} ResumeATS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
