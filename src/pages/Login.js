import React, { useState } from "react";
import PetalLoader from "../components/PetalLoader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const API_URL = process.env.REACT_APP_API_URL;

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login successful! Redirecting...");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PetalLoader />} 
      <div className="page-center">
        <div className="card">
          <h2 className="page-title">Login</h2>

          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-button" onClick={handleLogin}>
            Login
          </button>

          {message && (
            <p
              className={`message ${
                message.includes("successful") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;