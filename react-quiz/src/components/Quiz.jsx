import { useState } from "react";
import QuestionCard from "./QuestionCard";
import '../styles/Quiz.css';


export default function Quiz({ quiz, onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const current = quiz.questions[index];

  const handleSelect = (option) => {
    if (!selected) {
      setSelected(option);
    }
  };

  const handleNext = () => {
    let newScore = score;
    if (selected === current.correctAnswer) {
      newScore++;
    }

    if (index + 1 < quiz.questions.length) {
      setIndex(index + 1);
      setSelected(null);
      setScore(newScore);
    } else {
      onFinish(newScore, quiz.questions.length);
    }
  };

  return (
    <div className="quiz">
      <QuestionCard
        question={current.question}
        options={current.options}
        selected={selected}
        correctAnswer={current.correctAnswer}
        onSelect={handleSelect}
      />
      <button
        onClick={handleNext}
        disabled={!selected}
        className="next"
      >
        {index + 1 === quiz.questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
