"use client";

import { useState } from "react";

export default function Recommendations() {
  const [interest, setInterest] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interest }),
    });
    const data = await res.json();
    setRecommendations(data.text);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          What are you interested in?
          <input
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="e.g., AI, Frontend, Full-Stack"
          />
        </label>
        <button type="submit" disabled={isLoading}>
          Get Recommendations
        </button>
      </form>

      {recommendations && (
        <div>
          <h3>Recommendations:</h3>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
}
