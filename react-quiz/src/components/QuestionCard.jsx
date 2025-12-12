import "../styles/QuestionCard.css";


export default function QuestionCard({
  question,
  options,
  selected,
  correctAnswer,
  onSelect
}) {
  return (
    <div className="question-card">
      <h2>{question}</h2>

      <div className="option-list">
        {options.map((opt) => {
          let className = "option-button";

          if (selected) {
            if (opt === correctAnswer) {
              className += " correct"; 
            } else if (opt === selected) {
              className += " wrong";   
            }
          }

          return (
            <button
              key={opt}
              className={className}
              onClick={() => {
                if (!selected) {
                  onSelect(opt);
                }
              }}
              disabled={!!selected} 
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <p className={selected === correctAnswer ? "correct" : "wrong"}>
          {selected === correctAnswer
            ? "Correct!"
            : `Wrong! Correct answer is: ${correctAnswer}`}
        </p>
      )}
    </div>
  );
}
