import axios from "axios";

const API = axios.create({
  baseURL: "https://quiz-api-kqm9.onrender.com",
});

export const getQuizzes = async () => {
  const res = await API.get("/quizzes");
  return res.data;
};

export const getQuizById = async (id) => {
  const res = await API.get(`/quiz-by-category/${id}`);
  return res.data;
};
