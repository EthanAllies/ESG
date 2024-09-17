import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuizProgressCard from "../components/QuizProgressCard";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import config from "../config.json";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dbUser } = useAuth();

  async function fetchQuizzes() {
    try {
      const httpResponse = await axios.get(`${config.api_url}/quizzes`);
      console.log("Fetched quizzes:", httpResponse.data); // Debugging line
      setQuizzes(httpResponse.data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      setError("Failed to fetch quizzes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>{error}</p>;

  // Mock data for quizzes
  /*const quizzes = [
    { title: "Welcome to the Student Guide", score: 70 },
    { title: "Culture Shock at UCT", score: 85 },
    { title: "Acing Exam Season", score: 100 },
    { title: "Succeed in Your First BSc Tests", score: 70 },
    { title: "Next-Level Time Management for Succeeding at UCT", score: 70 },
    { title: "Make the Most of Your Vac", score: 70 },
    { title: "So, How Does Your Brain Work", score: 100 },
    { title: "The Shape of Your Well-Being", score: 70 },
    { title: "Metacognition: Your Key to Success", score: 70 },
  ];*/

  return (
    <div className="p-5 text-center">
      <h1 className="text-4xl mb-8">
        Quizzes for {dbUser?.displayName || "User"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {quizzes.length === 0 ? (
          <p>No quizzes available</p>
        ) : (
          quizzes.map((quiz) => {
            // Check if dbUser and quizScores are defined
            const userQuizScore = dbUser?.scores?.find(
              (score) => String(score.quiz_id) === String(quiz.quiz_id) // Normalize to string
            );

            // Extract score, or default to null if not found
            const score = userQuizScore ? userQuizScore.score : 0;

            return (
              <div key={quiz.quiz_id} className="w-full">
                <h1>{}</h1>
                <Link to={`/quiz/${quiz.quiz_id}`}>
                  <QuizProgressCard
                    title={quiz.quiz_name}
                    score={score}
                    link={`/quiz/${quiz.quiz_id}`}
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
