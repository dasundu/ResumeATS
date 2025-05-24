import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Zap, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6" />
            <span>ResumeATS</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/builder" className="text-sm font-medium">
              Resume Builder
            </Link>
            <Link href="#features" className="text-sm font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium">
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/builder">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 max-w-7xl mx-auto">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Get Past the ATS and Land Your Dream Job
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our ATS-friendly resume generator creates optimized resumes tailored to specific job descriptions,
                    increasing your chances of getting past automated screening systems.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/builder">
                    <Button size="lg" className="px-8">
                      Build Your Resume
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="px-8">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-lg border bg-background p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold">John Doe</h2>
                      <p className="text-sm text-muted-foreground">Frontend Developer</p>
                      <div className="text-sm">
                        <p>john.doe@example.com | (123) 456-7890</p>
                        <p>linkedin.com/in/johndoe | github.com/johndoe</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Professional Summary</h3>
                      <p className="text-sm">
                        Experienced Frontend Developer with 5+ years of expertise in React, TypeScript, and responsive
                        design. Proven track record of delivering high-performance web applications with focus on user
                        experience and accessibility.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Experience</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <p className="font-medium">Senior Frontend Developer</p>
                          <p className="text-sm">2020 - Present</p>
                        </div>
                        <p className="text-sm">TechCorp Inc.</p>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          <li>Developed responsive web applications using React and TypeScript</li>
                          <li>Improved site performance by 40% through code optimization</li>
                        </ul>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background flex items-end justify-center pb-6">
                      <Link href="/builder">
                        <Button>Create Your Resume</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our resume generator is designed to help you create ATS-optimized resumes that get noticed.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">ATS Optimization</h3>
                <p className="text-center text-muted-foreground">
                  Creates resumes that pass through Applicant Tracking Systems with proper formatting and keyword
                  optimization.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Summary Generator</h3>
                <p className="text-center text-muted-foreground">
                  Automatically creates a professional summary based on your experience and job description keywords.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Keyword Matching</h3>
                <p className="text-center text-muted-foreground">
                  Analyzes job descriptions to identify key skills and requirements, then helps you match them in your
                  resume.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create your ATS-optimized resume in just a few simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Enter Your Information</h3>
                <p className="text-center text-muted-foreground">
                  Fill in your personal details, work experience, education, skills, and projects.
                </p>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Paste Job Description</h3>
                <p className="text-center text-muted-foreground">
                  Add the job description you're applying for to optimize your resume for that specific role.
                </p>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Generate & Download</h3>
                <p className="text-center text-muted-foreground">
                  Preview your ATS-optimized resume, make any final adjustments, and download in your preferred format.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/builder">
                <Button size="lg" className="px-8">
                  Build Your Resume Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Land Your Dream Job?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create an ATS-optimized resume tailored to your target job in minutes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/builder">
                  <Button size="lg" className="px-8">
                    Get Started for Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-6 px-4 md:flex-row md:items-center md:gap-6 md:px-6">
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
