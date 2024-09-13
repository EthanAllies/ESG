// src/pages/QuizPage.jsx
import React from "react";
import QuizCard from "../components/QuizCard";
import "./QuizPage.css";
import { useAuth } from "../context/AuthContext";

const QuizPage = () => {

  const { currentUser, logout } = useAuth();

  // Mock data for quizzes
  const quizzes = [
    { title: "Welcome to the Student Guide", score: 70 },
    { title: "Culture Shock at UCT", score: 85 },
    { title: "Acing Exam Season", score: 100 },
    { title: "Succeed in Your First BSc Tests", score: 70 },
    { title: "Next-Level Time Management for Succeeding at UCT", score: 70 },
    { title: "Make the Most of Your Vac", score: 70 },
    { title: "So, How Does Your Brain Work", score: 100 },
    { title: "The Shape of Your Well-Being", score: 70 },
    { title: "Metacognition: Your Key to Success", score: 70 },
  ];

  return (
    <div className="quiz-page">
      <h1>Quizzes</h1>
      <div className="quiz-list">
        {quizzes.map ((quiz, index) => (
          <QuizCard
            key={index}
            title={quiz.title}
            score={quiz.score}
            link={quiz.link}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
