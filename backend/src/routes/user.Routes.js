import {Router} from "express";
import {login, register, logout, me} from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout",logout);
router.get("/me", authMiddleware, me);

export default router;