// src/components/CategorySelector.jsx
import '../styles/QuizSelector.css';

export default function CategorySelector({ quiz, onSelectCategory, onBack }) {
  if (!quiz || !quiz.categories) {
    return <div>Loading categories...</div>;
  }
  console.log("Selected Show:", quiz);

  return (
    <div className="quiz-selector">
      <h1>Select a Character from "{quiz.title}"</h1>

      <ul className="quiz-list">
        {quiz.categories.map((category) => (
          <li key={category.id} className="quiz-item">
            <button className="quiz-button" onClick={() => onSelectCategory(category.id)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      <button className="ansbbb" onClick={onBack}>← Back to Shows</button>
    </div>
  );
}

