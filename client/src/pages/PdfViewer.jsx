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

    return (
        <div className="flex h-screen bg-white p-4">
            {/* Left column for the PDF viewer */}
            <div className="w-2/3 p-4 flex flex-col relative">
                <div className="flex-1 overflow-auto">
                    {loading ? (
                        <p>Loading PDF...</p>
                    ) : pdfUrl ? (
                        <iframe
                            src={pdfUrl} // Use the decoded PDF URL
                            type="application/pdf"
                            width="100%"
                            height="100%"
                            title="PDF Viewer"
                        >
                            Loading PDF...
                        </iframe>
                    ) : (
                        <p>Error loading PDF.</p>
                    )}
                </div>
            </div>

            {/* Right column for quiz and discussion links */}
            <div className="w-1/3 p-4 flex flex-col justify-between">
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

                {/* Quiz Block */}
                <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md text-center mb-4">
                    <h3 className="text-lg font-semibold">Quiz</h3>
                    <a href="/quiz" className="text-blue-500 hover:underline">
                        Go to the Quiz
                    </a>
                </div>
            </div>
        </div>
    );
}
