"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { useResumeStore } from "@/lib/resume-store"

export function ProjectsForm() {
  const { resumeData, updateProjects } = useResumeStore()
  const [projects, setProjects] = useState(
    resumeData.projects.length > 0
      ? resumeData.projects
      : [
          {
            id: "1",
            title: "",
            link: "",
            technologies: "",
            startDate: "",
            endDate: "",
            description: "",
            achievements: [""],
          },
        ],
  )

  const handleChange = (id: string, field: string, value: string) => {
    const updatedProjects = projects.map((proj) => {
      if (proj.id === id) {
        return { ...proj, [field]: value }
      }
      return proj
    })
    setProjects(updatedProjects)
    updateProjects(updatedProjects)
  }

  const handleAchievementChange = (projId: string, index: number, value: string) => {
    const updatedProjects = projects.map((proj) => {
      if (proj.id === projId) {
        const achievements = [...proj.achievements]
        achievements[index] = value
        return { ...proj, achievements }
      }
      return proj
    })
    setProjects(updatedProjects)
    updateProjects(updatedProjects)
  }

  const addAchievement = (projId: string) => {
    const updatedProjects = projects.map((proj) => {
      if (proj.id === projId) {
        return { ...proj, achievements: [...proj.achievements, ""] }
      }
      return proj
    })
    setProjects(updatedProjects)
    updateProjects(updatedProjects)
  }

  const removeAchievement = (projId: string, index: number) => {
    const updatedProjects = projects.map((proj) => {
      if (proj.id === projId) {
        const achievements = proj.achievements.filter((_, i) => i !== index)
        return { ...proj, achievements }
      }
      return proj
    })
    setProjects(updatedProjects)
    updateProjects(updatedProjects)
  }

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "",
      link: "",
      technologies: "",
      startDate: "",
      endDate: "",
      description: "",
      achievements: [""],
    }
    setProjects([...projects, newProject])
    updateProjects([...projects, newProject])
  }

  const removeProject = (id: string) => {
    if (projects.length === 1) {
      return
    }
    const updatedProjects = projects.filter((proj) => proj.id !== id)
    setProjects(updatedProjects)
    updateProjects(updatedProjects)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Add relevant projects that showcase your skills and achievements.
        </p>
      </div>

      {projects.map((project, projIndex) => (
        <Card key={project.id} className="border shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Project {projIndex + 1}</h3>
              {projects.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`title-${project.id}`}>Project Title *</Label>
                <Input
                  id={`title-${project.id}`}
                  value={project.title}
                  onChange={(e) => handleChange(project.id, "title", e.target.value)}
                  placeholder="E-commerce Website"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`link-${project.id}`}>Project Link</Label>
                <Input
                  id={`link-${project.id}`}
                  value={project.link}
                  onChange={(e) => handleChange(project.id, "link", e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`technologies-${project.id}`}>Technologies Used *</Label>
                <Input
                  id={`technologies-${project.id}`}
                  value={project.technologies}
                  onChange={(e) => handleChange(project.id, "technologies", e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${project.id}`}
                    value={project.startDate}
                    onChange={(e) => handleChange(project.id, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${project.id}`}
                    value={project.endDate}
                    onChange={(e) => handleChange(project.id, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Ongoing"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor={`description-${project.id}`}>Project Description</Label>
              <Textarea
                id={`description-${project.id}`}
                value={project.description}
                onChange={(e) => handleChange(project.id, "description", e.target.value)}
                placeholder="Brief description of the project and your role"
                rows={2}
              />
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <Label>Key Features/Achievements *</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addAchievement(project.id)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>

              {project.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={achievement}
                    onChange={(e) => handleAchievementChange(project.id, index, e.target.value)}
                    placeholder="Implemented responsive design that improved mobile traffic by 40%"
                    className="flex-1"
                  />
                  {project.achievements.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAchievement(project.id, index)}
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

      <Button type="button" variant="outline" onClick={addProject} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Another Project
      </Button>
    </div>
  )
}
