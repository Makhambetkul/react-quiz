import { useState } from "react";
import '../styles/QuizSelector.css';


export default function QuizSelector({ quizzes, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = quizzes.filter((q) =>
    q.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="quiz-selector">
      <h1>Select a Quiz</h1>

      <input
        type="text"
        placeholder="Search quiz by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <ul className="quiz-list">
        {filtered.length > 0 ? (
          filtered.map((q) => (
            <li key={q.id} className="quiz-item">
              <button className="quiz-button" onClick={() => onSelect(q)}>
                {q.title}
              </button>
            </li>
          ))
        ) : (
          <p className="no-results">No quizzes found</p>
        )}
      </ul>
    </div>
  );
}
