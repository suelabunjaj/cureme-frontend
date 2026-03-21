import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function History() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please log in to view saved history.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/questions/history", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setHistory(data.data);
        } else {
          setMessage(data.message || "Failed to load history.");
        }
      } catch (error) {
        setMessage("Failed to connect to backend.");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="page-center">
      <div className="card card-wide">
        <h2 className="page-title">History</h2>

        {message && <p className="message error">{message}</p>}

        {history.length > 0 ? (
          <div className="history-list">
            {history.map((item) => (
              <div key={item.id} className="history-item">
                <div className="section-label">Question</div>
                <p>{item.question_text}</p>

                <div className="section-label">Answer</div>
                <ReactMarkdown>{item.ai_response}</ReactMarkdown>
              </div>
            ))}
          </div>
        ) : (
          !message && <p className="message">No history found yet.</p>
        )}
      </div>
    </div>
  );
}

export default History;