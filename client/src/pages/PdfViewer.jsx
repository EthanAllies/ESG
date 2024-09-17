import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PdfViewer() {
    const { id } = useParams(); // Get the PDF URL from the URL parameter
    const [pdfUrl, setPdfUrl] = useState(null); // Store the PDF URL
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        console.log("PDF URL Param:", id); // Debugging line
        if (id) {
            // Decode the URL if necessary
            const decodedUrl = decodeURIComponent(id);
            setPdfUrl(decodedUrl); 
            setLoading(false); // Set loading to false since URL is ready
        }
    }, [id]);

    return (
        <div className="flex flex-col items-center w-full h-full p-4 bg-white">
            <div className="w-full h-96 mb-4">
                {loading ? (
                    <p>Loading PDF...</p>
                ) : pdfUrl ? (
                    <iframe
                        src={pdfUrl} // Use the PDF URL directly
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
            <div className="mb-4">
                <a href="#quiz" className="text-blue-500 hover:underline">
                    Quiz for this PDF
                </a>
            </div>
            <div className="mb-4">
                <a href="#discussion" className="text-blue-500 hover:underline">
                    Discussion for this PDF
                </a>
            </div>
        </div>
    );
}
