import React, { useEffect } from "react";
import "../styles/Leaderboard.css";
import Navbar from "../components/Navbar.jsx";
import { useGameStore } from "../store/game.store.js";

export default function Leaderboard() {
  const { fetchLeaderboard, leaderboard, loading, error } = useGameStore();

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div>
      <Navbar />
      <div className="leaderboard-container">
        <h1>Leaderboard</h1>
        {loading && <p>Loading leaderboard...</p>}
        {error && <p className="error">{error}</p>}

        {leaderboard.length > 0 ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Total Guesses</th>
                <th>Correct Guesses</th>
                <th>Accuracy (%)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={user.username}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.totalGuesses}</td>
                  <td>{user.correctGuesses}</td>
                  <td>{user.accuracy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No leaderboard data yet.</p>
        )}
      </div>
    </div>
  );
}
