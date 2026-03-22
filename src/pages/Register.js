import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
console.log("API URL:", process.env.REACT_APP_API_URL);
 const handleRegister = async () => {
  try {
    const API_URL = process.env.REACT_APP_API_URL;

    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Account created successfully! Redirecting to Ask Question...");

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
    setMessage("Failed to connect to backend");
  }
};
  return (
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
          <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;