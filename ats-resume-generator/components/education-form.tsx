"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { useResumeStore } from "@/lib/resume-store"

export function EducationForm() {
  const { resumeData, updateEducation } = useResumeStore()
  const [educations, setEducations] = useState(
    resumeData.education.length > 0
      ? resumeData.education
      : [
          {
            id: "1",
            degree: "",
            institution: "",
            location: "",
            startDate: "",
            endDate: "",
            gpa: "",
            description: "",
            achievements: [],
          },
        ],
  )

  const handleChange = (id: string, field: string, value: string) => {
    const updatedEducations = educations.map((edu) => {
      if (edu.id === id) {
        return { ...edu, [field]: value }
      }
      return edu
    })
    setEducations(updatedEducations)
    updateEducation(updatedEducations)
  }

  const handleAchievementChange = (eduId: string, index: number, value: string) => {
    const updatedEducations = educations.map((edu) => {
      if (edu.id === eduId) {
        const achievements = [...edu.achievements]
        achievements[index] = value
        return { ...edu, achievements }
      }
      return edu
    })
    setEducations(updatedEducations)
    updateEducation(updatedEducations)
  }

  const addAchievement = (eduId: string) => {
    const updatedEducations = educations.map((edu) => {
      if (edu.id === eduId) {
        return { ...edu, achievements: [...edu.achievements, ""] }
      }
      return edu
    })
    setEducations(updatedEducations)
    updateEducation(updatedEducations)
  }

  const removeAchievement = (eduId: string, index: number) => {
    const updatedEducations = educations.map((edu) => {
      if (edu.id === eduId) {
        const achievements = edu.achievements.filter((_, i) => i !== index)
        return { ...edu, achievements }
      }
      return edu
    })
    setEducations(updatedEducations)
    updateEducation(updatedEducations)
  }

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
      achievements: [],
    }
    setEducations([...educations, newEducation])
    updateEducation([...educations, newEducation])
  }

  const removeEducation = (id: string) => {
    if (educations.length === 1) {
      return
    }
    const updatedEducations = educations.filter((edu) => edu.id !== id)
    setEducations(updatedEducations)
    updateEducation(updatedEducations)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Education</h2>
        <p className="text-sm text-muted-foreground">Add your educational background, starting with the most recent.</p>
      </div>

      {educations.map((education, eduIndex) => (
        <Card key={education.id} className="border shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Education {eduIndex + 1}</h3>
              {educations.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`degree-${education.id}`}>Degree/Certificate *</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => handleChange(education.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => handleChange(education.id, "institution", e.target.value)}
                  placeholder="University of Technology"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${education.id}`}>Location</Label>
                <Input
                  id={`location-${education.id}`}
                  value={education.location}
                  onChange={(e) => handleChange(education.id, "location", e.target.value)}
                  placeholder="New York, NY"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${education.id}`}>Start Date *</Label>
                  <Input
                    id={`startDate-${education.id}`}
                    value={education.startDate}
                    onChange={(e) => handleChange(education.id, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${education.id}`}>End Date *</Label>
                  <Input
                    id={`endDate-${education.id}`}
                    value={education.endDate}
                    onChange={(e) => handleChange(education.id, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Expected MM/YYYY"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`gpa-${education.id}`}>GPA</Label>
                <Input
                  id={`gpa-${education.id}`}
                  value={education.gpa}
                  onChange={(e) => handleChange(education.id, "gpa", e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor={`description-${education.id}`}>Description</Label>
              <Textarea
                id={`description-${education.id}`}
                value={education.description}
                onChange={(e) => handleChange(education.id, "description", e.target.value)}
                placeholder="Brief description of your studies or relevant coursework"
                rows={2}
              />
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <Label>Achievements/Activities (Optional)</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addAchievement(education.id)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>

              {education.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => handleAchievementChange(education.id, index, e.target.value)}
                    placeholder="Dean's List for 4 consecutive semesters"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAchievement(education.id, index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addEducation} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Another Education
      </Button>
    </div>
  )
}
