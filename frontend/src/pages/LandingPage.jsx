import React from "react";
import "../styles/LandingPage.css";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.js";

export default function LandingPage() {
  const { checkAuth, user } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = async () => {
    await checkAuth();

    if (useAuthStore.getState().user) {
      navigate("/game");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="landingPage-container">
      <Navbar />
      <div className="landing-content">
        <button className="playnow-btn" onClick={handleClick}>
          Play Now
        </button>
      </div>
    </div>
  );
}
