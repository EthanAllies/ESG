import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.json";

export default function PdfPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pdfs, setPdfs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      if (id) {
        try {
          // Decode the URL and ensure it's safe to use
          const decodedUrl = decodeURIComponent(id);
          setPdfUrl(decodedUrl);
          setLoading(false); // Set loading to false since URL is ready
        } catch (error) {
          console.error("Error decoding URL:", error);
          setLoading(false);
        }
      }
    }, [id]);
    return (
      <div className="flex flex-col items-center w-full h-full p-4 bg-white">
        {/* Heading */}
        <h1 className="text-3xl font-semibold mb-4">Chapters</h1>
  
              {/* Search bar */}
              <input
                  type="text"
                  placeholder="Search Chapters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-3/4 md:w-1/2 border-gray-200 p-2 drop-shadow-md rounded-full mb-6 text-center"
              />
  
              {/* PDF grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredPdfs.map(pdf => (
                      <div
                          key={pdf._id}
                          className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
                          onClick={() => handlePdfClick(pdf)}
                      >
                          <img src={pdf.imgurl} alt={pdf.name} className="w-full h-40 object-contain rounded mb-2" />
                          <h3 className="text-center font-normal text-sm">{pdf.desc}</h3>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  



