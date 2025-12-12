import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const regex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    if (!regex.test(password)) return "Password too weak";
    if (password !== repeat) return "Passwords do not match";
    return null;
  };

  const handleSignup = async () => {
    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input type="password" placeholder="Repeat Password" onChange={e => setRepeat(e.target.value)} />
      <button onClick={handleSignup} className="logb">Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
