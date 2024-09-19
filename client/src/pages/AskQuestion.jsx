import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import config from "../config.json";

export default function AskQuestion() {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { currentUser, dbUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault(); // Stop page from refreshing

    // Validate that both a category and a question are selected/entered
    if (category.trim() === "" || question.trim() === "") {
      setError("Please select a category and enter a valid question.");
      return;
    }

    console.log("Submitted question:", { category, question });

    await axios.post(`${config.api_url}/question`, {
      email: dbUser.email, // Replace with the user's email
      question: question, // User's question
      category: category, // User's selected category
    });

    // Reset form and show success message
    setIsSubmitted(true);
    setCategory("");
    setQuestion("");
    setError("");
  }

  const categories = [
    "Science",
    "Feedback",
    "Technical Issues",
    "Communication",
    "Advice",
    "UCT",
    "General",
    "Other",
  ];
//handle change of Category
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
//handle Question change
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  // Reset the form to allow asking another question
  const askAnotherQuestion = () => {
    setIsSubmitted(false);
    setCategory("");
    setQuestion("");
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-5xl font-semibold mb-4">Ask a Question</h1>

      {isSubmitted ? (
        <div className="text-green-500 text-lg font-semibold mb-4">
          Your question has been submitted successfully!
          <div className="mt-4 flex flex-col justify-center items-center">
            <button
              onClick={askAnotherQuestion}
              className="btn-signup  "
            >
              Ask Another Question
            </button>
          </div>
        </div>
      ) : (
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Select a Category
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error ? "border-red-500" : ""
            }`}
          >
            <option value="">-- Select a Category --</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label
            className="block text-gray-700 text-sm font-bold mt-4 mb-2"
            htmlFor="question"
          >
            Your Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={handleQuestionChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error ? "border-red-500" : ""
            }`}
            rows="5"
            placeholder="Type your question here..."
          />
          {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}

          <button type="submit" className="btn-signup mt-2">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

