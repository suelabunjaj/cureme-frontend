import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import PetalLoader from "../components/PetalLoader";

function AskQuestions() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const isGuest = !token;

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      return;
    }

    const currentQuestion = question;
    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL;

      const endpoint = token
        ? `${API_URL}/api/questions`
        : `${API_URL}/api/questions/guest`;

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          question_text: currentQuestion,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const aiText = data.data?.ai_response || "No answer returned.";

        setMessages((prev) => [
          ...prev,
          { type: "question", text: currentQuestion },
          { type: "answer", text: aiText },
        ]);

        setQuestion("");
      } else {
        setMessages((prev) => [
          ...prev,
          { type: "question", text: currentQuestion },
          { type: "answer", text: data.message || "Something went wrong." },
        ]);
      }
    } catch (error) {
      console.error("Ask question error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "question", text: currentQuestion },
        { type: "answer", text: "Failed to connect to backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PetalLoader />}

      <div className="page-center">
        <div className="card card-wide">
          <h2 className="page-title">Ask a Question</h2>

          {isGuest && (
            <p className="guest-banner">
              You can ask questions as a guest, but your history will not be
              saved. Create an account or log in to keep your past questions and
              answers.
            </p>
          )}

          {messages.length > 0 && (
            <div className="response-box">
              <h3 className="section-label">Conversation</h3>

              {messages.map((msg, index) => (
                <div key={index} style={{ marginBottom: "12px" }}>
                  <strong>{msg.type === "question" ? "You:" : "AI:"}</strong>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}

              <p className="disclaimer">
                ⚠️ This information is for general purposes only and is not
                medical advice. Please consult a qualified healthcare
                professional.
              </p>
            </div>
          )}

          <input
            className="form-input"
            type="text"
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleAskQuestion();
              }
            }}
          />

          <button
            className="primary-button"
            onClick={handleAskQuestion}
            disabled={loading}
          >
            {loading ? "Asking..." : "Ask AI"}
          </button>
        </div>
      </div>
    </>
  );
}

export default AskQuestions;