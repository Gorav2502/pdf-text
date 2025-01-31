// // import React, { useState } from "react";
// // import * as pdfjsLib from "pdfjs-dist";
// // import mammoth from "mammoth";

// // pdfjsLib.GlobalWorkerOptions.workerSrc = `http://localhost:3001/pdf.worker.min.js`;
// // function App() {
// //   const [text, setText] = useState("");
// //   console.log(`PDF.js Version: ${pdfjsLib.version}`);
// //   const handleFileChange = (file) => {
// //     if (file.type === "application/pdf") {
// //       extractPDFText(file);
// //     } else if (file.name.endsWith(".docx")) {
// //       extractDocxText(file);
// //     } else {
// //       setText("Unsupported file type.");
// //     }
// //   };

// //   const extractPDFText = async (file) => {
// //     const fileReader = new FileReader();
// //     fileReader.onload = async (e) => {
// //       const typedArray = new Uint8Array(e.target.result);
// //       const pdf = await pdfjsLib.getDocument(typedArray).promise;
// //       let fullText = "";

// //       for (let i = 1; i <= pdf.numPages; i++) {
// //         const page = await pdf.getPage(i);
// //         const textContent = await page.getTextContent();
// //         const pageText = textContent.items.map((item) => item.str).join(" ");
// //         fullText += `\n${pageText}`;
// //       }
// //       setText(fullText);
// //     };
// //     fileReader.readAsArrayBuffer(file);
// //   };

// //   const extractDocxText = async (file) => {
// //     const fileReader = new FileReader();
// //     fileReader.onload = async (e) => {
// //       const arrayBuffer = e.target.result;
// //       const result = await mammoth.extractRawText({ arrayBuffer });
// //       setText(result.value);
// //     };
// //     fileReader.readAsArrayBuffer(file);
// //   };

// //   return (
// //     <div>
// //       <input
// //         type="file"
// //         accept=".pdf,.docx"
// //         onChange={(e) => handleFileChange(e.target.files[0])}
// //       />
// //       <div style={{ width: "80%", marginLeft: "30px" }}>
// //         <textarea
// //           value={text}
// //           readOnly
// //           rows={50}
// //           style={{ width: "100%", marginTop: "20px" }}
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import mammoth from "mammoth";
// import "./index.css";
// // Use the local worker script from the public folder
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://pdf-text-mith.vercel.app/pdf.worker.min.js`;

// function App() {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (file) => {
//     if (!file) {
//       return;
//     }
//     setError(""); // Reset previous errors
//     setLoading(true); // Start loading state

//     if (file.type === "application/pdf") {
//       extractPDFText(file);
//     } else if (file.name.endsWith(".docx")) {
//       extractDocxText(file);
//     } else {
//       setError("Unsupported file type. Please upload a PDF or DOCX file.");
//       setLoading(false);
//     }
//   };

//   // New function to extract emails and phone numbers
//   // const extractPDFText = async (file) => {
//   //   try {
//   //     const fileReader = new FileReader();
//   //     fileReader.onload = async (e) => {
//   //       const typedArray = new Uint8Array(e.target.result);
//   //       const pdf = await pdfjsLib.getDocument(typedArray).promise;
//   //       let fullText = "";

//   //       for (let i = 1; i <= pdf.numPages; i++) {
//   //         const page = await pdf.getPage(i);
//   //         const textContent = await page.getTextContent();
//   //         const items = textContent.items;

//   //         // Use a regular for loop to avoid unsafe references
//   //         for (let j = 0; j < items.length; j++) {
//   //           const { str, transform } = items[j];
//   //           const yPosition = transform[5];
//   //           if (yPosition > 700) {
//   //             fullText += `${str} `; // Header
//   //           } else if (yPosition < 50) {
//   //             fullText += `${str} `; // Footer
//   //           } else {
//   //             fullText += `${str} `; // Main body text
//   //           }
//   //         }
//   //       }

//   //       const spacedText = fullText
//   //         .trim()
//   //         .split(" ")
//   //         .map((word) => `${word} `) // Add a space after every word
//   //         .join("");

//   //       setText(spacedText.trim()); // Update state with processed text
//   //     };
//   //     fileReader.readAsArrayBuffer(file);
//   //   } catch (error) {
//   //     console.error("Error extracting PDF text:", error);
//   //   } finally {
//   //     setLoading(false); // End loading state
//   //   }
//   // };
//   // const extractPDFText = async (file) => {
//   //   try {
//   //     const fileReader = new FileReader();
//   //     fileReader.onload = async (e) => {
//   //       const typedArray = new Uint8Array(e.target.result);
//   //       const pdf = await pdfjsLib.getDocument(typedArray).promise;

