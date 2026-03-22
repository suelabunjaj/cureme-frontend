import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function History() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please log in to view saved history.");
        setLoading(false);
        return;
      }

      try {
        const API_URL = process.env.REACT_APP_API_URL;

        const res = await fetch(`${API_URL}/api/questions/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setHistory(data.data || []);
        } else {
          setMessage(data.message || "Failed to load history.");
        }
      } catch (error) {
        console.error("History error:", error);
        setMessage("Failed to connect to backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="page-center">
      <div className="card card-wide">
        <h2 className="page-title">History</h2>

        {loading && <p>Loading...</p>}

        {message && <p className="message error">{message}</p>}

        {!loading && history.length > 0 && (
          <div className="history-list">
            {history.map((item, index) => (
              <div key={item.id || index} className="history-item">
                <div className="section-label">Question</div>
                <p>{item.question_text}</p>

                <div className="section-label">Answer</div>
                <ReactMarkdown>
                  {item.ai_response || "No answer found."}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        )}

        {!loading && history.length === 0 && !message && (
          <p className="message">No history found yet.</p>
        )}
      </div>
    </div>
  );
}

export default History;