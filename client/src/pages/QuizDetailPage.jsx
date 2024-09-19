import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For extracting URL parameters and navigation
import axios from "axios"; // For making HTTP requests
import { useAuth } from "../context/AuthContext"; // get User data
import config from "../config.json";

const QuizDetailPage = () => {
  const { quizId } = useParams(); // Extract the quizId from the URL parameters
  const { dbUser } = useAuth(); // Access user data
  const [quiz, setQuiz] = useState(null); // Hold quiz details
  const [loading, setLoading] = useState(true); // Track loading status
  const [error, setError] = useState(null); // Track errors
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  // Function to fetch the user's current score for a quiz from the server using studentId and quizId
  const fetchCurrentScore = async (studentId, quizId) => {
    try {
      const response = await axios.get(`${config.api_url}/get-score`, {
        params: {
          studentId,
          quizId,
        },
      });

      console.log("Fetched score:", response.data.score);

      return response.data.score; // Fetched score
    } catch (error) {
      console.error("Error fetching current score:", error);
      return null;
    }
  };

  // Function to submit the user's new quiz score to the server
  async function submitQuizScore(studentId, quizId, newScore) {
    const currentScore = await fetchCurrentScore(studentId, quizId); // Fetch the user's current score to compare

    // Only update the score if the new score is higher than the current one
    if (currentScore === null || newScore > currentScore) {
      try {
        const response = await axios.patch(`${config.api_url}/update-score`, {
          studentId,
          quizId,
          newScore,
        });
        console.log("Score update response:", response.data);
      } catch (error) {
        console.error("Error updating score:", error);
      }
    } else {
      console.log(
        "New score is not higher than the current score. No update made."
      ); // Log if no update is made due to a lower score
    }
  }

  // Fetch the quiz details when the page loads
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(`${config.api_url}/quizzes/${quizId}`); // Fetch quiz details from the database
        setQuiz(response.data);
      } catch (err) {
        console.error("Error fetching quiz details:", err);
        setError("Failed to fetch quiz details.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz(); // Call the fetchQuiz function
  }, [quizId]); // Re-run the effect if quizId changes

  // Handle the user's selection of an answer option
  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers, // Copy the previous answers
      [questionId]: option, // Update the selected answer for the given question
    }));
  };

  // Handle the form submission when the user completes the quiz
  const handleSubmit = async () => {
    if (!quiz) return; // Exit early if quiz data is not available

    const totalQuestions = quiz.questions.length; // Get the total number of questions
    let correctAnswers = 0;

    // Loop through the quiz questions to check the user's answers
    quiz.questions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question.question_id]; // Get the selected answer
      if (
        selectedAnswer === question.correct_answer || // Check if the selected answer matches the correct answer
        question.correct_answer === "" // If correct_answer in database is blank then all answers are correct
      ) {
        correctAnswers += 1; // Increment the correct answer count
      }
    });

    // Calculate the quiz score as a percentage
    const percentage = (correctAnswers / totalQuestions) * 100;
    setScore(percentage);

    // Submit the quiz score if it's higher than the current score
    await submitQuizScore(dbUser._id, quizId, percentage);

    // Redirect the user to the QuizPage after submitting the quiz
    navigate(`/quiz`);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-start h-screen">
        <p className="text-lg font-medium">Loading quiz, please wait...</p>{" "}
      </div>
    );

  if (error) return <p>{error}</p>; // Display error message

  if (!quiz) return <p>Quiz not found.</p>; // Show message if quiz is not found

  return (
    <div className="p-5">
      {/* Back Button for navigating to the QuizPage */}
      <button
        onClick={() => navigate("/quiz")} // Redirect to QuizPage when clicked
        className=" top-4 left-2 text-blue-500 hover:text-blue-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div className="text-center">
        <h1 className="text-4xl mb-4 font-bold">{quiz.quiz_name}</h1>{" "}
      </div>
      <div>
        {/* Map over the quiz questions and display them */}
        {quiz.questions.map((question) => (
          <div key={question.question_id} className="m-12 mb-6 text-left">
            <h2 className="text-xl mb-2 font-semibold">
              {question.question_text} {/* Display the question text */}
            </h2>
            <div className="space-y-2">
              {/* Map over the options for each question */}
              {question.options.map((option, index) => (
                <div
                  key={`${question.question_id}-option-${index}`} // Unique key for each option
                  className="flex items-center"
                >
                  <input
                    type="radio"
                    id={`question-${question.question_id}-option-${index}`} // Unique ID for each option
                    name={`question-${question.question_id}`}
                    value={option}
                    checked={selectedAnswers[question.question_id] === option} // Check if the option is selected
                    onChange={() =>
                      handleOptionChange(question.question_id, option)
                    }
                    className="mr-2"
                  />
                  <label
                    htmlFor={`question-${question.question_id}-option-${index}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full">
        {/* Submit button for submitting the quiz */}
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:text-blue-700"
          onClick={handleSubmit}
        >
          Save & Submit
        </button>
      </div>
    </div>
  );
};

export default QuizDetailPage;
