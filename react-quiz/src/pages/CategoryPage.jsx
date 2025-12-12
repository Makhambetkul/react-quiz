import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CategorySelector from "../components/CategorySelector";

export default function CategoryPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    fetch(`https://quiz-api-kqm9.onrender.com/quizzes/${quizId}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data))
      .catch((error) => console.error("Error loading quiz:", error));
  }, [quizId]);

  const handleSelectCategory = (categoryId) => {
    navigate(`/quizzes/${quizId}/categories/${categoryId}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <CategorySelector
      quiz={quiz}
      onSelectCategory={handleSelectCategory}
      onBack={handleBack}
    />
  );
}