//   //       let extractedText = "";
//   //       let previousYPosition = null;
//   //       const sectionThreshold = 100; // Threshold to detect breaks between sections or paragraphs
//   //       const lineBreakThreshold = 5; // Threshold to detect new lines (based on Y-position difference)
//   //       let currentPageText = "";

//   //       // Loop through all pages of the PDF
//   //       for (let i = 1; i <= pdf.numPages; i++) {
//   //         const page = await pdf.getPage(i);
//   //         const textContent = await page.getTextContent();
//   //         const items = textContent.items;

//   //         // Loop through all items (text fragments) on the page
//   //         for (let j = 0; j < items.length; j++) {
//   //           const { str, transform } = items[j];
//   //           const yPosition = transform[5]; // Extract the Y position for text placement

//   //           // Detect new lines based on Y position difference
//   //           if (
//   //             previousYPosition &&
//   //             Math.abs(previousYPosition - yPosition) > lineBreakThreshold
//   //           ) {
//   //             currentPageText += "\n"; // Add line break if the Y position differs significantly
//   //           }

//   //           currentPageText += `${str} `; // Add the current text fragment
//   //           previousYPosition = yPosition; // Update the Y position for comparison
//   //         }

//   //         // Once we finish processing the page, add the page text to the full extracted text
//   //         extractedText += currentPageText.trim() + "\n\n"; // Ensure there's a space between pages
//   //         currentPageText = ""; // Reset for next page text
//   //       }

//   //       // Remove trailing spaces and unnecessary line breaks
//   //       extractedText = extractedText.trim();

//   //       // Update state with the extracted text, preserving its structure
//   //       setText(extractedText);
//   //     };

//   //     fileReader.readAsArrayBuffer(file);
//   //   } catch (error) {
//   //     console.error("Error extracting PDF text:", error);
//   //   } finally {
//   //     setLoading(false); // End loading state
//   //   }
//   // };

//   const extractPDFText = async (file) => {
//     try {
//       const fileReader = new FileReader();
//       fileReader.onload = async (e) => {
//         const typedArray = new Uint8Array(e.target.result);
//         const pdf = await pdfjsLib.getDocument(typedArray).promise;

//         let extractedText = "";

//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const textContent = await page.getTextContent();
//           const items = textContent.items;

//           // Group text fragments by their approximate line (Y position)
//           const lines = [];
//           const lineMap = new Map();

//           items.forEach(({ str, transform }) => {
//             const yPosition = Math.round(transform[5]); // Round Y position for easier grouping
//             if (!lineMap.has(yPosition)) {
//               lineMap.set(yPosition, []);
//             }
//             lineMap.get(yPosition).push({ str, xPosition: transform[4] }); // Collect text fragments and their X positions
//           });

//           // Sort lines by Y position (descending to match natural top-to-bottom reading order)
//           const sortedLines = Array.from(lineMap.entries()).sort(
//             (a, b) => b[0] - a[0]
//           );

//           // Process each line
//           sortedLines.forEach(([_, fragments]) => {
//             // Sort fragments in the line by X position (left to right)
//             fragments.sort((a, b) => a.xPosition - b.xPosition);

//             // Combine all fragments in the line into a single line of text
//             const lineText = fragments.map((f) => f.str).join(" ");
//             lines.push(lineText);
//           });

//           // Combine lines into the page's text
//           extractedText += lines.join("\n") + "\n\n"; // Add double line break between pages
//         }

//         // Remove trailing spaces and unnecessary breaks
//         extractedText = extractedText.trim();

//         // Update the extracted text to the state (or process it as needed)
//         setText(extractedText);
//       };

//       fileReader.readAsArrayBuffer(file);
//     } catch (error) {
//       console.error("Error extracting PDF text:", error);
//     } finally {
//       setLoading(false); // End loading state
//     }
//   };

