import { useEffect, useState, useCallback } from "react";
import useDebouncedValue from "../hooks/useDebouncedValue";
import "../styles/Review.css";

export default function Review() {
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 400);

  const [results, setResults] = useState([]);

  
  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("quizResult"));

    if (result && result.quiz && result.quiz.questions) {
      setQuiz(result.quiz);
      setScore(result.score);
      setTotal(result.total);
    }
  }, []);

  
  const searchAPI = useCallback(async () => {
    if (!debouncedQuery.trim() || !quiz) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://quiz-api-kqm9.onrender.com/search?query=${encodeURIComponent(
          debouncedQuery
        )}`
      );

      const data = await res.json();

      const questionResults = data.filter((r) => r.type === "question");

      const merged = questionResults
        .map((found) => {
          return quiz.questions.find(
            (q) => q.id === found.id || q.question === found.question
          );
        })
        .filter(Boolean);

      setResults(merged);
    } catch (err) {
      console.error("Search API error:", err);
    }
  }, [debouncedQuery, quiz]);

  useEffect(() => {
    searchAPI();
  }, [searchAPI]);

  
  if (!quiz) return <p>Loading...</p>;

  const toDisplay = query.trim() ? results : quiz.questions;

  const handleRestart = () => {
    localStorage.removeItem("quizResult");
    window.location.href = "/";
  };

  return (
    <div className="review">
      <div className="result">
        <h2>{quiz.title} — Review</h2>
        <p>You scored {score} out of {total}</p>
      </div>

      <input
        type="text"
        placeholder="Search question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search"
      />

      {query && (
        <p className="results-count">
          🔎 Found <strong>{toDisplay.length}</strong> question
          {toDisplay.length !== 1 && "s"}
        </p>
      )}

      <div className="review-list">
        {toDisplay.map((q, i) => (
          <div key={i} className="question-block">
            <p><strong>{i + 1}. {q.question}</strong></p>

            <ul>
              {q.options.map((opt, j) => (
                <li
                  key={j}
                  className={opt === q.correctAnswer ? "correct" : ""}
                >
                  {opt}
                </li>
              ))}
            </ul>

            <p className="answer">
              <em>Correct answer: {q.correctAnswer}</em>
            </p>
          </div>
        ))}
      </div>

      <button onClick={handleRestart} className="back">
        Back to quizzes
      </button>
    </div>
  );
}
