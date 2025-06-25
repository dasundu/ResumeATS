# ResumeATS - ATS-Friendly Resume Generator

A modern, professional resume generator that creates ATS-optimized resumes tailored to specific job descriptions. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **ATS Optimization**: Creates resumes that pass through Applicant Tracking Systems
- **Smart Summary Generator**: Automatically generates professional summaries based on experience
- **Keyword Matching**: Analyzes job descriptions and matches relevant keywords
- **ATS Score Checker**: Evaluates resume compatibility with ATS systems
- **PDF Export**: Download resumes as professional PDF documents
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Preview**: See changes instantly as you build your resume
- **Professional Templates**: Clean, ATS-friendly formatting

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **PDF Generation**: html2pdf.js
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Landing page
│   └── builder/
│       └── page.tsx         # Resume builder interface
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── personal-info-form.tsx
│   ├── experience-form.tsx
│   ├── education-form.tsx
│   ├── skills-form.tsx
│   ├── projects-form.tsx
│   ├── job-description-form.tsx
│   ├── resume-preview.tsx
│   ├── ats-score-display.tsx
│   └── theme-provider.tsx
├── lib/
│   ├── resume-store.ts      # Zustand state management
│   ├── summary-generator.ts # AI-powered summary generation
│   ├── keyword-extractor.ts # Job description analysis
│   ├── ats-score-checker.ts # ATS compatibility scoring
│   ├── pdf-generator.ts     # PDF export functionality
│   └── utils.ts             # Utility functions
└── tailwind.config.ts       # Tailwind configuration
\`\`\`

## 🎯 Core Features Documentation

### 1. Resume Builder Forms

#### Personal Information Form
- **File**: \`components/personal-info-form.tsx\`
- **Purpose**: Collects basic contact information
- **Fields**: Name, job title, email, phone, location, LinkedIn, GitHub, portfolio
- **Features**: Real-time validation, clickable links in resume

#### Experience Form
- **File**: \`components/experience-form.tsx\`
- **Purpose**: Manages work experience entries
- **Features**: 
  - Multiple experience entries
  - Dynamic achievement bullets
  - Date validation
  - Company and location tracking

#### Education Form
- **File**: \`components/education-form.tsx\`
- **Purpose**: Educational background management
- **Features**:
  - Multiple education entries
  - GPA tracking (optional)
  - Achievements and activities
  - Institution and degree validation

#### Skills Form
- **File**: \`components/skills-form.tsx\`
- **Purpose**: Skill categorization and management
- **Features**:
  - Multiple skill categories
  - Tag-based skill entry
  - Category customization
  - Skill removal and editing

#### Projects Form
- **File**: \`components/projects-form.tsx\`
- **Purpose**: Project showcase management
- **Features**:
  - Project links (clickable in resume)
  - Technology stack tracking
  - Achievement bullets
  - Date ranges

### 2. Job Description Analysis

#### Keyword Extractor
- **File**: \`lib/keyword-extractor.ts\`
- **Purpose**: Analyzes job descriptions to extract relevant keywords
- **Algorithm**:
  1. Maintains database of 100+ technical and soft skills
  2. Scans job description for skill matches
  3. Extracts bullet points from requirements sections
  4. Returns top 20 most relevant keywords
- **Skills Database**: Includes modern technologies, frameworks, and soft skills

#### Job Description Form
- **File**: \`components/job-description-form.tsx\`
- **Purpose**: Job description input and analysis
- **Features**:
  - Large text area for job descriptions
  - Automatic keyword extraction
  - Job title and company tracking
  - Real-time analysis feedback

### 3. AI-Powered Summary Generation

#### Summary Generator
- **File**: \`lib/summary-generator.ts\`
- **Purpose**: Creates professional summaries based on user data
- **Algorithm**:
  1. **Experience Analysis**: Calculates years of experience from date ranges
  2. **Education Ranking**: Determines highest education level
  3. **Skill Prioritization**: Matches skills with job keywords
  4. **Achievement Extraction**: Pulls key accomplishments
  5. **Summary Construction**: Creates 3-5 line professional summary

#### Key Functions:
- \`calculateYearsOfExperience()\`: Parses dates and calculates total experience
- \`getHighestEducation()\`: Ranks education by level (PhD > Master's > Bachelor's)
- \`getTopSkills()\`: Prioritizes skills based on keyword matching
- \`getKeyAchievements()\`: Extracts quantifiable accomplishments

### 4. ATS Compatibility Scoring

#### ATS Score Checker
- **File**: \`lib/ats-score-checker.ts\`
- **Purpose**: Evaluates resume ATS compatibility
- **Scoring Components**:

##### Keyword Match Score (50% weight)
- Compares resume content against job description keywords
- Calculates percentage of matched keywords
- Identifies missing important keywords

##### Format Score (30% weight)
- Checks for essential contact information
- Validates proper section structure
- Ensures consistent date formatting
- Verifies achievement bullets exist

##### Content Score (20% weight)
- Evaluates professional summary presence
- Checks for quantifiable achievements
- Validates use of action verbs
- Assesses overall content quality

#### Scoring Algorithm:
\`\`\`typescript
Overall Score = (Keyword Score × 0.5) + (Format Score × 0.3) + (Content Score × 0.2)
\`\`\`

### 5. PDF Generation

#### PDF Generator
- **File**: \`lib/pdf-generator.ts\`
- **Library**: html2pdf.js
- **Process**:
  1. Clones resume DOM element
  2. Ensures clickable links work in PDF
  3. Applies PDF-specific styling
  4. Generates high-quality PDF with proper formatting

#### Configuration:
- **Format**: A4 portrait
- **Quality**: 98% JPEG compression
- **Scale**: 2x for high resolution
- **Margins**: 10mm on all sides

### 6. State Management

#### Resume Store
- **File**: \`lib/resume-store.ts\`
- **Library**: Zustand
- **Purpose**: Centralized state management for all resume data

#### Store Structure:
\`\`\`typescript
type ResumeStore = {
  resumeData: ResumeData           // All form data
  generatedSummary: string         // AI-generated summary
  atsScoreResult: ATSScoreResult   // ATS compatibility score
  
  // Update functions for each section
  updatePersonalInfo: (data) => void
  updateExperience: (data) => void
  updateEducation: (data) => void
  updateSkills: (data) => void
  updateProjects: (data) => void
  updateJobDescription: (data) => void
  
  // Core functions
  generateResume: () => void       // Generates summary and scores
  checkATSCompatibility: () => void // Calculates ATS score
}
\`\`\`

## 🎨 Design System

### Color Theme
The application uses a professional blue color scheme:

- **Primary**: \`hsl(220, 91%, 56%)\` - Professional blue
- **Primary Foreground**: \`hsl(0, 0%, 100%)\` - White text
- **Secondary**: \`hsl(210, 40%, 96%)\` - Light blue-gray
- **Muted**: \`hsl(215, 16%, 47%)\` - Muted text color
- **Border**: \`hsl(214, 32%, 91%)\` - Light borders

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body Text**: Regular weight (400)
- **Small Text**: 14px for secondary information

### Layout
- **Container**: Max width 7xl (1280px)
- **Spacing**: Consistent 4px grid system
- **Responsive**: Mobile-first approach
- **Cards**: Rounded corners with subtle shadows

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/resume-ats.git
cd resume-ats
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Run development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. **Open in browser**
Navigate to \`http://localhost:3000\`

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📱 Usage Guide

### Step 1: Personal Information
1. Navigate to the Resume Builder
2. Fill in your basic contact information
3. Include professional links (LinkedIn, GitHub, Portfolio)

### Step 2: Work Experience
1. Add your work experiences starting with the most recent
2. Include specific achievements with quantifiable results
3. Use action verbs to start each bullet point

### Step 3: Education
1. Add your educational background
2. Include GPA if 3.5 or higher
3. Add relevant coursework or achievements

### Step 4: Skills
1. Organize skills into categories (Technical, Soft Skills, etc.)
2. Include both hard and soft skills
3. Prioritize skills mentioned in job descriptions

### Step 5: Projects
1. Add relevant projects that showcase your abilities
2. Include live links and GitHub repositories
3. Highlight technologies used and key achievements

### Step 6: Job Description Analysis
1. Paste the target job description
2. Review extracted keywords
3. Ensure your resume includes relevant keywords

### Step 7: Generate & Review
1. Click "Generate Resume" to create your professional summary
2. Review the resume preview
3. Check your ATS compatibility score
4. Make adjustments based on suggestions

### Step 8: Download
1. Click "Download PDF" to export your resume
2. The PDF will include clickable links
3. File name format: \`[YourName]_ATS_Resume.pdf\`

## 🧪 Testing

### Manual Testing Checklist

#### Form Validation
- [ ] Required fields show validation errors
- [ ] Email format validation works
- [ ] Date format validation works
- [ ] Links are properly formatted

#### Resume Generation
- [ ] Summary generates correctly based on input
- [ ] All sections appear in preview
- [ ] Links are clickable in preview
- [ ] Formatting is consistent

#### ATS Score
- [ ] Score calculates correctly
- [ ] Missing keywords are identified
- [ ] Suggestions are relevant and helpful

#### PDF Export
- [ ] PDF generates without errors
- [ ] Links work in PDF
- [ ] Formatting is preserved
- [ ] File downloads with correct name

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile Responsiveness
- ✅ iPhone (iOS Safari)
- ✅ Android (Chrome)
- ✅ Tablet devices

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

2. **Configure Environment**
- No environment variables required for basic functionality
- All processing happens client-side

3. **Deploy**
\`\`\`bash
vercel --prod
\`\`\`

### Other Platforms

#### Netlify
1. Connect your GitHub repository
2. Build command: \`npm run build\`
3. Publish directory: \`out\` (if using static export)

#### Traditional Hosting
1. Run \`npm run build\`
2. Upload the \`.next\` folder and dependencies
3. Configure Node.js environment

## 🔒 Security Considerations

### Data Privacy
- **No Server Storage**: All data is processed client-side
- **No External APIs**: No data sent to third-party services
- **Local Processing**: Resume generation happens in the browser

### Content Security
- **XSS Prevention**: All user input is properly sanitized
- **Safe PDF Generation**: Uses trusted html2pdf.js library
- **Link Validation**: External links are properly formatted

## 🎯 Performance Optimization

### Bundle Size
- **Tree Shaking**: Unused code is eliminated
- **Code Splitting**: Components loaded on demand
- **Optimized Images**: Next.js automatic image optimization

### Runtime Performance
- **Memoization**: Expensive calculations are cached
- **Debounced Updates**: Form updates are debounced
- **Lazy Loading**: Components load when needed

### Core Web Vitals
- **LCP**: < 2.5s (Large Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

## 🐛 Troubleshooting

### Common Issues

#### PDF Generation Fails
**Problem**: "Error generating PDF" message
**Solution**: 
1. Check if html2pdf.js loaded properly
2. Ensure resume content exists
3. Try refreshing the page

#### Keywords Not Extracting
**Problem**: No keywords appear after pasting job description
**Solution**:
1. Ensure job description is substantial (100+ characters)
2. Check if description contains recognizable skills
3. Try clicking "Analyze Job Description" manually

#### Resume Preview Empty
**Problem**: Preview shows empty or incomplete resume
**Solution**:
1. Fill in required fields (marked with *)
2. Click "Generate Resume" button
3. Check browser console for errors

#### Styling Issues
**Problem**: Components look unstyled or broken
**Solution**:
1. Clear browser cache
2. Check if Tailwind CSS is loading
3. Verify all dependencies are installed

### Browser-Specific Issues

#### Safari
- PDF generation may be slower
- Some CSS features might render differently

#### Firefox
- File download behavior may vary
- Print styles might need adjustment

#### Mobile Browsers
- Touch interactions optimized
- Responsive design ensures usability

## 🔄 Future Enhancements

### Planned Features
1. **Multiple Templates**: Additional resume layouts
2. **Cover Letter Generator**: Matching cover letters
3. **LinkedIn Integration**: Import profile data
4. **Advanced Analytics**: Detailed ATS insights
5. **Team Collaboration**: Share and review resumes
6. **Version History**: Track resume changes
7. **Industry-Specific Templates**: Tailored for different fields

### Technical Improvements
1. **Offline Support**: PWA capabilities
2. **Real-time Collaboration**: Multi-user editing
3. **Advanced PDF Options**: Custom styling
4. **API Integration**: Job board connections
5. **Machine Learning**: Improved keyword extraction

## 📞 Support

### Getting Help
1. **Documentation**: Check this README first
2. **Issues**: Create GitHub issues for bugs
3. **Discussions**: Use GitHub Discussions for questions
4. **Email**: Contact support@resumeats.com

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### License
This project is licensed under the MIT License. See LICENSE file for details.

---

**Built with ❤️ for job seekers everywhere**

*Last updated: December 2024*
\`\`\`
