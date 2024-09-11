import React from "react";

export default function QuizProgressCard({ title, score, link }) {
  return (
    <div className="quiz-card border border-gray-300 rounded-lg p-5 w-full text-center shadow-lg">
      <h3 className="quiz-title text-2xl mb-2">{title}</h3>
      <p className="score text-lg mb-2">Score: {score}%</p>

      {score === 100 ? (
        <div className="quiz-badge">Perfect Score!</div>
      ) : (
        <div className="progress-bar w-full h-2.5 bg-gray-200 rounded-full my-2 relative">
          <div
            className="progress h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${score}%` }}
          ></div>
        </div>
      )}

      <a
        href={link}
        className="link inline-block px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Take Quiz
      </a>
    </div>
  );
}
