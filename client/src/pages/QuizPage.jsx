import React from "react";
//import { Link } from "react-router-dom";
import QuizProgressCard from "../components/QuizProgressCard";

export default function QuizPage() {
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

  const quizzes = [
    {
      id: 1,
      title: "Welcome to the Student Guide",
      score: 70,
      description: "This is a student guide quiz.",
    },
    {
      id: 2,
      title: "Culture Shock at UCT",
      score: 85,
      description: "A quiz about adapting to UCT.",
    },
    {
      id: 3,
      title: "Acing Exam Season",
      score: 100,
      description: "Quiz on how to ace exams.",
    },
    // Add more quizzes as needed
  ];

  return (
    <div className="p-5 text-center">
      <h1 className="text-4xl mb-8">Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="w-full">
            {/* Link each quiz to its detail page */}
            {
              //<Link to={`/quiz/${quiz.id}`}>
            }
            <QuizProgressCard
              title={quiz.title}
              score={quiz.score}
              link={`/quiz/${quiz.id}`}
            />
            {
              //</Link}>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
