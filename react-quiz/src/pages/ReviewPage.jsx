import { Link } from "react-router-dom";

export default function ReviewPage({ userAnswers }) {
  if (!userAnswers || userAnswers.length === 0) {
    return <p>No answers to review.</p>;
  }

  return (
    <div>
      <h2>Review Answers</h2>
      <ul>
        {userAnswers.map((answer, index) => (
          <li key={index}>
            <p><strong>Q:</strong> {answer.question}</p>
            <p><strong>Your Answer:</strong> {answer.selectedAnswer}</p>
            <p><strong>Correct Answer:</strong> {answer.correctAnswer}</p>

          </li>
        ))}
      </ul>
    </div>
  );
}
