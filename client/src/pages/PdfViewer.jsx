import React from 'react';
import { useParams } from 'react-router-dom';

export default function PdfViewer() {
  const { pdfFile } = useParams();  // Gets the filename from the URL parameter

  return (
    <div className="flex flex-col items-center w-full h-full p-4 bg-white">
      {/* PDF Viewer */}
      <div className="w-full h-96 mb-4">
        <iframe
          src={`/${pdfFile}`} // Load the PDF from the public folder
          type="application/pdf"
          width="100%"
          height="100%"
          title="PDF Viewer"
        >
          Loading PDF...
        </iframe>
      </div>

      {/* Placeholder for Quiz Link */}
      <div className="mb-4">
        <a href="#quiz" className="text-blue-500 hover:underline">
          Quiz for this PDF
        </a>
      </div>

      {/* Placeholder for Discussion Link */}
      <div className="mb-4">
        <a href="#discussion" className="text-blue-500 hover:underline">
          Discussion for this PDF
        </a>
      </div>
    </div>
  );
}
