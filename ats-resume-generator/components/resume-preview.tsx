"use client"

import { useResumeStore } from "@/lib/resume-store"

export function ResumePreview() {
  const { resumeData, generatedSummary } = useResumeStore()
  const { personalInfo, experience, education, skills, projects } = resumeData

  return (
    <div className="max-w-[850px] mx-auto p-8 bg-white text-black">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-lg">{personalInfo.jobTitle || "Professional Title"}</p>
        <div className="flex flex-wrap justify-center gap-x-4 text-sm mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 text-sm mt-1">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
        <p className="text-sm">
          {generatedSummary || "Your professional summary will appear here after generating your resume."}
        </p>
      </div>

      {/* Experience Section */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">Professional Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-bold">{exp.title || "Job Title"}</h3>
                <span className="text-sm">
                  {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-semibold">{exp.company || "Company Name"}</h4>
                {exp.location && <span className="text-sm">{exp.location}</span>}
              </div>
              {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-outside ml-5 text-sm mt-1">
                  {exp.achievements.map((achievement, i) => achievement.trim() && <li key={i}>{achievement}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && projects.some((p) => p.title) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">Projects</h2>
          {projects.map(
            (project, index) =>
              project.title && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold">
                      {project.title}
                      {project.link && <span className="text-sm font-normal ml-2">({project.link})</span>}
                    </h3>
                    {(project.startDate || project.endDate) && (
                      <span className="text-sm">
                        {project.startDate || ""} {project.startDate && project.endDate && "-"} {project.endDate || ""}
                      </span>
                    )}
                  </div>
                  {project.technologies && <p className="text-sm font-semibold">{project.technologies}</p>}
                  {project.description && <p className="text-sm mt-1">{project.description}</p>}
                  {project.achievements.length > 0 && (
                    <ul className="list-disc list-outside ml-5 text-sm mt-1">
                      {project.achievements.map(
                        (achievement, i) => achievement.trim() && <li key={i}>{achievement}</li>,
                      )}
                    </ul>
                  )}
                </div>
              ),
          )}
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-bold">{edu.degree || "Degree"}</h3>
                <span className="text-sm">
                  {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-semibold">{edu.institution || "Institution"}</h4>
                {edu.location && <span className="text-sm">{edu.location}</span>}
              </div>
              {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
              {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              {edu.achievements.length > 0 && (
                <ul className="list-disc list-outside ml-5 text-sm mt-1">
                  {edu.achievements.map((achievement, i) => achievement.trim() && <li key={i}>{achievement}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && skills.some((cat) => cat.skills.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">Skills</h2>
          <div className="grid grid-cols-1 gap-2">
            {skills.map(
              (category, index) =>
                category.skills.length > 0 && (
                  <div key={index}>
                    <h3 className="text-sm font-bold">{category.category}:</h3>
                    <p className="text-sm">{category.skills.join(", ")}</p>
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
