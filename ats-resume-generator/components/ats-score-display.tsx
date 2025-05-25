import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"
import type { ATSScoreResult } from "@/lib/ats-score-checker"

interface ATSScoreDisplayProps {
  scoreResult: ATSScoreResult
}

export function ATSScoreDisplay({ scoreResult }: ATSScoreDisplayProps) {
  const { overallScore, keywordMatchScore, formatScore, contentScore, missingKeywords, suggestions } = scoreResult

  // Determine score level for styling
  const getScoreLevel = (score: number) => {
    if (score >= 80) return "success"
    if (score >= 60) return "warning"
    return "danger"
  }

  const overallLevel = getScoreLevel(overallScore)
  const keywordLevel = getScoreLevel(keywordMatchScore)
  const formatLevel = getScoreLevel(formatScore)
  const contentLevel = getScoreLevel(contentScore)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center justify-between">
            <span>ATS Compatibility Score</span>
            <Badge
              className={`text-lg px-3 py-1 ${
                overallLevel === "success"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : overallLevel === "warning"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
              }`}
            >
              {overallScore}%
            </Badge>
          </CardTitle>
          <CardDescription>How well your resume is likely to perform with Applicant Tracking Systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Keyword Match</span>
                <span
                  className={`text-sm font-medium ${
                    keywordLevel === "success"
                      ? "text-green-600"
                      : keywordLevel === "warning"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {keywordMatchScore}%
                </span>
              </div>
              <Progress
                value={keywordMatchScore}
                className={`h-2 ${
                  keywordLevel === "success"
                    ? "bg-green-100"
                    : keywordLevel === "warning"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                }`}
              />
              <p className="text-xs text-muted-foreground">
                How well your resume matches keywords from the job description
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Format & Structure</span>
                <span
                  className={`text-sm font-medium ${
                    formatLevel === "success"
                      ? "text-green-600"
                      : formatLevel === "warning"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {formatScore}%
                </span>
              </div>
              <Progress
                value={formatScore}
                className={`h-2 ${
                  formatLevel === "success"
                    ? "bg-green-100"
                    : formatLevel === "warning"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                }`}
              />
              <p className="text-xs text-muted-foreground">How well your resume is structured for ATS parsing</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Content Quality</span>
                <span
                  className={`text-sm font-medium ${
                    contentLevel === "success"
                      ? "text-green-600"
                      : contentLevel === "warning"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {contentScore}%
                </span>
              </div>
              <Progress
                value={contentScore}
                className={`h-2 ${
                  contentLevel === "success"
                    ? "bg-green-100"
                    : contentLevel === "warning"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                }`}
              />
              <p className="text-xs text-muted-foreground">The quality and completeness of your resume content</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {missingKeywords.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
              Missing Keywords
            </CardTitle>
            <CardDescription>
              Important keywords from the job description that are missing from your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="bg-yellow-50">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            {overallLevel === "success" ? (
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
            )}
            Improvement Suggestions
          </CardTitle>
          <CardDescription>Recommendations to improve your ATS compatibility score</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
