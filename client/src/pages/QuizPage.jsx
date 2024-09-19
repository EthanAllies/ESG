import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Removed useNavigate
import QuizProgressCard from "../components/QuizProgressCard";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import config from "../config.json";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, dbUser } = useAuth(); // Access user data

  async function fetchQuizzes() {
    try {
      const httpResponse = await axios.get(`${config.api_url}/quizzes`);
      console.log("Fetched quizzes:", httpResponse.data);
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
  }, [dbUser]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-start h-screen">
        <p className="text-lg font-medium">Loading quizzes, please wait...</p>
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="p-5 text-center">
      {currentUser ? (
        <h1 className="font-bold text-4xl mb-8">
          Quizzes for {dbUser?.displayName || "User"}
        </h1>
      ) : (
        <div className="p-5 text-center">
          <h1 className="text-4xl mb-8 font-bold">Please Sign In</h1>
          <p>You need to sign in or create an account to view the quizzes</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {!currentUser ? (
          <p></p>
        ) : (
          quizzes.map((quiz) => {
            const userQuizScore = dbUser?.scores?.find(
              (score) => String(score.quiz_id) === String(quiz.quiz_id)
            );

            const score = userQuizScore ? userQuizScore.score : 0;

            return (
              <div key={quiz.quiz_id} className="w-full">
                <Link to={`/quiz/${quiz.quiz_id}`}>
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
