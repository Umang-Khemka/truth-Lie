import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import LandingPage from "./pages/LandingPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import CreateGamePage from "./pages/CreateGamePage.jsx";
import PlayGame from "./pages/PlayGame.jsx";

function App() {



  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/game" element={<GamePage/>} />
          <Route path="/game/:id" element={<PlayGame/>} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/create" element={<CreateGamePage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
