// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useTheme } from "next-themes";

// const DynamicStarField = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const bgCanvasRef = useRef<HTMLCanvasElement>(null);
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
//   const animationRef = useRef<number | null>(null);
//   const starsRef = useRef<Star[]>([]);
//   const startTimeRef = useRef<number>(Date.now());
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Ensure we only render after mounting to avoid hydration issues
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   class Star {
//     x: number;
//     y: number;
//     z: number;
//     size: number;
//     speed: number;
//     pastPositions: Array<{ x: number; y: number; z: number; time: number }>;
//     maxTrailLength: number;
//     opacity: number;
//     screenX?: number;
//     screenY?: number;
//     screenSize?: number;

//     constructor(width: number, height: number) {
//       this.x = Math.random() * width;
//       this.y = Math.random() * height;
//       this.z = Math.random() * width;
//       this.size = Math.random() * 1.5 + 0.5;
//       this.speed = Math.random() * 0.4 + 0.2;
//       this.pastPositions = [];
//       this.maxTrailLength = 15;
//       this.opacity = Math.random() * 0.3 + 0.7;
//     }

//     move(width: number, height: number, mouseX: number, mouseY: number): void {
//       if (this.screenX && this.screenY && this.z) {
//         this.pastPositions.unshift({
//           x: this.screenX,
//           y: this.screenY,
//           z: this.z,
//           time: Date.now(),
//         });

//         if (this.pastPositions.length > this.maxTrailLength) {
//           this.pastPositions.pop();
//         }
//       }

//       this.z = this.z - this.speed;

//       if (this.z <= 0) {
//         this.x = Math.random() * width;
//         this.y = Math.random() * height;
//         this.z = width;
//         this.pastPositions = [];
//       }

//       const depth = this.z / width;
//       const mouseDiffX = mouseX - width / 2;
//       const mouseDiffY = mouseY - height / 2;

//       this.screenX =
//         (this.x - width / 2) * (1 / depth) +
//         width / 2 +
//         mouseDiffX * depth * 0.1;
//       this.screenY =
//         (this.y - height / 2) * (1 / depth) +
//         height / 2 +
//         mouseDiffY * depth * 0.1;
//       this.screenSize = Math.max(0, (1 - depth) * 3 * this.size);
//     }

//     getColor(alpha = 1): string {
//       // Use theme to determine color
//       const color = theme === "dark" ? "255, 255, 255" : "10, 10, 10";
//       return `rgba(${color}, ${alpha * this.opacity})`;
//     }
//   }

//   useEffect(() => {
//     if (!mounted) return;
//     const canvas = canvasRef.current;
//     const bgCanvas = bgCanvasRef.current;
//     if (!canvas || !bgCanvas) return;

//     const ctx = canvas.getContext("2d", { alpha: true });
//     const bgCtx = bgCanvas.getContext("2d");
//     if (!ctx || !bgCtx) return;

//     let mouseX = window.innerWidth / 2;
//     let mouseY = window.innerHeight / 2;

//     const handleResize = () => {
//       const { innerWidth, innerHeight } = window;
//       const dpr = window.devicePixelRatio || 1;

//       canvas.width = innerWidth * dpr;
//       canvas.height = innerHeight * dpr;
//       canvas.style.width = `${innerWidth}px`;
//       canvas.style.height = `${innerHeight}px`;
//       ctx.scale(dpr, dpr);

//       bgCanvas.width = innerWidth;
//       bgCanvas.height = innerHeight;

//       setDimensions({ width: innerWidth, height: innerHeight });
//       starsRef.current = Array.from(
//         { length: 250 },
//         () => new Star(innerWidth, innerHeight)
//       );
//       startTimeRef.current = Date.now();

//       // Set background based on theme
//       bgCtx.fillStyle = theme === "dark" ? "#0A0A0A" : "#F5F5F5";
//       bgCtx.fillRect(0, 0, innerWidth, innerHeight);
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//       mouseX = e.clientX;
//       mouseY = e.clientY;
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     window.addEventListener("mousemove", handleMouseMove);

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const sortedStars = [...starsRef.current].sort((a, b) => a.z - b.z);

//       sortedStars.forEach((star) => {
//         star.move(canvas.width, canvas.height, mouseX, mouseY);

//         if (
//           star.pastPositions.length > 1 &&
//           star.screenSize &&
//           star.screenSize > 1
//         ) {
//           ctx.beginPath();
//           ctx.moveTo(star.pastPositions[0].x, star.pastPositions[0].y);

//           for (let i = 1; i < star.pastPositions.length; i++) {
//             const pos = star.pastPositions[i];
//             const timeDiff = Date.now() - pos.time;
//             const alpha = Math.max(0, 1 - timeDiff / 2000);
//             const depth = pos.z / canvas.width;

//             ctx.lineTo(pos.x, pos.y);
//             ctx.strokeStyle = star.getColor(alpha * 0.2);
//             ctx.lineWidth =
//               star.screenSize *
//               (1 - i / star.pastPositions.length) *
//               (1 - depth);
//             ctx.stroke();
//             ctx.beginPath();
//             ctx.moveTo(pos.x, pos.y);
//           }
//         }

//         if (
//           star.screenSize &&
//           star.screenSize > 0 &&
//           star.screenX !== undefined &&
//           star.screenY !== undefined
//         ) {
//           const gradient = ctx.createRadialGradient(
//             star.screenX,
//             star.screenY,
//             0,
//             star.screenX,
//             star.screenY,
//             star.screenSize * 2
//           );
//           gradient.addColorStop(0, star.getColor(1));
//           gradient.addColorStop(1, star.getColor(0));

//           ctx.beginPath();
//           ctx.fillStyle = gradient;
//           ctx.arc(star.screenX, star.screenY, star.screenSize, 0, Math.PI * 2);
//           ctx.fill();
//         }
//       });

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("mousemove", handleMouseMove);
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [mounted, theme]); // Re-run effect when theme changes

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <>
//       <canvas
//         ref={bgCanvasRef}
//         className="fixed inset-0 transition-colors duration-700"
//         style={{
//           backgroundColor: theme === "dark" ? "#0A0A0A" : "#F5F5F5",
//         }}
//       />
//       <canvas
//         ref={canvasRef}
//         className="fixed inset-0"
//         style={{ backgroundColor: "transparent" }}
//       />
//     </>
//   );
// };

// export default DynamicStarField;
