import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.json";

export default function PdfPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPdfs() {
      try {
        const httpResponse = await axios.get(`${config.api_url}/docs`);
        setPdfs(httpResponse.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPdfs();
  }, []);

  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePdfClick = (pdf) => {
    console.log("Selected PDF:", pdf); // Debugging line
    navigate(`/pdf-viewer/${encodeURIComponent(pdf.url)}`); // Pass encoded URL
  };

  if (loading) return <p>Loading PDFs...</p>;

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
        {filteredPdfs.map((pdf) => (
          <div
            key={pdf._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => handlePdfClick(pdf)}
          >
            <img
              src={pdf.imgurl}
              alt={pdf.name}
              className="w-full h-40 object-contain rounded mb-2"
            />
            <h3 className="text-center font-normal text-sm">{pdf.desc}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
