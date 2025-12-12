import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/QuestionDetails.css";

export default function QuestionDetailsPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    fetch(`https://quiz-api-kqm9.onrender.com/quizzes/${id}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data));
  }, [id]);

  if (!quiz) return <p className="loading">Loading...</p>;

  return (
    <div className="quiz-details">
      <h1 className="quiz-title">{quiz.title} – Details</h1>

      {quiz.categories.map((category, idx) => (
        <div key={category.id} className="quiz-category">
          <h2 className="category-title">
            Category {idx + 1}: {category.name}
          </h2>

          <ul className="question-list">
            {category.questions.map((question) => (
              <li key={question.id} className="question-item">
                <p className="question-text">
                  <strong>Question:</strong> {question.question}
                </p>
                <p className="correct-answer">
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </p>
                {question.explanation && (
                  <p className="explanation">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                )}
                {question.difficulty && (
                  <p className="difficulty">
                    <strong>Difficulty:</strong> {question.difficulty}
                  </p>
                )}
                {question.image && (
                  <img
                    src={question.image}
                    alt="Question"
                    className="question-image"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
