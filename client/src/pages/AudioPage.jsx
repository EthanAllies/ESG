import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.json';

export default function AudioPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [audios, setAudios] = useState([]);
    const [selectedAudioUrl, setSelectedAudioUrl] = useState(null); // State to store the selected audio URL
    const [selectedAudioName, setSelectedAudioName] = useState(''); // State to store the selected audio name

    useEffect(() => {
        fetchAudios();
    }, []);

    async function fetchAudios() {
        const httpResponse = await axios.get(`${config.api_url}/docs`);
        setAudios(httpResponse.data);
    }

    const filteredAudios = audios.filter(audio =>
        audio.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAudioClick = (audio) => {
        setSelectedAudioUrl(audio.audiourl); // Set the URL of the selected audio
        setSelectedAudioName(audio.name); // Set the name of the selected audio
    };

    return (
        <div className="flex flex-col items-center w-full h-full p-4 bg-white">
            {/* Heading */}
            <h1 className="text-3xl font-semibold mb-4">Audios</h1>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search Audios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-3/4 md:w-1/2 border-gray-200 p-2 drop-shadow-md rounded-full mb-6 text-center"
            />

            {/* Conditional rendering of the selected audio name and iframe */}
            {selectedAudioUrl && (
                <div className="w-3/4 md:w-1/2 mb-4 text-center">
                    <h2 className="text-xl font-semibold mb-2">{selectedAudioName}</h2> {/* Display audio name */}
                    <iframe
                        src={selectedAudioUrl}
                        className="w-full h-20 bg-white rounded"
                        allow="autoplay"
                        title="Audio Player"
                    ></iframe>
                </div>
            )}

            {/* Audio grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredAudios.map(audio => (
                    <div
                        key={audio._id}
                        className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
                        onClick={() => handleAudioClick(audio)}
                    >
                        <img src={audio.imgurl} alt={audio.name} className="w-full h-40 object-contain rounded mb-2" />
                        <h3 className="text-center font-normal text-sm">{audio.desc}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
