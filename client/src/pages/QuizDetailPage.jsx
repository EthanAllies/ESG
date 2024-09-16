import { useParams } from "react-router-dom";
import { useState } from "react";

const QuizDetailPage = () => {
  const { quizId } = useParams(); // Get quizId from URL
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const quizzes = [
    {
      id: 1,
      title: "Welcome to the Student Guide",
      score: 70,
      description: "This is a student guide quiz.",
      questions: [
        {
          id: 1,
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          answer: "Paris",
        },
        {
          id: 2,
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          answer: "4",
        },
      ],
    },
    {
      id: 2,
      title: "Culture Shock at UCT",
      score: 85,
      description: "A quiz about adapting to UCT.",
      questions: [
        {
          id: 1,
          question: "What is UCT?",
          options: [
            "University of Cape Town",
            "University of Chicago",
            "University of California",
            "University College London",
          ],
          answer: "University of Cape Town",
        },
      ],
    },
    {
      id: 3,
      title: "Acing Exam Season",
      score: 100,
      description: "Quiz on how to ace exams.",
      questions: [
        {
          id: 1,
          question: "What is a good study technique?",
          options: [
            "Cramming",
            "Spaced repetition",
            "Studying the night before",
            "Passive reading",
          ],
          answer: "Spaced repetition",
        },
      ],
    },
  ];

  // Find the quiz by its id
  const quiz = quizzes.find((q) => q.id === parseInt(quizId));

  const handleOptionClick = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  // If quiz is not found, show a message
  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div className="p-5 text-center">
      <h1 className="text-4xl mb-4">{quiz.title}</h1>
      <p className="text-lg mb-8">{quiz.description}</p>
      <p className="text-2xl mb-4">Score: {quiz.score}%</p>
      <div>
        {quiz.questions.map((question) => (
          <div key={question.id} className="mb-6 text-left">
            <h2 className="text-xl mb-2">{question.question}</h2>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-2 text-left border rounded ${
                    selectedAnswers[question.id] === option
                      ? "bg-gray-300"
                      : "bg-white"
                  }`}
                  onClick={() => handleOptionClick(question.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDetailPage;
