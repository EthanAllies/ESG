import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config.json';

export default function PdfPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        fetchPdfs();
    }, []);

    async function fetchPdfs() {
        setLoading(true); // Set loading to true when fetch starts
        try {
            const httpResponse = await axios.get(`${config.api_url}/docs`);
            setPdfs(httpResponse.data);
            setLoading(false); // Set loading to false when fetch is complete
        } catch (error) {
            console.error("Error fetching PDFs:", error);
            setLoading(false); // Set loading to false on error
        }
    }

    // Filter PDFs based on search term in both name and desc
    const filteredPdfs = pdfs.filter(pdf =>
        pdf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePdfClick = (pdf) => {
        console.log("Selected PDF:", pdf);
        navigate(`/pdf-viewer/${encodeURIComponent(pdf.url)}`);
    };

    return (
        <div className="flex flex-col items-center w-full h-full p-4 bg-white">
            <h1 className="text-3xl font-semibold mb-4">Chapters</h1>
            <input
                type="text"
                placeholder="Search Chapters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-3/4 md:w-1/2 border-gray-200 p-2 drop-shadow-md rounded-full mb-6 text-center"
            />

            {/* Show loading message if PDFs are still loading */}
            {loading ? (
                <p className="text-lg font-medium">Loading chapters, please wait...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredPdfs.map(pdf => (
                        <div
                            key={pdf._id}
                            className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
                            onClick={() => handlePdfClick(pdf)}
                        >
                            <img src={pdf.imgurl} alt={pdf.name} className="w-full h-40 object-contain rounded mb-2" />
                            <h2 className="text-center font-semibold text-md mb-2">{pdf.name}</h2> {/* Display PDF name */}
                            <h3 className="text-center font-normal text-sm">{pdf.desc}</h3> {/* Display PDF description */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}