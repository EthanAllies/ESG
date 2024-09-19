import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PdfViewer() {
  const { id } = useParams(); // Get the PDF ID from the URL parameter
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [pdfUrl, setPdfUrl] = useState(null); // State to store the decoded PDF URL
  const [loading, setLoading] = useState(true); // State to handle loading

  // Effect to decode the PDF URL based on the ID from URL params
  useEffect(() => {
    if (id) {
      try {
        const decodedUrl = decodeURIComponent(id); // Decode the URL string from the parameter
        setPdfUrl(decodedUrl); // Set the decoded URL as the PDF URL
        setLoading(false); // Stop loading once the URL is decoded
      } catch (error) {
        console.error("Error decoding URL:", error); // Handle any decoding errors
        setLoading(false); // Stop loading even if there's an error
      }
    }
  }, [id]); // Dependency array includes the ID to trigger effect whenever the ID changes

  // Function to navigate back to the previous PDF page
  const handleBackClick = () => {
    navigate("/pdf"); // Navigate back to the main PDF page
  };

  // Function to navigate to the quiz page
  const handleQuizClick = () => {
    navigate("/quiz"); // Navigate to the quizzes page
  };

  // Function to navigate to the FAQ page
  const handleFaqClick = () => {
    navigate("/faqs"); // Navigate to the FAQ page
  };

  return (
    <div className="flex min-h-screen bg-white p-4 overflow-auto">
      {/* Left column for the PDF viewer */}
      <div className="m-6 w-2/3 p-4 flex flex-col relative">
        {/* Back Button to navigate back to PDF list */}
        <button
          onClick={handleBackClick}
          className="text-blue-500 hover:text-blue-700 focus:outline-none mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Display PDF content */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <p>Loading PDF...</p> // Show loading message while PDF is being loaded
          ) : pdfUrl ? (
            <iframe
              src={pdfUrl} // Display the decoded PDF URL
              type="application/pdf"
              width="100%"
              height="600px" // Height of the PDF viewer
              title="PDF Viewer"
            >
              Loading PDF...
            </iframe>
          ) : (
            <p>Error loading PDF.</p> // Error message if there's an issue loading the PDF
          )}
        </div>
      </div>

      {/* Right column for quiz and FAQ options */}
      <div className="w-1/3 p-4 flex flex-col justify-between">
        {/* Quiz Block */}
        <div className="flex-grow flex items-center justify-center mb-4">
          <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold mb-2">
              Complete this chapter's quiz to earn a badge!
            </h3>
            <button
              onClick={handleQuizClick} // Navigate to quiz page on click
              className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Go to Quiz
            </button>
          </div>
        </div>

        {/* FAQ Block */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold mb-2">
              Have questions you want to ask? Check out the FAQ to see others'
              questions and to ask your own!
            </h3>
            <button
              onClick={handleFaqClick} // Navigate to FAQ page on click
              className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Go to FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
