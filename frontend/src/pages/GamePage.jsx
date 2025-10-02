import React, { useEffect } from "react";
import "../styles/GamePage.css";
import Navbar from "../components/Navbar.jsx";
import { useGameStore } from "../store/game.store.js";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.js";

export default function GamePage() {
  const { games, fetchGames, loading, error, fetchGameById } = useGameStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  //   useEffect(() => {
  //   console.log("Games from store:", games);
  // }, [games]);

  const handleGameClick = async (gameId) => {
    await fetchGameById(gameId);
    navigate(`/game/${gameId}`);
  };

  return (
    <div>
      <Navbar />
      <div className="game-container">
        <h1 className="game-title">
          Welcome to the Game{" "}
          <span className="username">{user?.username || "Guest"}</span> — click
          on the game you want to play
        </h1>

        <button className="create-btn" onClick={() => navigate("/create")}>
          Create Game
        </button>
        {loading && <p>Loading games...</p>}
        {error && <p className="error">{error}</p>}

        <div className="game-list">
          {games.length > 0
            ? games.map((game) => (
                <div
                  key={game._id}
                  className="game-card"
                  onClick={() => handleGameClick(game._id)}
                >
                  <h2>{game.title}</h2>
                  <p>Made By: {game.user?.username || "Unkown"}</p>
                </div>
              ))
            : !loading && <p>No games available yet.</p>}
        </div>
      </div>
    </div>
  );
}
