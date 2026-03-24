import React, { useState } from "react";
import PetalLoader from "../components/PetalLoader";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("API URL:", process.env.REACT_APP_API_URL);

  const handleRegister = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Account created successfully! Redirecting...");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register error:", error);
      setMessage("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PetalLoader />} {/* ✅ CORRECT PLACE */}

      <div className="page-center">
        <div className="card">
          <h2 className="page-title">Register</h2>

          <input
            className="form-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button className="primary-button" onClick={handleRegister}>
            Register
          </button>

          {message && (
            <p
              className={`message ${
                message.includes("successfully") ? "success" : "error"
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

export default Register;