import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/game.store.js";
import "../styles/CreateGame.css";

export default function CreateGamePage() {
  const [title, setTitle] = useState("");
  const [truth1, setTruth1] = useState("");
  const [truth2, setTruth2] = useState("");
  const [lie, setLie] = useState("");
  const [error, setError] = useState("");

  const { createGame } = useGameStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !truth1 || !truth2 || !lie) {
      setError("All fields are required");
      return;
    }

    try {
      await createGame({
        title,
        truths: [truth1, truth2],
        lie,
      });
      navigate("/game"); // redirect back to games page
    } catch (err) {
      setError("Failed to create game");
    }
  };

  return (
    <div className="create-game-container">
      <h1>Create a New Game</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="create-game-form">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Game title"
          />
        </label>

        <label>
          Truth 1:
          <input
            type="text"
            value={truth1}
            onChange={(e) => setTruth1(e.target.value)}
            placeholder="Enter first truth"
          />
        </label>

        <label>
          Truth 2:
          <input
            type="text"
            value={truth2}
            onChange={(e) => setTruth2(e.target.value)}
            placeholder="Enter second truth"
          />
        </label>

        <label>
          Lie:
          <input
            type="text"
            value={lie}
            onChange={(e) => setLie(e.target.value)}
            placeholder="Enter the lie"
          />
        </label>

        <button type="submit">Create Game</button>
      </form>
    </div>
  );
}
