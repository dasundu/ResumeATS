"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useResumeStore } from "@/lib/resume-store"

export function SkillsForm() {
  const { resumeData, updateSkills } = useResumeStore()
  const [skillCategories, setSkillCategories] = useState(
    resumeData.skills.length > 0
      ? resumeData.skills
      : [
          {
            id: "1",
            category: "Technical Skills",
            skills: [],
          },
          {
            id: "2",
            category: "Soft Skills",
            skills: [],
          },
          {
            id: "3",
            category: "Tools & Technologies",
            skills: [],
          },
        ],
  )
  const [newSkill, setNewSkill] = useState("")
  const [activeCategory, setActiveCategory] = useState("1")

  const handleCategoryChange = (id: string, value: string) => {
    const updatedCategories = skillCategories.map((cat) => {
      if (cat.id === id) {
        return { ...cat, category: value }
      }
      return cat
    })
    setSkillCategories(updatedCategories)
    updateSkills(updatedCategories)
  }

  const addSkill = (categoryId: string) => {
    if (!newSkill.trim()) return

    const updatedCategories = skillCategories.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          skills: [...cat.skills, newSkill.trim()],
        }
      }
      return cat
    })
    setSkillCategories(updatedCategories)
    updateSkills(updatedCategories)
    setNewSkill("")
  }

  const removeSkill = (categoryId: string, skillIndex: number) => {
    const updatedCategories = skillCategories.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          skills: cat.skills.filter((_, i) => i !== skillIndex),
        }
      }
      return cat
    })
    setSkillCategories(updatedCategories)
    updateSkills(updatedCategories)
  }

  const addCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      category: "New Category",
      skills: [],
    }
    setSkillCategories([...skillCategories, newCategory])
    updateSkills([...skillCategories, newCategory])
    setActiveCategory(newCategory.id)
  }

  const removeCategory = (id: string) => {
    if (skillCategories.length <= 1) return
    const updatedCategories = skillCategories.filter((cat) => cat.id !== id)
    setSkillCategories(updatedCategories)
    updateSkills(updatedCategories)
    setActiveCategory(updatedCategories[0].id)
  }

  const handleKeyDown = (e: React.KeyboardEvent, categoryId: string) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(categoryId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Skills</h2>
        <p className="text-sm text-muted-foreground">
          Add your skills organized by categories. Include both technical and soft skills.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {skillCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className="flex-shrink-0"
          >
            {category.category}
          </Button>
        ))}
        <Button variant="ghost" onClick={addCategory} className="flex-shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {skillCategories.map(
        (category) =>
          activeCategory === category.id && (
            <Card key={category.id} className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-2 flex-1 mr-4">
                    <Label htmlFor={`category-${category.id}`}>Category Name</Label>
                    <Input
                      id={`category-${category.id}`}
                      value={category.category}
                      onChange={(e) => handleCategoryChange(category.id, e.target.value)}
                      placeholder="e.g., Programming Languages, Soft Skills, etc."
                    />
                  </div>
                  {skillCategories.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCategory(category.id)}
                      className="text-destructive mt-6"
                    >
                      Remove Category
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, category.id)}
                        placeholder="Add a skill (e.g., JavaScript, Project Management)"
                      />
                    </div>
                    <Button type="button" onClick={() => addSkill(category.id)}>
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {category.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(category.id, index)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {category.skills.length === 0 && (
                      <p className="text-sm text-muted-foreground">No skills added yet.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ),
      )}
    </div>
  )
}
