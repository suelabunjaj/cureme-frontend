import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function AskQuestions() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const isGuest = !token;

  const handleAskQuestion = async () => {
  if (!question.trim()) {
    setResponse("Please enter a question.");
    return;
  }

  if (!token) {
    setResponse("Please log in to save and view your questions.");
    return;
  }

  setLoading(true);
  setResponse("");

  try {
    const API_URL = process.env.REACT_APP_API_URL;

    const res = await fetch(`${API_URL}/api/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question_text: question,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setResponse(data.data?.ai_response || "No answer returned.");

      setQuestion("");
    } else {
      setResponse(data.message || "Something went wrong.");
    }
  } catch (error) {
    console.error("Ask question error:", error);
    setResponse("Failed to connect to backend.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page-center">
      <div className="card card-wide">
        <h2 className="page-title">Ask a Question</h2>

        {isGuest && (
          <p className="guest-banner">
            You are continuing as a guest. Your question history will not be
            saved for later review.
          </p>
        )}

        <input
          className="form-input"
          type="text"
          placeholder="Ask your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button className="primary-button" onClick={handleAskQuestion}>
          {loading ? "Asking..." : "Ask AI"}
        </button>

        {response && (
          <div className="response-box">
            <h3 className="section-label">AI Response</h3>
            <ReactMarkdown>{response}</ReactMarkdown>

            <p className="disclaimer">
              ⚠️ This information is for general purposes only and is not medical
              advice. Please consult a qualified healthcare professional.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AskQuestions;