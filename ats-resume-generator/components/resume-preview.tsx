"use client"

import { useResumeStore } from "@/lib/resume-store"

export function ResumePreview() {
  const { resumeData, generatedSummary } = useResumeStore()
  const { personalInfo, experience, education, skills, projects } = resumeData

  // Helper function to format links properly
  const formatLink = (link: string, type: "email" | "url") => {
    if (!link) return link

    if (type === "email") {
      return link.startsWith("mailto:") ? link : `mailto:${link}`
    } else {
      // Check if the URL has a protocol, if not add https://
      if (link.startsWith("http://") || link.startsWith("https://")) {
        return link
      } else {
        return `https://${link}`
      }
    }
  }

  return (
    <div className="max-w-[850px] mx-auto p-8 bg-white text-black font-serif">
      {/* Header - Centered */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
        <div className="text-sm space-y-1">
          {personalInfo.email && (
            <div>
              <a
                href={formatLink(personalInfo.email, "email")}
                className="text-black hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {personalInfo.email}
              </a>
            </div>
          )}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && (
            <div>
              <a
                href={formatLink(personalInfo.linkedin, "url")}
                className="text-black hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {personalInfo.linkedin}
              </a>
            </div>
          )}
          {personalInfo.github && (
            <div>
              <a
                href={formatLink(personalInfo.github, "url")}
                className="text-black hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {personalInfo.github}
              </a>
            </div>
          )}
          {personalInfo.portfolio && (
            <div>
              <a
                href={formatLink(personalInfo.portfolio, "url")}
                className="text-black hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {personalInfo.portfolio}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {generatedSummary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-black pb-1 mb-3">Summary</h2>
          <p className="text-sm leading-relaxed text-justify">{generatedSummary}</p>
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-black pb-1 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-base">{edu.institution || "Institution"}</h3>
                  <p className="text-sm italic">
                    {edu.degree || "Degree"}
                    {edu.location && ` • ${edu.location}`}
                  </p>
                </div>
                <div className="text-sm text-right">
                  {edu.startDate && edu.endDate && (
                    <div>
                      {edu.startDate} - {edu.endDate}
                    </div>
                  )}
                  {edu.location && <div className="italic">{edu.location}</div>}
                </div>
              </div>
              {edu.gpa && <p className="text-sm mb-2">• GPA: {edu.gpa}</p>}
              {edu.description && <p className="text-sm mb-2">• {edu.description}</p>}
              {edu.achievements.length > 0 && (
                <ul className="text-sm space-y-1">
                  {edu.achievements.map(
                    (achievement, i) =>
                      achievement.trim() && (
                        <li key={i} className="flex">
                          <span className="mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ),
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && skills.some((cat) => cat.skills.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-black pb-1 mb-3">Skills</h2>
          <div className="space-y-2">
            {skills.map(
              (category, index) =>
                category.skills.length > 0 && (
                  <div key={index} className="text-sm">
                    <span className="font-bold">{category.category}:</span> <span>{category.skills.join(", ")}</span>
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-black pb-1 mb-3">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-base">{exp.title || "Job Title"}</h3>
                  <p className="text-sm italic">
                    {exp.company || "Company Name"}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                </div>
                <div className="text-sm text-right">
                  <div>
                    {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                  </div>
                  {exp.location && <div className="italic">{exp.location}</div>}
                </div>
              </div>
              {exp.description && <p className="text-sm mb-2 italic">{exp.description}</p>}
              {exp.achievements.length > 0 && (
                <ul className="text-sm space-y-1">
                  {exp.achievements.map(
                    (achievement, i) =>
                      achievement.trim() && (
                        <li key={i} className="flex">
                          <span className="mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ),
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && projects.some((p) => p.title) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-black pb-1 mb-3">Projects</h2>
          {projects.map(
            (project, index) =>
              project.title && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-base">
                        {project.title}
                        {project.link && (
                          <span className="font-normal text-sm ml-2">
                            (
                            <a
                              href={formatLink(project.link, "url")}
                              className="text-black hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {project.link}
                            </a>
                            )
                          </span>
                        )}
                      </h3>
                      <p className="text-sm italic">{project.description || "Project description"}</p>
                    </div>
                    <div className="text-sm text-right">
                      {(project.startDate || project.endDate) && (
                        <div>
                          {project.startDate || "Start Date"} - {project.endDate || "End Date"}
                        </div>
                      )}
                    </div>
                  </div>
                  {project.technologies && (
                    <p className="text-sm mb-2">
                      <span className="font-bold">Technologies used:</span> {project.technologies}
                    </p>
                  )}
                  {project.achievements.length > 0 && (
                    <ul className="text-sm space-y-1">
                      {project.achievements.map(
                        (achievement, i) =>
                          achievement.trim() && (
                            <li key={i} className="flex">
                              <span className="mr-2">•</span>
                              <span>{achievement}</span>
                            </li>
                          ),
                      )}
                    </ul>
                  )}
                </div>
              ),
          )}
        </div>
      )}
    </div>
  )
}
