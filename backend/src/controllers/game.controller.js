import { Game } from "../models/game.model.js";
import { User } from "../models/user.model.js";

// CREATE a new game entry
const createGame = async (req, res) => {
  try {
    const { truths, lie, title } = req.body;
    if (!truths || truths.length !== 2 || !lie) {
      return res.status(400).json({ message: "Provide 2 truths and 1 lie" });
    }

    const game = await Game.create({
      user: req.user._id,
      title,
      truths,
      lie
    });

    return res.status(201).json({ message: "Game created successfully", game });
  } catch (err) {
    res.status(500).json({ message: "Error creating game", error: err.message });
  }
};

// GET all games
const getAllGames = async (req, res) => {
  try {
    const games = await Game.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Error fetching games", error: err.message });
  }
};

// GET one game by ID
const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate("user", "username");
    if (!game) return res.status(404).json({ message: "Game not found" });

    // Shuffle statements
    const statements = [...game.truths, game.lie].sort(() => Math.random() - 0.5);

    res.json({ id: game._id, user: game.user, statements, lie: game.lie });
  } catch (err) {
    res.status(500).json({ message: "Error fetching game", error: err.message });
  }
};

// SUBMIT a guess
const guessGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { chosenStatement } = req.body;
    const userId = req.user._id;

    const game = await Game.findById(id);
    if (!game) return res.status(404).json({ message: "Game not found" });

    const isCorrect = chosenStatement === game.lie;

    // Update user stats
    const user = await User.findById(userId);
    if (user) {
      user.totalGuesses = (user.totalGuesses || 0) + 1;
      if (isCorrect) user.correctGuesses = (user.correctGuesses || 0) + 1;
      await user.save();
    }

    res.status(200).json({ isCorrect, lie: game.lie });
  } catch (error) {
    res.status(500).json({ message: "Error submitting guess", error: error.message });
  }
};

// LEADERBOARD based on users
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().lean();

    const leaderboard = users.map(u => ({
      username: u.username,
      totalGuesses: u.totalGuesses || 0,
      correctGuesses: u.correctGuesses || 0,
      accuracy: u.totalGuesses > 0 ? ((u.correctGuesses / u.totalGuesses) * 100).toFixed(1) : 0
    }));

    leaderboard.sort((a, b) => b.accuracy - a.accuracy);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaderboard", error: err.message });
  }
};

export { createGame, getAllGames, getGameById, guessGame, getLeaderboard };
