import { useState } from "react";
import '../styles/Review.css';


export default function Review({ quiz, score, total, onRestart }) {
  const [query, setQuery] = useState("");

  const filtered = quiz.questions.filter(q =>
    q.question.toLowerCase().includes(query.toLowerCase())
  );

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

      <div className="review-list">
        {filtered.map((q, i) => (
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
            <p><em className="answer">Correct answer: {q.correctAnswer}</em></p>
          </div>
        ))}
      </div>

      <button onClick={onRestart} className="back">Back to quizzes</button>
    </div>
  );
}