//   const extractDocxText = async (file) => {
//     try {
//       const fileReader = new FileReader();
//       fileReader.onload = async (e) => {
//         const arrayBuffer = e.target.result;
//         const result = await mammoth.extractRawText({ arrayBuffer });
//         setText(result.value);
//       };
//       fileReader.readAsArrayBuffer(file);
//     } catch (error) {
//       setError("An error occurred while extracting DOCX text.");
//       console.error("Error extracting DOCX text:", error);
//     } finally {
//       setLoading(false); // End loading state
//     }
//   };
//   const highlightEmails = (text) => {
//     const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
//     return text.split(emailRegex).map((part, index) => {
//       if (emailRegex.test(part)) {
//         return (
//           <span key={index} style={{ color: "blue", fontWeight: "bold" }}>
//             {part}
//           </span>
//         ); // Highlight email
//       }
//       return part; // Return other parts as plain text
//     });
//   };
//   return (
//     <div>
//       <div className="flex  p-4 ">
//         <input
//           type="file"
//           accept=".pdf,.docx"
//           onChange={(e) => handleFileChange(e.target.files[0])}
//           className="cursor-pointer"
//         />
//       </div>
//       <div className="px-4">
//         {loading ? (
//           <p>Processing...</p>
//         ) : (
//           <div className="grid grid-cols-2  gap-4">
//             {/* <div className="border text-xs   leading-6 p-4 ">
//               <span className=""> {highlightEmails(text)}</span>
//             </div> */}
//             <div>
//               <textarea
//                 className="w-full text-xs h-full"
//                 value={text}
//                 readOnly
//                 rows={50}
//               />
//             </div>
//           </div>
//         )}

//         {error && (
//           <div style={{ color: "red", marginTop: "10px" }}>
//             <strong>{error}</strong>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import mammoth from "mammoth";
// import "./index.css";

// // Use the local worker script from the public folder
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://pdf-text-mith.vercel.app/pdf.worker.min.js`;

// function App() {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [pdfUrl, setPdfUrl] = useState(null); // State for the PDF URL
//   const [pdfPageNumber, setPdfPageNumber] = useState(1); // Page tracking for PDF
//   const [isPdfFile, setIsPdfFile] = useState(false); // Flag to identify PDF

//   const handleFileChange = (file) => {
//     if (!file) {
//       return;
//     }
//     setError(""); // Reset previous errors
//     setLoading(true); // Start loading state
//     setPdfUrl(null); // Reset PDF URL
//     setText(""); // Reset the text

//     if (file.type === "application/pdf") {
//       setIsPdfFile(true); // It's a PDF file
//       setPdfUrl(URL.createObjectURL(file)); // Set the PDF file URL
//       extractPDFText(file); // Extract text from PDF
//     } else if (file.name.endsWith(".docx")) {
//       setIsPdfFile(false); // It's a DOCX file
//       extractDocxText(file); // Extract text from DOCX
//     } else {
//       setError("Unsupported file type. Please upload a PDF or DOCX file.");
//       setLoading(false);
//     }
//   };

//   // const extractPDFText = async (file) => {
//   //   try {
//   //     const fileReader = new FileReader();

//   //     fileReader.onload = async (e) => {
//   //       const typedArray = new Uint8Array(e.target.result);
//   //       const pdf = await pdfjsLib.getDocument(typedArray).promise;
//   //       let extractedText = "";

//   //       for (let i = 1; i <= pdf.numPages; i++) {
//   //         const page = await pdf.getPage(i);
//   //         const textContent = await page.getTextContent();
//   //         const items = textContent.items;

//   //         // Group text fragments by their approximate line (Y position)
//   //         const lines = [];
//   //         const lineMap = new Map();

//   //         items.forEach(({ str, transform }) => {
//   //           const yPosition = Math.round(transform[5]); // Round Y position for easier grouping
//   //           if (!lineMap.has(yPosition)) {
//   //             lineMap.set(yPosition, []);
//   //           }
//   //           lineMap.get(yPosition).push({ str, xPosition: transform[4] }); // Collect text fragments and their X positions
//   //         });

//   //         // Sort lines by Y position (descending to match natural top-to-bottom reading order)
//   //         const sortedLines = Array.from(lineMap.entries()).sort(
//   //           (a, b) => b[0] - a[0]
//   //         );

//   //         // Process each line, ensuring text is not mixed
//   //         sortedLines.forEach(([_, fragments]) => {
//   //           // Sort fragments in the line by X position (left to right)
//   //           fragments.sort((a, b) => a.xPosition - b.xPosition);

//   //           // Combine all fragments in the line into a single line of text
//   //           const lineText = fragments.map((f) => f.str).join(" ");
//   //           lines.push(lineText);
//   //         });

//   //         // Combine lines into the page's text, maintaining separation between pages
//   //         extractedText += lines.join("\n") + "\n\n"; // Add double line break between pages
//   //       }

//   //       // Remove trailing spaces and unnecessary breaks
//   //       extractedText = extractedText.trim();

