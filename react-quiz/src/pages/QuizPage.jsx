import { useParams, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import Quiz from "../components/Quiz";

export default function QuizPage() {
  const { quizId, categoryId } = useParams();
  const [fetchedQuiz, setFetchedQuiz] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`https://quiz-api-kqm9.onrender.com/quizzes/${quizId}/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setFetchedQuiz({
          id: categoryId,
          title: data.character,
          questions: data.questions
        });
      });
  }, [quizId, categoryId]);

  const handleFinish = (score, total, answers) => {
    
    const resultToSave = {
      quiz: fetchedQuiz,
      score,
      total,
      userAnswers: answers
    };

    localStorage.setItem("quizResult", JSON.stringify(resultToSave));

    
    navigate("/review");
  };

  return fetchedQuiz ? (
    <Quiz quiz={fetchedQuiz} onFinish={handleFinish} />
  ) : (
    <p>Loading...</p>
  );
}
