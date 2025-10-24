import { useState, useEffect } from "react";
import QuizSelector from "./components/QuizSelector";
import Quiz from "./components/Quiz";
import Review from "./components/Review";
import { getQuizzes } from "./api";
import './App.css';


export default function App() {
  const [stage, setStage] = useState("select"); // select | quiz | review
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getQuizzes()
      .then(setQuizzes)
      .catch((err) => {
        console.error("Failed to load quizzes:", err);
      });
  }, []);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setStage("quiz");
  };

  const finishQuiz = (finalScore, totalQ) => {
    setScore(finalScore);
    setTotal(totalQ);
    setStage("review");
  };

  const restart = () => {
    setStage("select");
    setSelectedQuiz(null);
    setScore(0);
  };

  if (stage === "select") {
    return <QuizSelector quizzes={quizzes} onSelect={startQuiz} />;
  }

  if (stage === "quiz") {
    return <Quiz quiz={selectedQuiz} onFinish={finishQuiz} />;
  }

  if (stage === "review") {
    return (
      <Review
        quiz={selectedQuiz}
        score={score}
        total={total}
        onRestart={restart}
      />
    );
  }
}
