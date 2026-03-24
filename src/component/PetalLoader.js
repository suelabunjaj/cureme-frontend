import React from "react";
import "./PetalLoader.css";

function PetalLoader() {
  const petals = Array.from({ length: 16 });

  return (
    <div className="petal-loader-overlay">
      <div className="petal-loader-content">
        <div className="petal-loader-text">Loading...</div>
        {petals.map((_, index) => (
          <span
            key={index}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PetalLoader;