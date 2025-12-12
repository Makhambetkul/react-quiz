import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";

import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(user);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nn">Home</Link>
      <Link to="/about" className="nn">About</Link>
      {isLoggedIn ? (
        <>
          <Link to="/favorites" className="nn">Favorites</Link>
          <Link to="/profile" className="nn">Profile</Link>


          <button onClick={handleLogout} className="nn logout-btn">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nn">Login</Link>
          <Link to="/signup" className="nn">Signup</Link>
        </>
      )}
    </nav>
  );
}