//   //       // Set the extracted text to state or process it as needed
//   //       setText(extractedText); // Use your state update function
//   //     };

//   //     fileReader.readAsArrayBuffer(file);
//   //   } catch (error) {
//   //     console.error("Error extracting PDF text:", error);
//   //   } finally {
//   //     setLoading(false); // End loading state
//   //   }
//   // };

//   const extractPDFText = async (file) => {
//     try {
//       const fileReader = new FileReader();

//       fileReader.onload = async (e) => {
//         const typedArray = new Uint8Array(e.target.result);
//         const pdf = await pdfjsLib.getDocument(typedArray).promise;
//         let extractedText = "";
//         let currentSection = ""; // To hold text for the current section

//         const sectionThreshold = 50; // Threshold for large vertical gaps (e.g., 50px between text fragments)

//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const textContent = await page.getTextContent();
//           const items = textContent.items;

//           let lastY = null; // Variable to keep track of the last Y position
//           let newSection = false; // Flag to detect new section

//           // Group text by detecting large vertical gaps
//           items.forEach(({ str, transform, width, height }) => {
//             const yPosition = Math.round(transform[5]); // Vertical position of the text

//             if (lastY !== null) {
//               const gap = Math.abs(lastY - yPosition); // Calculate the gap between two lines

//               if (gap > sectionThreshold) {
//                 // If the gap is greater than the threshold, treat it as a new section
//                 newSection = true;
//               }
//             }

//             // If it's a new section, add the previous section's content to the extracted text
//             if (newSection) {
//               extractedText += currentSection + "\n\n"; // Add previous section and clear it for the next one
//               currentSection = ""; // Reset for the next section
//               newSection = false; // Reset new section flag
//             }

//             // Append the current text to the section content
//             currentSection += str + " "; // Add space between words

//             lastY = yPosition; // Update the last Y position
//           });

//           // Append the last section content after processing all items
//           extractedText += currentSection + "\n\n";
//         }

//         // Clean up and update state with the extracted text
//         extractedText = extractedText.trim();
//         setText(extractedText); // Your state update function
//       };

//       fileReader.readAsArrayBuffer(file);
//     } catch (error) {
//       console.error("Error extracting PDF text with sections:", error);
//     } finally {
//       setLoading(false); // End loading state
//     }
//   };

//   // Example helper function to check if text is near a border (you can adjust this as per your needs)
//   const checkIfNearBorder = (x, y, width, height) => {
//     // Define a threshold to check if the text is near the left, right, top, or bottom border
//     const borderThreshold = 5; // Change this value as needed

//     const isNearVerticalBorder =
//       x <= borderThreshold || x + width >= window.innerWidth - borderThreshold;
//     const isNearHorizontalBorder =
//       y <= borderThreshold ||
//       y + height >= window.innerHeight - borderThreshold;

//     return isNearVerticalBorder || isNearHorizontalBorder;
//   };

//   const extractDocxText = async (file) => {
//     try {
//       const fileReader = new FileReader();
//       fileReader.onload = async (e) => {
//         const arrayBuffer = e.target.result;
//         const result = await mammoth.extractRawText({ arrayBuffer });
//         setText(result.value);
//       };
//       fileReader.readAsArrayBuffer(file);
//     } catch (error) {
//       setError("An error occurred while extracting DOCX text.");
//       console.error("Error extracting DOCX text:", error);
//     } finally {
//       setLoading(false); // End loading state
//     }
//   };

//   const handleNextPage = () => {
//     setPdfPageNumber((prevPage) => prevPage + 1);
//   };

//   const handlePrevPage = () => {
//     setPdfPageNumber((prevPage) => Math.max(1, prevPage - 1));
//   };

//   return (
//     <div>
//       <div className="flex p-4">
//         <input
//           type="file"
//           accept=".pdf,.docx"
//           onChange={(e) => handleFileChange(e.target.files[0])}
//           className="cursor-pointer"
//         />
//       </div>
//       <div className="px-4">
//         {loading ? (
//           <p>Processing...</p>
//         ) : (
//           <div className="grid grid-cols-2 gap-4">
//             {/* PDF Preview */}
//             <div>
//               <textarea
//                 className="w-full text-xs h-full"
//                 value={text}
//                 readOnly
//                 rows={40}
//               />
//             </div>
//             {pdfUrl && (
//               <div className="border p-4">
//                 <iframe
//                   src={pdfUrl}
//                   width="100%"
//                   height="100%"
//                   title="PDF Preview"
//                 ></iframe>
//                 <div className="flex justify-between mt-2">
//                   <button
//                     onClick={handlePrevPage}
//                     disabled={pdfPageNumber <= 1}
//                   >
//                     Previous Page
//                   </button>
//                   <button onClick={handleNextPage}>Next Page</button>
//                 </div>
//               </div>
//             )}

