import React, { useEffect, useState } from "react";
import { useGameStore } from "../store/game.store.js";
import { useParams } from "react-router-dom";
import "../styles/PlayGame.css";

export default function PlayGame() {
  const { currentGame, fetchGameById, guessGame } = useGameStore();
  const { id } = useParams(); // game id from URL
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [statements, setStatements] = useState([]);

  useEffect(() => {
    const loadGame = async () => {
      const res = await fetchGameById(id);
      setStatements(res.statements); 
    };
    loadGame();
  }, [id, fetchGameById]);

  const handleGuess = async (index) => {
  if (selectedIndex !== null) return;
  setSelectedIndex(index);

  const chosenStatement = statements[index];
  const res = await guessGame(id, { chosenStatement });
  
  if (res.isCorrect) {
    setFeedback("Correct! ✅");
  } else {
    setFeedback(`Wrong! ❌ The lie was: "${res.lie}"`);
  }
};

  if (!currentGame) return <p>Loading game...</p>;

  return (
    <div className="play-game-container">
      <h1>{currentGame.title}</h1>
      <p>Click on the statement that you think is the lie!</p>

      <div className="options-container">
        {statements.map((statement, index) => (
          <div
            key={index}
            className={`option-card ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => handleGuess(index)}
          >
            {statement}
          </div>
        ))}
      </div>

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}
