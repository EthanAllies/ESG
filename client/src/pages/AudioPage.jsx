import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

export default function AudioPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [audios, setAudios] = useState([]);
  const [selectedAudioUrl, setSelectedAudioUrl] = useState(null); // State to store the selected audio URL
  const [selectedAudioName, setSelectedAudioName] = useState(""); // State to store the selected audio name
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchAudios();
  }, []);

  async function fetchAudios() {
    setLoading(true); // Start loading before fetching data
    try {
      const httpResponse = await axios.get(`${config.api_url}/docs`);
      setAudios(httpResponse.data);
      setLoading(false); // Stop loading when data is fetched
    } catch (error) {
      console.error("Error fetching audios:", error);
      setLoading(false); // Stop loading on error
    }
  }

  // Filter audios based on search term in both name and desc
  const filteredAudios = audios.filter(
    (audio) =>
      audio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audio.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAudioClick = (audio) => {
    setSelectedAudioUrl(audio.audiourl); // Set the URL of the selected audio
    setSelectedAudioName(audio.name); // Set the name of the selected audio
  };

  const handleQuizClick = () => {
    navigate("/quiz"); // Navigate to the quizzes page
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

      {/* Show loading message if audios are still loading */}
      {loading ? (
        <p className="text-lg font-medium">Loading audios, please wait...</p>
      ) : (
        <>
          {/* Conditional rendering of the selected audio name and audio controls */}
          {selectedAudioUrl && (
            <div className="w-3/4 md:w-1/2 mb-4 text-center">
              <h2 className="text-xl font-semibold mb-2">
                "{selectedAudioName}"
              </h2>{" "}
              {/* Display audio name */}
              <audio
                controls
                src={selectedAudioUrl}
                className="w-full bg-white rounded mb-2" // Added margin-bottom to ensure space for the link
              >
                Your browser does not support the audio element.
              </audio>
              {/* Quiz link */}
              <button
                onClick={handleQuizClick}
                className="inline-block px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              >
                Go to Quiz
              </button>
            </div>
          )}

          {/* Audio grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredAudios.map((audio) => (
              <div
                key={audio._id}
                className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
                onClick={() => handleAudioClick(audio)}
              >
                <img
                  src={audio.imgurl}
                  alt={audio.name}
                  className="w-full h-40 object-contain rounded mb-2"
                />
                <h2 className="text-center font-semibold text-md mb-2">
                  {audio.name}
                </h2>{" "}
                {/* Display audio name */}
                <h3 className="text-center font-normal text-sm">
                  {audio.desc}
                </h3>{" "}
                {/* Display audio description */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
