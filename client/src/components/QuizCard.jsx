import React from "react";
import Badge from "./Badge";
import "./QuizCard.css";

const QuizCard = ({ title, score, link }) => {
  return (
    <div className="quiz-card">
      <h3>{title}</h3>
      <p className="score">Score: {score}%</p>

      {/* Conditional rendering: show Badge if score is 100, otherwise show progress bar */}
      {score === 100 ? (
        <Badge />
      ) : (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${score}%` }}></div>
        </div>
      )}

      <a href={link} className="quiz-link">
        Take Quiz
      </a>
    </div>
  );
};

export default QuizCard;
