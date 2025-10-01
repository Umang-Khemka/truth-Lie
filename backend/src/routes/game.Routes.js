import { Router } from "express";
import { createGame, getAllGames, getGameById, guessGame, getLeaderboard } from "../controllers/game.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createGame); 
router.get("/", authMiddleware, getAllGames);
router.get("/:id", authMiddleware, getGameById); 
router.post("/:id/guess", authMiddleware, guessGame); 
router.get("/leaderboard/all", getLeaderboard); 

export default router;
