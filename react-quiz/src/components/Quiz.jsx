import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

export default function Quiz({ quiz, onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) {
      onFinish(score, quiz.questions.length, userAnswers);
    }
  }, [finished]); 

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  const current = quiz.questions[index];

  const handleSelect = (option) => {
    setSelected(option);
    setShowWarning(false);
  };

  const handleNext = () => {
    if (!selected) {
      setShowWarning(true);
      return;
    }

    const isCorrect = selected === current.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    const updatedAnswers = [
      ...userAnswers,
      {
        question: current.question,
        selectedAnswer: selected,
        correctAnswer: current.correctAnswer,
        options: current.options,
      }
    ];

    setScore(newScore);
    setUserAnswers(updatedAnswers);
    setSelected(null);

    if (index + 1 < quiz.questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true); 
    }
  };

  return (
    <div>
      <QuestionCard
        question={current.question}
        options={current.options}
        selected={selected}
        correctAnswer={current.correctAnswer}
        onSelect={handleSelect}
      />

      {showWarning && <p style={{ color: "red" }}>Please select an answer before continuing.</p>}

      <button onClick={handleNext} className="ansb">
        {index + 1 === quiz.questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
