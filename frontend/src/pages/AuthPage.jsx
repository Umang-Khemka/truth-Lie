import React, { useState } from "react";
import "../styles/Auth.css";
import { useAuthStore } from "../store/auth.store.js";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let success = false;
    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await register(username, email, password);
    }

    if (success) {
      navigate("/game");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn" disabled={loading} onClick={handleSubmit}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          {isLogin ? "Don't have an account?" : "Already have a account?"}{" "}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
