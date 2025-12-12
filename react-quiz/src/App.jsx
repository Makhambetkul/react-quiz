import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import QuizPage from "./pages/QuizPage";
import Review from "./components/Review";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import Navbar from "./components/Navbar";
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import AboutUs from "./pages/AboutUs";


export default function App() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("https://quiz-api-kqm9.onrender.com/quizzes")
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/about" element={<AboutUs />} />
        <Route path="/quizzes/:id/details" element={<QuestionDetailsPage />} />

        
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />

        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route path="/" element={<HomePage quizzes={quizzes} />} />

        
        <Route path="/quizzes/:quizId/categories" element={<CategoryPage />} />

        
        <Route
          path="/quizzes/:quizId/categories/:categoryId"
          element={<QuizPage />}
        />

        
        <Route path="/review" element={<Review />} />

        
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
}
