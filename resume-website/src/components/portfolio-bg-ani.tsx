// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Github,
//   Mail,
//   FileText,
//   ChevronDown,
//   Code2,
//   Briefcase,
//   User,
//   MessageSquare,
//   Home,
// } from "lucide-react";

// const PerformantSparkle = ({ color = "#4169E1", size = 4, style = {} }) => (
//   <span
//     className="block absolute animate-sparkle pointer-events-none"
//     style={{
//       width: `${size}px`,
//       height: `${size}px`,
//       borderRadius: "50%",
//       backgroundColor: color,
//       boxShadow: `0 0 ${size * 2}px ${size / 2}px ${color}`,
//       ...style,
//     }}
//   />
// );

// const Portfolio = () => {
//   const [activeSection, setActiveSection] = useState("home");
//   const [isNavVisible, setIsNavVisible] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [sparkles, setSparkles] = useState([]);

//   // Dynamic sparkle generation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newSparkle = {
//         id: Date.now(),
//         x: Math.random() * window.innerWidth,
//         y: Math.random() * window.innerHeight,
//         size: Math.random() * 4 + 2,
//         color: `hsl(${220 + Math.random() * 40}, 100%, ${
//           60 + Math.random() * 20
//         }%)`,
//       };

//       setSparkles((current) => [...current, newSparkle]);
//       setTimeout(() => {
//         setSparkles((current) => current.filter((s) => s.id !== newSparkle.id));
//       }, 5000);
//     }, 200);

//     return () => clearInterval(interval);
//   }, []);

//   // Mouse tracking for interactive effects
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//       setIsNavVisible(window.innerWidth - e.clientX < 100);
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-slate-900 overflow-hidden">
//       {/* Dynamic Background */}
//       <div className="fixed inset-0 overflow-hidden">
//         {/* Base Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#0A1845] via-[#1E3A8A] to-[#0A1845]" />

//         {/* Animated Mesh Gradient */}
//         <div className="absolute inset-0 opacity-30">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-indigo-500/20 animate-gradient-shift" />
//           <div className="absolute inset-0 bg-gradient-to-tl from-blue-600/20 via-transparent to-purple-500/20 animate-gradient-shift-reverse" />
//         </div>

//         {/* Interactive Light Effect */}
//         <div
//           className="absolute w-[40vmax] h-[40vmax] rounded-full transition-transform duration-1000 ease-out pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(65,105,225,0.15) 0%, transparent 70%)",
//             transform: `translate(${mousePosition.x - 400}px, ${
//               mousePosition.y - 400
//             }px)`,
//           }}
//         />

//         {/* Floating Elements */}
//         <div className="absolute inset-0">
//           {/* Geometric Elements */}
//           <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-blue-500/20 animate-float-slow" />
//           <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-lg border border-indigo-500/20 animate-spin-slow transform rotate-45" />

//           {/* Glowing Orbs */}
//           <div className="absolute top-1/3 left-1/3 w-96 h-96">
//             <div className="absolute inset-0 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow" />
//             <div className="absolute inset-8 bg-indigo-500/10 rounded-full filter blur-2xl animate-pulse-slow-delay" />
//           </div>
//         </div>

//         {/* Dynamic Sparkles */}
//         {sparkles.map((sparkle) => (
//           <PerformantSparkle
//             key={sparkle.id}
//             color={sparkle.color}
//             size={sparkle.size}
//             style={{
//               left: sparkle.x,
//               top: sparkle.y,
//               transform: `scale(${Math.random() * 0.5 + 0.5})`,
//             }}
//           />
//         ))}

//         {/* Noise Texture Overlay */}
//         <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />

//         {/* Gradient Overlay for Content Readability */}
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/40" />
//       </div>

//       {/* Rest of your content (Navigation, Sections, etc.) remains the same... */}
//     </div>
//   );
// };

// export default Portfolio;
