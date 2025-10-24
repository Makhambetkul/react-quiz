const BASE_URL = "http://localhost:4000/api";

// Получить список всех тестов
export async function getQuizzes() {
  const res = await fetch(`${BASE_URL}/quizzes`);
  if (!res.ok) throw new Error("Failed to fetch quizzes");
  return res.json();
}

// Получить конкретный тест по ID
export async function getQuizById(id) {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`);
  if (!res.ok) throw new Error("Quiz not found");
  return res.json();
}
