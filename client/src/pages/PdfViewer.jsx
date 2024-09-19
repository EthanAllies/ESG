import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PdfViewer() {
    const { id } = useParams(); // URL parameter for the PDF URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [pdfUrl, setPdfUrl] = useState(null); // Store the PDF URL
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        console.log("Received PDF URL Param:", id); // Debugging line to ensure the param is received
        if (id) {
            try {
                // Decode the URL and set the PDF URL
                const decodedUrl = decodeURIComponent(id);
                setPdfUrl(decodedUrl);
                setLoading(false); // PDF URL is ready, stop loading
            } catch (error) {
                console.error('Error decoding URL:', error);
                setLoading(false);
            }
        }
    }, [id]);

    const handleBackClick = () => {
        navigate('/pdf'); // Navigate back to the PdfPage
    };

    const handleQuizClick = () => {
        navigate('/quiz'); // Navigate to the quizzes page
    };

    const handleFaqClick = () => {
        navigate('/faqs'); // Navigate to the FAQ page
    };

    return (
        <div className="flex min-h-screen bg-white p-4 overflow-auto"> 
            {/* Remove h-screen and allow for content to grow beyond the screen height */}
    
            {/* Left column for the PDF viewer */}
            <div className="m-6 w-2/3 p-4 flex flex-col relative">
                {/* Back Button */}
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
                <div className="flex-1 overflow-auto">
                    {loading ? (
                        <p>Loading PDF...</p>
                    ) : pdfUrl ? (
                        <iframe
                            src={pdfUrl} // Use the decoded PDF URL
                            type="application/pdf"
                            width="100%"
                            height="600px" // Adjust this if needed to increase space
                            title="PDF Viewer"
                        >
                            Loading PDF...
                        </iframe>
                    ) : (
                        <p>Error loading PDF.</p>
                    )}
                </div>
            </div>
    
            {/* Right column for quiz and FAQ blocks */}
            <div className="w-1/3 p-4 flex flex-col justify-between">
                {/* Quiz Block */}
                <div className="flex-grow flex items-center justify-center mb-4">
                    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold mb-2">Complete this chapter's quiz to earn a badge!</h3>
                        <button
                            onClick={handleQuizClick}
                            className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                        >
                            Go to Quiz
                        </button>
                    </div>
                </div>
    
                {/* FAQ Block */}
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold mb-2">Have questions you want to ask? Check out the FAQ to see others questions and to ask your own!</h3>
                        <button
                            onClick={handleFaqClick}
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