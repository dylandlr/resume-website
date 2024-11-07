// "use client";

// import React, { useRef, useEffect } from "react";

// const BackgroundAnimation = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     let animationFrameId;

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     const drawBackground = (ctx) => {
//       ctx.fillStyle = "#111827";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//     };

//     const drawParticle = (ctx, x, y, radius, color, opacity) => {
//       const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
//       gradient.addColorStop(
//         0,
//         `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
//       );
//       gradient.addColorStop(
//         1,
//         `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`
//       );
//       ctx.fillStyle = gradient;
//       ctx.beginPath();
//       ctx.arc(x, y, radius, 0, Math.PI * 2);
//       ctx.fill();
//     };

//     const drawTrail = (ctx, particles, color, width) => {
//       ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`;
//       ctx.lineWidth = width;
//       ctx.beginPath();
//       ctx.moveTo(particles[0].x, particles[0].y);

//       for (let i = 1; i < particles.length; i++) {
//         const particle = particles[i];
//         ctx.lineTo(particle.x, particle.y);
//       }

//       ctx.stroke();
//     };

//     const particles = Array.from({ length: 100 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//       radius: Math.random() * 3 + 2,
//       color: [
//         Math.floor(Math.random() * 60 + 180),
//         Math.floor(Math.random() * 30 + 50),
//         Math.floor(Math.random() * 40 + 50),
//       ],
//       opacity: 0,
//       opacitySpeed: Math.random() * 0.01 + 0.005,
//     }));

//     const trails = [];

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       drawBackground(ctx);

//       particles.forEach((particle) => {
//         particle.opacity += particle.opacitySpeed;

//         if (particle.opacity > 1) {
//           particle.opacity = 1;
//           particle.opacitySpeed *= -1;
//         } else if (particle.opacity < 0) {
//           particle.opacity = 0;
//           particle.opacitySpeed *= -1;
//         }

//         drawParticle(
//           ctx,
//           particle.x,
//           particle.y,
//           particle.radius,
//           particle.color,
//           particle.opacity
//         );
//       });

//       if (Math.random() < 0.05) {
//         const startParticle = particles.find(
//           (particle) => particle.opacity === 1
//         );

//         if (startParticle) {
//           const trail = [startParticle];

//           for (let i = 0; i < 2; i++) {
//             const lastParticle = trail[trail.length - 1];
//             const nextParticle = particles.find(
//               (particle) =>
//                 particle !== lastParticle &&
//                 particle.opacity === 1 &&
//                 Math.hypot(
//                   particle.x - lastParticle.x,
//                   particle.y - lastParticle.y
//                 ) < 150
//             );

//             if (nextParticle) {
//               trail.push(nextParticle);
//             } else {
//               break;
//             }
//           }

//           if (trail.length > 1) {
//             trails.push(trail);
//           }
//         }
//       }

//       trails.forEach((trail, index) => {
//         drawTrail(ctx, trail, trail[0].color, 2);

//         if (Math.random() < 0.1) {
//           trails.splice(index, 1);
//         }
//       });

//       animationFrameId = window.requestAnimationFrame(animate);
//     };

//     resize();
//     window.addEventListener("resize", resize);
//     animationFrameId = window.requestAnimationFrame(animate);

//     return () => {
//       window.removeEventListener("resize", resize);
//       window.cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         zIndex: -10,
//       }}>
//       <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
//     </div>
//   );
// };

// export default BackgroundAnimation;
