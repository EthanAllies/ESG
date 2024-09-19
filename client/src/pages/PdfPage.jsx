import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.json";

export default function PdfPage() {
  // State to store the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");
  // State to store the list of PDFs fetched from the server
  const [pdfs, setPdfs] = useState([]);
  // Loading state to show a message while PDFs are being fetched
  const [loading, setLoading] = useState(true);
  // useNavigate hook to programmatically navigate to other routes
  const navigate = useNavigate();

  // useEffect hook to fetch the PDFs when the component mounts
  useEffect(() => {
    fetchPdfs();
  }, []);

  // Function to fetch PDFs from the server
  async function fetchPdfs() {
    setLoading(true); // Set loading to true when the fetch starts
    try {
      // Send a GET request to fetch PDFs from the API
      const httpResponse = await axios.get(`${config.api_url}/docs`);
      // Set the response data to the pdfs state
      setPdfs(httpResponse.data);
      setLoading(false); // Set loading to false once data is successfully fetched
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  }

  // Filter the list of PDFs based on the search term (checks both name and description)
  const filteredPdfs = pdfs.filter(
    (pdf) =>
      pdf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle the click event when a PDF is selected
  const handlePdfClick = (pdf) => {
    console.log("Selected PDF:", pdf);
    // Navigate to the PDF viewer page, passing the PDF URL as a parameter
    navigate(`/pdf-viewer/${encodeURIComponent(pdf.url)}`);
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 bg-white">
      {/* Heading of the page */}
      <h1 className="text-3xl font-semibold mb-4">Chapters</h1>

      {/* Search input field for filtering PDFs */}
      <input
        type="text"
        placeholder="Search Chapters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
        className="w-3/4 md:w-1/2 border-gray-200 p-2 drop-shadow-md rounded-full mb-6 text-center"
      />

      {/* Conditional rendering: show loading message if PDFs are still loading */}
      {loading ? (
        <p className="text-lg font-medium">Loading chapters, please wait...</p>
      ) : (
        // Grid layout to display the filtered PDFs
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Map over the filtered PDFs and display each one */}
          {filteredPdfs.map((pdf) => (
            <div
              key={pdf._id} // Unique key for each PDF
              className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
              onClick={() => handlePdfClick(pdf)} // Call handlePdfClick when a PDF is clicked
            >
              {/* Image for the PDF */}
              <img
                src={pdf.imgurl}
                alt={pdf.name}
                className="w-full h-40 object-contain rounded mb-2"
              />
              {/* Display PDF name */}
              <h2 className="text-center font-semibold text-md mb-2">
                {pdf.name}
              </h2>
              {/* Display PDF description */}
              <h3 className="text-center font-normal text-sm">{pdf.desc}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
