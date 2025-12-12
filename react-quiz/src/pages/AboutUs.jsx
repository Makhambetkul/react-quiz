import "../styles/AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
        <div className="ab">
      <p className="about-text">
        Welcome to our Quiz Adventure! 🎮✨  
        This project was created as a part of our React end-term assignment.
        Our goal is to make learning fun through interactive quizzes based on
        popular shows, characters, and adventures.
      </p>

      <p className="about-text">
        Here, you can explore quizzes, add them to favorites, check detailed
        answers, and track your progress. We focused on creating a smooth user
        experience using:
      </p>

      <ul className="about-list">
        <li>⚡ React + Hooks (useState, useEffect, custom hooks)</li>
        <li>🗂 Redux Toolkit for global state</li>
        <li>🔥 Firebase Authentication (Login / Signup)</li>
        <li>📄 Firestore (Favorites, Profile)</li>
        <li>🖼 Custom Profile Avatars</li>
        <li>🔍 Live Search using API + Debounce</li>
      </ul>

      <p className="about-text">
        We hope you enjoy the app as much as we enjoyed building it! 💛🌈
      </p>
      </div>
    </div>

  );
}
