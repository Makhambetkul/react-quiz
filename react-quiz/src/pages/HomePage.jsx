import QuizSelector from "../components/QuizSelector";

export default function HomePage({ quizzes, onSelect }) {
  return (
    <QuizSelector quizzes={quizzes} onSelect={onSelect} />
  );
}
