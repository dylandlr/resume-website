import React, { useState, useEffect, useCallback } from "react";

const NUM_STARS = 250; // Increased number of stars
const ANIMATION_DURATION = 50000; // Slightly faster rotation

import { useTheme } from "next-themes";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  pastPositions: {
    x: number;
    y: number;
    z: number;
    time: number;
  }[];
  maxTrailLength: number;
  opacity: number;
  screenX?: number;
  screenY?: number;
  color: string;
  animationDelay: number;
}

const StarField = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const { theme } = useTheme();

  const generateStars = useCallback(() => {
    return Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 100, // Added
      size: 0.1 + Math.random() * 0.5,
      speed: 0.1 + Math.random() * 0.5, // Added
      opacity: 0.3 + Math.random() * 0.7,
      pastPositions: [], // Added
      maxTrailLength: 10, // Added
      animationDelay: Math.random() * -ANIMATION_DURATION,
      color:
        Math.random() > 0.8
          ? theme === "dark"
            ? "white"
            : "dark"
          : Math.random() > 0.7
          ? theme === "dark"
            ? "white"
            : "dark"
          : theme === "dark"
          ? "whit"
          : "dark",
    }));
  }, []);
  useEffect(() => {
    setStars(generateStars());
  }, [generateStars]);

  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 -z-10 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-50"
      }`}>
      <svg
        className="w-full h-full absolute inset-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor={theme === "dark" ? "#64B5F6" : "#2196F3"}
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor={theme === "dark" ? "#1E1B4B" : "#1E1B4B"}
              stopOpacity="0"
            />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <style>
            {`
              @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
              }
              @keyframes rotate {
                from { transform: rotate(0deg) translateX(1px) rotate(0deg); }
                to { transform: rotate(360deg) translateX(1px) rotate(-360deg); }
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.2; }
                50% { transform: scale(1.05); opacity: 0.3; }
              }
            `}
          </style>
        </defs>

        {/* Animated background elements */}
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="url(#starGlow)"
          style={{
            animation: "pulse 8s infinite ease-in-out",
          }}
        />

        {/* Stars with enhanced effects */}
        <g filter="url(#glow)">
          {stars.map((star, i) => (
            <circle
              key={i}
              cx={star.x}
              cy={star.y}
              r={star.size}
              fill={star.color}
              opacity={star.opacity}
              style={{
                animation: `
                  twinkle ${2000 + Math.random() * 3000}ms infinite ease-in-out,
                  rotate ${ANIMATION_DURATION}ms infinite linear
                `,
                animationDelay: `${star.animationDelay}ms`,
                transform: `scale(${1 + Math.random() * 0.2})`,
              }}
            />
          ))}
        </g>

        {/* Additional decorative elements */}
        <g opacity="0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <circle
              key={`orbit-${i}`}
              cx="50"
              cy="50"
              r={15 + i * 15}
              fill="none"
              stroke="url(#starGlow)"
              strokeWidth="0.1"
              opacity="0.3"
              style={{
                animation: `rotate ${
                  ANIMATION_DURATION * (1 + i * 0.2)
                }ms infinite linear reverse`,
              }}
            />
          ))}
        </g>
      </svg>

      {/* Modern gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent"
        style={{
          mixBlendMode: "soft-light",
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default StarField;
