import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AskQuestions from "./pages/AskQuestions";
import History from "./pages/History";

function App() {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <Router>
      <div className="app-shell">
        <h1 className="brand-title">cureME</h1>
        <p className="brand-subtitle">A gentle space for everyday health questions</p>

        <nav className="top-nav">
          <Link to="/" className="nav-link">Ask Question</Link>

          {!isLoggedIn && (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}

          <Link to="/history" className="nav-link">History</Link>

          {isLoggedIn && (
            <button
              className="nav-button"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<AskQuestions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;