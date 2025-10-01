import React,{useEffect} from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.js";

export default function Navbar() {
  const { checkAuth, user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleClick = async () => {
    await checkAuth();

    if (useAuthStore.getState().user) {
      navigate("/game");
    } else {
      navigate("/auth");
    }
  };

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo-name">Crimson Spare Studios Present</div>
        <div className="nav-buttons">
          {user ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={() => navigate("/leaderboard")}>
                Leaderboard
              </button>
            </>
          ) : (
            <>
              <button onClick={handleClick}>Login</button>
              <button onClick={handleClick}>Register</button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
