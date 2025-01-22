// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import mammoth from "mammoth";

// pdfjsLib.GlobalWorkerOptions.workerSrc = `http://localhost:3001/pdf.worker.min.js`;
// function App() {
//   const [text, setText] = useState("");
//   console.log(`PDF.js Version: ${pdfjsLib.version}`);
//   const handleFileChange = (file) => {
//     if (file.type === "application/pdf") {
//       extractPDFText(file);
//     } else if (file.name.endsWith(".docx")) {
//       extractDocxText(file);
//     } else {
//       setText("Unsupported file type.");
//     }
//   };

//   const extractPDFText = async (file) => {
//     const fileReader = new FileReader();
//     fileReader.onload = async (e) => {
//       const typedArray = new Uint8Array(e.target.result);
//       const pdf = await pdfjsLib.getDocument(typedArray).promise;
//       let fullText = "";

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         const pageText = textContent.items.map((item) => item.str).join(" ");
//         fullText += `\n${pageText}`;
//       }
//       setText(fullText);
//     };
//     fileReader.readAsArrayBuffer(file);
//   };

//   const extractDocxText = async (file) => {
//     const fileReader = new FileReader();
//     fileReader.onload = async (e) => {
//       const arrayBuffer = e.target.result;
//       const result = await mammoth.extractRawText({ arrayBuffer });
//       setText(result.value);
//     };
//     fileReader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept=".pdf,.docx"
//         onChange={(e) => handleFileChange(e.target.files[0])}
//       />
//       <div style={{ width: "80%", marginLeft: "30px" }}>
//         <textarea
//           value={text}
//           readOnly
//           rows={50}
//           style={{ width: "100%", marginTop: "20px" }}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import "./index.css";
// Use the local worker script from the public folder
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://pdf-text-mith.vercel.app/pdf.worker.min.js`;

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (file) => {
    if (!file) {
      return;
    }
    setError(""); // Reset previous errors
    setLoading(true); // Start loading state

    if (file.type === "application/pdf") {
      extractPDFText(file);
    } else if (file.name.endsWith(".docx")) {
      extractDocxText(file);
    } else {
      setError("Unsupported file type. Please upload a PDF or DOCX file.");
      setLoading(false);
    }
  };

  // New function to extract emails and phone numbers
  const extractPDFText = async (file) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        const sectionsByPage = []; // Store sections for each page

        for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
          const page = await pdf.getPage(pageIndex);
          const textContent = await page.getTextContent();

          // Group items by Y-coordinates (lines)
          const lines = {};
          textContent.items.forEach((item) => {
            const yPosition = Math.round(item.transform[5]); // Y-coordinate
            const text = item.str.trim();

            if (!lines[yPosition]) {
              lines[yPosition] = [];
            }
            lines[yPosition].push(text);
          });

          // Sort lines by Y-coordinate (descending for top-to-bottom)
          const sortedLines = Object.keys(lines)
            .map(Number)
            .sort((a, b) => b - a);

          // Initialize sections for the page
          const pageSections = {
            headers: [],
            body: [],
            footers: [],
          };

          // Process sorted lines and categorize
          sortedLines.forEach((yPosition) => {
            const lineText = lines[yPosition].join(" ");

            // Header for the first page only
            if (pageIndex === 1 && yPosition > 700) {
              pageSections.headers.push(lineText);
            }
            // Footer for any page
            else if (yPosition < 50) {
              pageSections.footers.push(lineText);
            }
            // Body for all pages
            else {
              pageSections.body.push(lineText);
            }
          });

          // Add the sections of this page to the global list
          sectionsByPage.push({
            page: pageIndex,
            sections: pageSections,
          });
        }

        // Format output
        let formattedText = "";

        sectionsByPage.forEach(({ page, sections }) => {
          formattedText += ` ${page}:\n`;
          formattedText += `\n${sections.headers.join("\n")}\n\n`;
          formattedText += `\n${sections.body.join("\n")}\n\n`;
          formattedText += `\n${sections.footers.join("\n")}\n\n`;
        });

        setText(formattedText.trim()); // Update state with formatted text
      };
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      setError("An error occurred while extracting text.");
      console.error("Error extracting text:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  const extractDocxText = async (file) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        setText(result.value);
      };
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      setError("An error occurred while extracting DOCX text.");
      console.error("Error extracting DOCX text:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };
  const highlightEmails = (text) => {
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    return text.split(emailRegex).map((part, index) => {
      if (emailRegex.test(part)) {
        return (
          <span key={index} style={{ color: "blue", fontWeight: "bold" }}>
            {part}
          </span>
        ); // Highlight email
      }
      return part; // Return other parts as plain text
    });
  };
  return (
    <div>
      <div className="flex  p-4 ">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => handleFileChange(e.target.files[0])}
          className="cursor-pointer"
        />
      </div>
      <div className="px-4">
        {loading ? (
          <p>Processing...</p>
        ) : (
          <div className="grid grid-cols-2  gap-4">
            <div className="border text-xs   leading-6 p-4 ">
              <span className=""> {highlightEmails(text)}</span>
            </div>
            <div>
              <textarea
                className="w-full text-xs h-full"
                value={text}
                readOnly
              />
            </div>
          </div>
        )}

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
            <strong>{error}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
