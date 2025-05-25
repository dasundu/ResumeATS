export const generatePDF = (filename: string) => {
  // Get the resume element
  const element = document.getElementById("resume-to-download")

  if (!element) {
    console.error("Resume element not found")
    return
  }

  // Check if html2pdf is available
  if (typeof window === "undefined" || !window.html2pdf) {
    // Load html2pdf dynamically if it's not already loaded
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
    script.onload = () => {
      // Once loaded, try again
      generatePDFWithLibrary(element, filename)
    }
    document.head.appendChild(script)
    return
  }

  // If html2pdf is already available, generate the PDF
  generatePDFWithLibrary(element, filename)
}

const generatePDFWithLibrary = (element: HTMLElement, filename: string) => {
  try {
    const opt = {
      margin: 10,
      filename: `${filename.replace(/\s+/g, "_")}_ATS_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }

    // Use the global html2pdf instance
    window.html2pdf().from(element).set(opt).save()
  } catch (error) {
    console.error("Error generating PDF:", error)
    alert("There was an error generating your PDF. Please try again.")
  }
}

// Add this to make TypeScript happy with the global html2pdf
declare global {
  interface Window {
    html2pdf: any
  }
}
