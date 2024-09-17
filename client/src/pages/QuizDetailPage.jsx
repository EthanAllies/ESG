import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [score, setScore] = useState(null); // New state for storing the score

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

  const handleOptionClick = (questionId, option) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    if (!quiz) return;

    const totalQuestions = quiz.questions.length;
    let correctAnswers = 0;

    quiz.questions.forEach((question) => {
      console.log(selectedAnswers);
      const selectedAnswer = selectedAnswers[question.question_id];
      console.log(selectedAnswer);
      if (selectedAnswer === question.correct_answer) {
        correctAnswers += 1;
      }
    });

    // Calculate percentage
    const percentage = (correctAnswers / totalQuestions) * 100;
    setScore(percentage);
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div className="p-5 text-center">
      <h1 className="text-4xl mb-4">{quiz.quiz_name}</h1>
      <p className="text-2xl mb-4">
        Score: {score !== null ? `${score}%` : "Not submitted yet"}
      </p>
      <div>
        {quiz.questions.map((question) => (
          <div key={question.question_id} className="mb-6 text-left">
            <h2 className="text-xl mb-2">{question.question_text}</h2>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <button
                  key={`${question.question_id}-option-${index}`} // Unique key combining question_id and index
                  className={`w-full p-2 text-left border rounded ${
                    selectedAnswers[question.question_id] === option
                      ? "bg-gray-300"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    handleOptionClick(question.question_id, option)
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default QuizDetailPage;
