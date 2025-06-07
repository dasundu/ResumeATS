# ResumeATS - ATS-Friendly Resume Generator

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> A modern, intelligent web application that helps job seekers create professional resumes optimized for Applicant Tracking Systems (ATS).

## 🎯 Problem Statement

Over 75% of resumes are initially screened by Applicant Tracking Systems before reaching human recruiters. Many qualified candidates are rejected not due to lack of skills, but because their resumes aren't optimized for these automated systems.

## ✨ Features

### 🚀 Core Features
- **Smart Resume Builder**: Multi-step form with real-time preview
- **Job Description Analysis**: Automatic keyword extraction and matching

- **ATS Compatibility Scoring**: Real-time feedback with actionable suggestions
- **Professional Export**: High-quality PDF generation with clickable links

### 🎨 User Experience
- Clean, intuitive interface
- Responsive design for all devices
- Local storage for data persistence
- Privacy-focused (no external data transmission)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **PDF Generation**: html2pdf.js
- **Storage**: Browser Local Storage

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resumeats.git
   cd resumeats
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
resumeats/
├── app/                    # Next.js 14 App Router
│   ├── components/         # Reusable UI components
│   ├── lib/               # Utility functions and stores
│   └── page.tsx           # Main application page
├── public/                # Static assets
├── components/            # Global components
└── types/                 # TypeScript type definitions
```

## 🔧 Key Components

### Resume Builder Flow
1. **Personal Information**: Contact details and basic info
2. **Work Experience**: Job history with achievements
3. **Education**: Academic background
4. **Skills**: Technical and soft skills categorization
5. **Projects**: Relevant project showcase
6. **Job Analysis**: Target job description input

### ATS Optimization Engine
- Keyword extraction from job descriptions
- Resume content analysis
- Compatibility scoring (0-100%)
- Missing keyword identification
- Formatting optimization

## 🎨 UI Components

Built with shadcn/ui for consistent, accessible design:
- Form components with validation
- Progress indicators
- Score displays with visual feedback
- Responsive layout components

## 📊 Features in Detail

### Smart Analysis
- **Keyword Matching**: Identifies relevant skills from job descriptions
- **Content Optimization**: Suggests improvements for better ATS performance
- **Real-time Scoring**: Live feedback as users build their resume

### Export Options
- **PDF Generation**: Professional formatting maintained
- **Clickable Links**: Functional email, LinkedIn, GitHub links
- **Print-ready**: Optimized for both digital and physical applications

## 🔮 Future Enhancements

- [ ] Multiple resume templates
- [ ] User account system
- [ ] Application tracking
- [ ] Industry-specific optimization
- [ ] LinkedIn integration
- [ ] Mobile app versions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/resumeats/issues) on GitHub.

---

**Made with ❤️ for job seekers everywhere**
