import React from "react";
import QuizProgressCard from "../components/QuizProgressCard";

export default function QuizPage() {
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
    <div className="p-5 text-center">
      <h1 className="text-4xl mb-8">Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {quizzes.map((quiz, index) => (
          <div key={index} className="w-full">
            <QuizProgressCard
              title={quiz.title}
              score={quiz.score}
              link={quiz.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
