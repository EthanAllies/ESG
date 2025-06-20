import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation between pages
import { useAuth } from "../context/AuthContext"; // Custom hook to get auth-related data
import axios from "axios"; // For making HTTP requests to backend
import config from "../config.json"; // Configuration file for API endpoints
import { useNavigate } from "react-router-dom"; // For programmatic navigation

export default function DashBoardPage() {
  // State variables to store quiz data, loading state, and error message
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, dbUser } = useAuth(); // Get currentUser and dbUser from authentication context
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle button click for opening the first PDF
  const handle1ButtonClick = () => {
    const pdfUrl = encodeURIComponent(
      "https://firebasestorage.googleapis.com/v0/b/esga-e2e04.appspot.com/o/CultureShockAtUCT.pdf?alt=media&token=89e1e3bf-f7ef-4429-8b51-932a98b4762b"
    );
    navigate(`/pdf-viewer/${pdfUrl}`); // Navigate to the PDF viewer with the encoded PDF URL
  };

  // Function to handle button click for opening the second PDF
  const handle2ButtonClick = () => {
    const pdfUrl = encodeURIComponent(
      "https://firebasestorage.googleapis.com/v0/b/esga-e2e04.appspot.com/o/SoHowDoesYourBrainWork.pdf?alt=media&token=4c4ec68e-2c3d-4e15-9947-b411d6ce7e1a"
    );
    navigate(`/pdf-viewer/${pdfUrl}`); // Navigate to the PDF viewer with the encoded PDF URL
  };

  // Function to fetch quizzes from the backend API
  async function fetchQuizzes() {
    try {
      const httpResponse = await axios.get(`${config.api_url}/quizzes`); // Get quizzes from API
      console.log("Fetched quizzes:", httpResponse.data);
      setQuizzes(httpResponse.data); // Update state with fetched quizzes
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      setError("Failed to fetch quizzes."); // Set error message in case of failure
    } finally {
      setLoading(false); // Stop loading once the request is complete
    }
  }

  // Fetch quizzes once the dbUser is available (i.e., after authentication)
  useEffect(() => {
    if (dbUser) {
      fetchQuizzes(); // Fetch quizzes if dbUser is present
    }
  }, [dbUser]); // Re-run the effect when dbUser changes

  // Helper function to determine if a badge should be greyed out
  const getBadgeClass = (quizId) => {
    const userQuizScore = dbUser?.scores?.find(
      (score) => String(score.quiz_id) === String(quizId)
    ); // Find the score for the given quiz
    return userQuizScore?.score === 100
      ? "opacity-100 " // Full visibility if the score is 100
      : "opacity-40 grayscale"; // Greyed out if score is not 100
  };

  // Display loading state while data is being fetched
  if (loading)
    return (
      <div className="flex flex-col items-center justify-start h-screen">
        <p className="text-lg font-medium">Loading dashboard, please wait...</p>
      </div>
    );

  // Display error message if there's a problem fetching quizzes
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Welcome Banner */}
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center">
          <div className="relative h-60 w-4/5 mt-11 rounded-2xl drop-shadow-xl object-contain bg-gradient-to-r from-regal-blue from-10% to-blue-300 flex flex-row justify-between items-center overflow-hidden">
            <h className="absolute z-10 text-white text-3xl font-semibold tracking-wide drop-shadow-2xl max-w-full transform transition-transform duration-500 sm:translate-x-16 md:translate-x-12 lg:translate-x-8 xl:translate-x-6">
              {currentUser
                ? `Welcome Back, ${dbUser.displayName}!`
                : "Welcome To The Science Student Guide!"}
            </h>
            <img
              src="userDash.png"
              alt="User Dashboard"
              className="object-cover h-60 w-auto z-0 flex-shrink-0 ml-auto opacity-95"
            />
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="w-full flex">
        <div className="flex flex-col w-4/6 h-5/6 mr-5 ml-10 my-auto">
          <h1 className="mb-1 text-lg font-bold underline underline-offset-2">
            Progress
          </h1>
          <div className="h-60 w-full rounded-lg mx-auto outline outline-slate-100 drop-shadow-lg bg-white flex flex-col">
            <div className="w-full h-1/2 flex flex-row justify-center items-center space-x-4">
              {/* Render badges for quizzes 1-5 */}
              {[1, 2, 3, 4, 5].map((quizId) => (
                <div
                  key={quizId}
                  className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center"
                >
                  <img
                    src={`badge${quizId}.png`} // Badge image
                    alt={`Badge ${quizId}`}
                    className={`object-cover h-16 w-auto z-0 ${getBadgeClass(
                      quizId
                    )}`} // Conditionally grey out badge based on score
                  />
                </div>
              ))}
            </div>
            <div className="w-full h-1/2 flex flex-row justify-center items-center space-x-4">
              {/* Render badges for quizzes 6-9 */}
              {[6, 7, 8, 9].map((quizId) => (
                <div
                  key={quizId}
                  className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center"
                >
                  <img
                    src={`badge${quizId}.png`} // Badge image
                    alt={`Badge ${quizId}`}
                    className={`object-cover h-16 w-auto z-0 ${getBadgeClass(
                      quizId
                    )}`} // Conditionally grey out badge based on score
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interesting Fact Section */}
        <div className="flex flex-col w-2/6 h-5/6 mr-10 ml-5 my-auto">
          <h1 className="mb-1 text-lg font-bold underline underline-offset-2">
            Interesting Fact
          </h1>
          <div className="h-60 w-full bg-white outline outline-slate-100 rounded-lg drop-shadow-lg flex flex-col justify-center items-center">
            <div className="px-6 space-y-1">
              <h1 className="font-bold">What is the Pomodoro Technique?</h1>
              <h2 className="line-clamp-4">
                The Pomodoro Technique, a popular time management method,
                involves working for 25-minute intervals followed by 5-minute
                breaks. This method can help improve focus and productivity by
                reducing mental fatigue.
              </h2>
              <a
                href="https://todoist.com/productivity-methods/pomodoro-technique"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-regal-blue"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs and Suggested Chapters Section */}
      <div className="w-full flex">
        <div className="flex flex-col w-2/6 h-5/6 mr-5 ml-10 my-auto">
          <h1 className="mb-1 text-lg font-bold underline underline-offset-2">
            FAQs
          </h1>
          <div className="h-60 w-full bg-white outline outline-slate-100 rounded-lg drop-shadow-lg flex flex-col justify-center items-center">
            <div className="px-6 space-y-1">
              <h1 className="font-bold">
                What are the best ways to prepare for exams?
              </h1>
              <h2 className="line-clamp-4">
                Effective preparation includes reviewing lecture notes, using
                flashcards, forming study groups, and practicing past exam
                questions.
              </h2>
              <Link to="/faqs" className="font-semibold text-regal-blue">
                See More
              </Link>
            </div>
          </div>
        </div>

        {/* Suggested Chapters with Buttons to View PDFs */}
        <div className="flex flex-col w-4/6 h-5/6 mr-10 ml-5 my-auto">
          <h1 className="mb-1 text-lg font-bold underline underline-offset-2">
            Suggested Chapters
          </h1>
          <div className="h-full w-full bg-white rounded-lg mx-auto outline outline-slate-100 drop-shadow-lg flex flex-row">
            <div className="w-1/2 h-full flex">
              <div className="w-4/5 h-full flex justify-center items-center">
                <img
                  src="/Chapter1.png"
                  alt="Chapter 1"
                  className="w-48 h-auto rounded-lg"
                />
              </div>

              <div className="w-1/2 h-full flex justify-center items-center">
                <button
                  onClick={handle1ButtonClick} // Handle button click for Chapter 1
                  className="bg-regal-blue w-5/6 py-2 drop-shadow-lg text-white font-semibold hover:bg-slate-700 rounded-3xl"
                >
                  View
                </button>
              </div>
            </div>

            <div className="w-1/2 h-full flex">
              <div className="w-4/5 h-full flex justify-center items-center">
                <img
                  src="/Chapter6.png"
                  alt="Chapter 6"
                  className="w-48 h-auto rounded-lg"
                />
              </div>

              <div className="w-1/2 h-full flex justify-center items-center">
                <button
                  onClick={handle2ButtonClick} // Handle button click for Chapter 6
                  className="bg-regal-blue w-5/6 py-2 drop-shadow-lg text-white font-semibold hover:bg-slate-700 rounded-3xl"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
