import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

export default function AudioPage() {
  // State to store the search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to store the list of audios fetched from the API
  const [audios, setAudios] = useState([]);
  // State to store the URL of the selected audio for playback
  const [selectedAudioUrl, setSelectedAudioUrl] = useState(null);
  // State to store the name of the selected audio
  const [selectedAudioName, setSelectedAudioName] = useState("");
  // State to manage the loading state while fetching data
  const [loading, setLoading] = useState(true);
  // Initialize the useNavigate hook for navigation
  const navigate = useNavigate();

  // Effect hook to fetch the audios when the component mounts
  useEffect(() => {
    fetchAudios();
  }, []);

  // Function to fetch the audio data from the API
  async function fetchAudios() {
    setLoading(true); // Set loading to true while the API call is made
    try {
      const httpResponse = await axios.get(`${config.api_url}/docs`); // Fetch audio data
      setAudios(httpResponse.data); // Store the audio data in the state
      setLoading(false); // Stop loading once data is fetched
    } catch (error) {
      console.error("Error fetching audios:", error); // Log any errors during the fetch
      setLoading(false); // Stop loading even if an error occurs
    }
  }

  // Filter the audios based on the search term (filter by audio name or description)
  const filteredAudios = audios.filter(
    (audio) =>
      audio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audio.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle when an audio is clicked, updating the selected audio state
  const handleAudioClick = (audio) => {
    setSelectedAudioUrl(audio.audiourl); // Set the selected audio's URL for playback
    setSelectedAudioName(audio.name); // Set the selected audio's name
  };

  // Function to navigate to the quiz page when the quiz button is clicked
  const handleQuizClick = () => {
    navigate("/quiz"); // Navigate to the quiz page
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 bg-white">
      {/* Page heading */}
      <h1 className="text-3xl font-semibold mb-4">Audios</h1>

      {/* Search bar to filter audios */}
      <input
        type="text"
        placeholder="Search Audios..."
        value={searchTerm} // Bind the search term state to the input
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term as the user types
        className="w-3/4 md:w-1/2 border-gray-200 p-2 drop-shadow-md rounded-full mb-6 text-center"
      />

      {/* Display loading message if the audio data is still being fetched */}
      {loading ? (
        <p className="text-lg font-medium">Loading audios, please wait...</p>
      ) : (
        <>
          {/* Render audio player and details if an audio is selected */}
          {selectedAudioUrl && (
            <div className="w-3/4 md:w-1/2 mb-4 text-center">
              {/* Display the name of the selected audio */}
              <h2 className="text-xl font-semibold mb-2">
                "{selectedAudioName}"
              </h2>
              {/* HTML5 audio element to play the selected audio */}
              <audio
                controls
                src={selectedAudioUrl} // Set the audio source to the selected audio's URL
                className="w-full bg-white rounded mb-2"
              >
                Your browser does not support the audio element.
              </audio>
              {/* Button to navigate to the quiz page */}
              <button
                onClick={handleQuizClick} // Handle quiz button click
                className="inline-block px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
              >
                Go to Quiz
              </button>
            </div>
          )}

          {/* Render the grid of audios */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredAudios.map((audio) => (
              <div
                key={audio._id} // Unique key for each audio block
                className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
                onClick={() => handleAudioClick(audio)} // Handle click on an audio block
              >
                {/* Display the audio's image */}
                <img
                  src={audio.imgurl}
                  alt={audio.name} // Alt text for accessibility
                  className="w-full h-40 object-contain rounded mb-2"
                />
                {/* Display the audio's name */}
                <h2 className="text-center font-semibold text-md mb-2">
                  {audio.name}
                </h2>
                {/* Display the audio's description */}
                <h3 className="text-center font-normal text-sm">
                  {audio.desc}
                </h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
