import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.Routes.js";
import gameRoutes from "./routes/game.Routes.js";

import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/games", gameRoutes);

// Production setup
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  const indexPath = path.join(frontendPath, "index.html");
  
  console.log("🔍 NODE_ENV:", process.env.NODE_ENV);
  console.log("🔍 __dirname:", __dirname);
  console.log("🔍 Frontend path:", frontendPath);
  console.log("🔍 Index.html exists:", existsSync(indexPath));
  
  app.use(express.static(frontendPath));
  
  app.get("*", (req, res) => {
    console.log("📍 Catch-all route hit:", req.url);
    res.sendFile(indexPath);
  });
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});