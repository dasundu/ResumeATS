"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { useResumeStore } from "@/lib/resume-store"

export function ExperienceForm() {
  const { resumeData, updateExperience } = useResumeStore()
  const [experiences, setExperiences] = useState(
    resumeData.experience.length > 0
      ? resumeData.experience
      : [
          {
            id: "1",
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
            achievements: [""],
          },
        ],
  )

  const handleChange = (id: string, field: string, value: string | boolean) => {
    const updatedExperiences = experiences.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [field]: value }
      }
      return exp
    })
    setExperiences(updatedExperiences)
    updateExperience(updatedExperiences)
  }

  const handleAchievementChange = (expId: string, index: number, value: string) => {
    const updatedExperiences = experiences.map((exp) => {
      if (exp.id === expId) {
        const achievements = [...exp.achievements]
        achievements[index] = value
        return { ...exp, achievements }
      }
      return exp
    })
    setExperiences(updatedExperiences)
    updateExperience(updatedExperiences)
  }

  const addAchievement = (expId: string) => {
    const updatedExperiences = experiences.map((exp) => {
      if (exp.id === expId) {
        return { ...exp, achievements: [...exp.achievements, ""] }
      }
      return exp
    })
    setExperiences(updatedExperiences)
    updateExperience(updatedExperiences)
  }

  const removeAchievement = (expId: string, index: number) => {
    const updatedExperiences = experiences.map((exp) => {
      if (exp.id === expId) {
        const achievements = exp.achievements.filter((_, i) => i !== index)
        return { ...exp, achievements }
      }
      return exp
    })
    setExperiences(updatedExperiences)
    updateExperience(updatedExperiences)
  }

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    }
    setExperiences([...experiences, newExperience])
    updateExperience([...experiences, newExperience])
  }

  const removeExperience = (id: string) => {
    if (experiences.length === 1) {
      return
    }
    const updatedExperiences = experiences.filter((exp) => exp.id !== id)
    setExperiences(updatedExperiences)
    updateExperience(updatedExperiences)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Work Experience</h2>
        <p className="text-sm text-muted-foreground">
          Add your relevant work experience. Focus on achievements and quantifiable results.
        </p>
      </div>

      {experiences.map((experience, expIndex) => (
        <Card key={experience.id} className="border shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Experience {expIndex + 1}</h3>
              {experiences.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`title-${experience.id}`}>Job Title *</Label>
                <Input
                  id={`title-${experience.id}`}
                  value={experience.title}
                  onChange={(e) => handleChange(experience.id, "title", e.target.value)}
                  placeholder="Frontend Developer"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`company-${experience.id}`}>Company *</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => handleChange(experience.id, "company", e.target.value)}
                  placeholder="Acme Inc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${experience.id}`}>Location</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location}
                  onChange={(e) => handleChange(experience.id, "location", e.target.value)}
                  placeholder="New York, NY"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${experience.id}`}>Start Date *</Label>
                  <Input
                    id={`startDate-${experience.id}`}
                    value={experience.startDate}
                    onChange={(e) => handleChange(experience.id, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${experience.id}`}>End Date *</Label>
                  <Input
                    id={`endDate-${experience.id}`}
                    value={experience.endDate}
                    onChange={(e) => handleChange(experience.id, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Present"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => handleChange(experience.id, "description", e.target.value)}
                placeholder="Brief description of your role and responsibilities"
                rows={2}
              />
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <Label>Key Achievements/Responsibilities *</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addAchievement(experience.id)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>

              {experience.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => handleAchievementChange(experience.id, index, e.target.value)}
                    placeholder="Increased website performance by 40% through code optimization"
                    className="flex-1"
                  />
                  {experience.achievements.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAchievement(experience.id, index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addExperience} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Another Experience
      </Button>
    </div>
  )
}
