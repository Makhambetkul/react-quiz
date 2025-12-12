import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";

import useDebouncedValue from "../hooks/useDebouncedValue";

import "../styles/QuizSelector.css";
import "../styles/Review.css";

export default function QuizSelector({ quizzes }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const { isFavorite, toggle } = useFavorites();

  
  const debouncedQuery = useDebouncedValue(query, 400);

  
  const searchAPI = useCallback(async () => {
    if (!debouncedQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://quiz-api-kqm9.onrender.com/search?query=${encodeURIComponent(
          debouncedQuery
        )}`
      );

      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Search API error:", err);
      setSearchResults([]);
    }
  }, [debouncedQuery]);

  
  useEffect(() => {
    searchAPI();
  }, [searchAPI]);

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

      {query && (
        <p className="results-count">
          🔎 Found <strong>{searchResults.length}</strong> result
          {searchResults.length !== 1 && "s"} for "<em>{query}</em>"
        </p>
      )}

      <ul className="quiz-list">
        {query && searchResults.length > 0 ? (
          searchResults.map((result) =>
            result.type === "quiz" ? (
              <li key={result.id} className="quiz-item">
                <button
                  className="quiz-button"
                  onClick={() => navigate(`/quizzes/${result.id}/categories`)}
                >
                  {result.title}
                </button>

                <button
                  className="details-button"
                  onClick={() => navigate(`/quizzes/${result.id}/details`)}
                >
                  Details
                </button>

                <button
                  className={`details-button ${
                    isFavorite(result.id) ? "favorited" : "not-favorited"
                  }`}
                  onClick={() =>
                    toggle({
                      id: result.id,
                      title: result.title,
                    })
                  }
                >
                  {isFavorite(result.id) ? "❤️" : "🤍"}
                </button>
              </li>
            ) : (
              <li key={`q-${result.id}`} className="quiz-item">
                <p>
                  <strong>Found in question:</strong> {result.question}
                </p>

                <button
                  className="quiz-button"
                  onClick={() =>
                    navigate(`/quizzes/${result.quizId}/categories`)
                  }
                >
                  Go to quiz
                </button>

                <button
                  className="details-button"
                  onClick={() =>
                    navigate(`/quizzes/${result.quizId}/details`)
                  }
                >
                  Details
                </button>
              </li>
            )
          )
        ) : query ? (
          <p className="no-results">No results found</p>
        ) : (
          quizzes.map((q) => (
            <li key={q.id} className="quiz-item">
              <button
                className="quiz-button"
                onClick={() => navigate(`/quizzes/${q.id}/categories`)}
              >
                {q.title}
              </button>

              <button
                className="details-button"
                onClick={() => navigate(`/quizzes/${q.id}/details`)}
              >
                Details
              </button>

              <button
                className={`details-button ${
                  isFavorite(q.id) ? "favorited" : "not-favorited"
                }`}
                onClick={() => toggle(q)}
              >
                {isFavorite(q.id) ? "❤️" : "🤍"}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