//             {/* DOCX Preview */}
//           </div>
//         )}

//         {error && (
//           <div style={{ color: "red", marginTop: "10px" }}>
//             <strong>{error}</strong>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import React, { useState } from "react";
import "./index.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://pdf-text-mith.vercel.app/pdf.worker.min.js`;

function App() {
  const [data, setData] = useState({ text: "", email: [], contactNumber: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (file) => {
    if (!file) return;
    setError("");
    setLoading(true);
    setPdfUrl(null);
    setData({ text: "", email: [], contactNumber: [] });

    if (file.type === "application/pdf") {
      setPdfUrl(URL.createObjectURL(file));
      extractPDFText(file);
    } else if (file.name.endsWith(".docx")) {
      extractDocxText(file);
    } else {
      setError("Unsupported file type. Please upload a PDF or DOCX file.");
      setLoading(false);
    }
  };

  const extractPDFText = async (file) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        // let extractedText = "";

        // for (let i = 1; i <= pdf.numPages; i++) {
        //   const page = await pdf.getPage(i);
        //   const textContent = await page.getTextContent();
        //   textContent?.items?.forEach(({ str }) => {
        //     extractedText += str + " ";
        //   });
        // }

        // extractedText = extractedText.trim();
        // processExtractedText(extractedText);
        const extractedTextArray = await Promise.all(
          Array.from({ length: pdf.numPages }, async (_, i) => {
            const page = await pdf.getPage(i + 1);
            const textContent = await page.getTextContent();
            return textContent.items.map(({ str }) => str).join(" ");
          })
        );

        const extractedText = extractedTextArray.join(" \n").trim();
        processExtractedText(extractedText);
      };
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error extracting PDF text:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractDocxText = async (file) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        processExtractedText(result.value);
      };
      fileReader.readAsArrayBuffer(file);
    } catch (error) {
      setError("An error occurred while extracting DOCX text.");
      console.error("Error extracting DOCX text:", error);
    } finally {
      setLoading(false);
    }
  };

  const processExtractedText = (text) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const numberRegex =
      /\b(?:\+\d{1,3}\s?)?(?:\d{10,13}|\(\d{3}\)\s?\d{3}-?\d{4})\b/g;

    const emails = [...new Set(text.match(emailRegex) || [])];
    const numbers = [...new Set(text.match(numberRegex) || [])];

    setData({ text, email: emails, contactNumber: numbers });
  };

  // const processExtractedText = (text) => {
  //   const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  //   const numberRegex = /\b(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4})\b/g;

  //   const emails = [...new Set(text.match(emailRegex) || [])];
  //   const numbers = [...new Set(text.match(numberRegex) || [])];

  //   // Normalize numbers with their country codes and ensure proper format
  //   const formattedNumbers = numbers.map((number) => {
  //     let formattedNumber = number.replace(/\D/g, '');  // Remove all non-digit characters
  //     if (formattedNumber.length === 10) {
  //       // Assuming country code +91 for India
  //       formattedNumber = '+91 ' + formattedNumber;  // Add a default country code if none exists
  //     } else if (formattedNumber.length > 10 && formattedNumber.startsWith('91')) {
  //       // Handle numbers with the country code
  //       formattedNumber = `+${formattedNumber.slice(0, 2)} ${formattedNumber.slice(2)}`;
  //     }

  //     return formattedNumber;
  //   });

  //   setData({ text, email: emails, contactNumber: formattedNumbers });
  // };

  return (
    <div>
      <div className="flex p-4">
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
          <div className="grid grid-cols-2 gap-4 ">
            <div className="col-span-2">
              <p>
                <strong>Email:</strong>{" "}
                {data.email.length ? data.email.join(", ") : "No email found"}
              </p>
              <p>
                <strong>Contact Number:</strong>{" "}
                {data.contactNumber.length
                  ? data.contactNumber.join(", ")
                  : "No contact number found"}
              </p>
            </div>
            <textarea
              className="w-full text-sm h-svh p-2"
              value={data.text}
              readOnly
            />
            {pdfUrl && (
              <div className="border p-4">
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="100%"
                  title="PDF Preview"
                ></iframe>
              </div>
            )}
          </div>
        )}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}

export default App;
