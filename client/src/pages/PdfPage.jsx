import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config.json';

export default function PdfPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pdfs, setPdfs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPdfs();
    }, []);

    async function fetchPdfs() {
        const httpResponse = await axios.get(`${config.api_url}/docs`);
        setPdfs(httpResponse.data);
    }

    const filteredPdfs = pdfs.filter(pdf =>
        pdf.name.toLowerCase().includes(searchTerm.toLowerCase())
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
}
