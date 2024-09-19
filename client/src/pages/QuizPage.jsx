// Import necessary React hooks and libraries
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuizProgressCard from "../components/QuizProgressCard"; // Import the QuizProgressCard component
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook for accessing user data
import axios from "axios"; // Import axios for making HTTP requests
import config from "../config.json"; // Import the configuration file

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]); // Holds the list of quizzes fetched from the server
  const [loading, setLoading] = useState(true); // Tracks whether data is being loaded
  const [error, setError] = useState(null); // Holds any errors that occur during data fetching
  const { currentUser, dbUser } = useAuth(); // Destructure user-related data from the authentication context

  // Function to fetch quizzes from the server
  async function fetchQuizzes() {
    try {
      const httpResponse = await axios.get(`${config.api_url}/quizzes`); //ask backend to get quizzes
      console.log("Fetched quizzes:", httpResponse.data);
      setQuizzes(httpResponse.data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      setError("Failed to fetch quizzes.");
    } finally {
      setLoading(false);
    }
  }

  // useEffect allows page to fetch quizzes when the page loads or when dbUser changes
  useEffect(() => {
    fetchQuizzes();
  }, [dbUser]); //ensures fetchQuizzes is called when dbUser changes

  //show loading or error states
  if (loading)
    return (
      <div className="flex flex-col items-center justify-start h-screen">
        <p className="text-lg font-medium">Loading quizzes, please wait...</p>{" "}
      </div>
    );
  if (error) return <p>{error}</p>; // Display error message if error

  return (
    <div className="p-5 text-center">
      {currentUser ? ( // If the user is logged in, show a welcome message
        <h1 className="font-bold text-4xl mb-8">
          Quizzes for {dbUser?.displayName || "User"}{" "}
        </h1>
      ) : (
        // If the user is not logged in, prompt them to sign in
        <div className="p-5 text-center">
          <h1 className="text-4xl mb-8 font-bold">Please Sign In</h1>
          <p>You need to sign in or create an account to view the quizzes</p>
        </div>
      )}

      {/* Display the quizzes in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {!currentUser ? (
          <p></p> // If no user is logged in, show an empty message
        ) : (
          // Map over the quizzes and display them as QuizProgressCard components
          quizzes.map((quiz) => {
            // Find the user's score for each quiz
            const userQuizScore = dbUser?.scores?.find(
              (score) => String(score.quiz_id) === String(quiz.quiz_id)
            );

            // If a score is found, use it; otherwise, default to 0
            const score = userQuizScore ? userQuizScore.score : 0;

            // Return a quiz card for each quiz
            return (
              <div key={quiz.quiz_id} className="w-full">
                {/* Link to the quiz detail page */}
                <Link to={`/quiz/${quiz.quiz_id}`}>
                  {/* Pass quiz details to the QuizProgressCard component */}
                  <QuizProgressCard
                    title={quiz.quiz_name}
                    score={score}
                    link={`/quiz/${quiz.quiz_id}`}
                    quizId={quiz.quiz_id}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
