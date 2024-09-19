import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import config from "../config.json";

const QuizDetailPage = () => {
  const { quizId } = useParams(); // Get quizId from URL
  const { dbUser } = useAuth(); // Access user data from AuthContext
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Fetch the user's current score for the quiz from the database
  const fetchCurrentScore = async (studentId, quizId) => {
    try {
      const response = await axios.get(`${config.api_url}/get-score`, {
        params: {
          studentId,
          quizId,
        },
      });

      console.log("Fetched score:", response.data.score); // Debugging

      return response.data.score;
    } catch (error) {
      console.error("Error fetching current score:", error);
      return null;
    }
  };

  // Function to submit the score if it's higher than the existing score
  async function submitQuizScore(studentId, quizId, newScore) {
    console.log(studentId, quizId);
    const currentScore = await fetchCurrentScore(studentId, quizId); // Fetch current score

    // Only update the score if the new score is higher than the current score
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
      );
    }
  }

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axios.get(`${config.api_url}/quizzes/${quizId}`);
        setQuiz(response.data);
      } catch (err) {
        console.error("Error fetching quiz details:", err);
        setError("Failed to fetch quiz details.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: option, // Ensure unique selection per question
    }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    const totalQuestions = quiz.questions.length;
    let correctAnswers = 0;

    quiz.questions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question.question_id];
      if (selectedAnswer === question.correct_answer) {
        correctAnswers += 1;
      }
    });

    // Calculate percentage
    const percentage = (correctAnswers / totalQuestions) * 100;
    setScore(percentage);

    // Call submitQuizScore to send the data to the server only if the new score is higher
    await submitQuizScore(dbUser._id, quizId, percentage);

    // Navigate to QuizPage
    navigate(`/quiz`);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-start h-screen">
        <p className="text-lg font-medium">Loading quiz, please wait...</p>
      </div>
    );

  if (error) return <p>{error}</p>;

  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div className="p-5">
      {/* Back Button */}
      <button
        onClick={() => navigate("/quiz")} // Navigate to QuizPage
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
      {/* Centered Heading */}
      <div className="text-center">
        <h1 className="text-4xl mb-4 font-bold">{quiz.quiz_name}</h1>
      </div>
      <div>
        {quiz.questions.map((question) => (
          <div key={question.question_id} className="m-12 mb-6 text-left">
            <h2 className="text-xl mb-2 font-semibold">
              {question.question_text}
            </h2>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div
                  key={`${question.question_id}-option-${index}`}
                  className="flex items-center"
                >
                  <input
                    type="radio"
                    id={`question-${question.question_id}-option-${index}`}
                    name={`question-${question.question_id}`} // Unique name per question
                    value={option}
                    checked={selectedAnswers[question.question_id] === option}
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
