"use client";

import React, { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const DynamicStarField = () => {
  const canvasRef = useRef(null);
  //const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);

  class Star {
    x: number;
    y: number;
    z: number;
    size: number;
    speed: number;
    brightness: number;
    baseColor: string;
    screenX?: number;
    screenY?: number;
    screenSize?: number;

    constructor(width: number, height: number) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.z = Math.random() * width;
      this.size = Math.random() * 2;
      this.speed = Math.random() * 0.5 + 0.1;
      this.brightness = Math.random();
      this.baseColor = `${Math.floor(Math.random() * 55) + 200}`;
    }

    move(width: number, height: number, mouseX: number, mouseY: number) {
      this.z = this.z - this.speed;

      if (this.z <= 0) {
        this.z = width;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      const depth = this.z / width;
      const mouseDiffX = mouseX - width / 2;
      const mouseDiffY = mouseY - height / 2;

      this.screenX =
        (this.x - width / 2) * (1 / depth) +
        width / 2 +
        mouseDiffX * depth * 0.1;
      this.screenY =
        (this.y - height / 2) * (1 / depth) +
        height / 2 +
        mouseDiffY * depth * 0.1;
      this.screenSize = Math.max(0, (1 - depth) * 3 * this.size);

      // Pulsing brightness effect
      this.brightness = 0.5 + Math.sin(Date.now() * 0.001 * this.speed) * 0.5;
    }

    getColor() {
      // Properly formatted RGBA string
      return `rgba(255, 255, ${this.baseColor}, ${this.brightness})`;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = (canvas as HTMLCanvasElement).getContext("2d");
    if (!ctx) return;
    let mouseX = 0;
    let mouseY = 0;

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      const canvasElement = canvas as HTMLCanvasElement;
      canvasElement.width = innerWidth;
      canvasElement.height = innerHeight;
      starsRef.current = Array.from(
        { length: 800 },
        () => new Star(innerWidth, innerHeight)
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.fillStyle = "rgba(4, 6, 21, 0.2)";
      ctx.fillRect(
        0,
        0,
        (canvas as HTMLCanvasElement).width,
        (canvas as HTMLCanvasElement).height
      );

      starsRef.current.forEach((star) => {
        star.move(
          (canvas as HTMLCanvasElement).width,
          (canvas as HTMLCanvasElement).height,
          mouseX,
          mouseY
        );
        const gradient = ctx.createRadialGradient(
          star.screenX ?? 0,
          star.screenY ?? 0,
          0,
          star.screenX ?? 0,
          star.screenY ?? 0,
          (star.screenSize ?? 0) * 2
        );

        // Fixed gradient color stops
        gradient.addColorStop(0, star.getColor());
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(
          star.screenX ?? 0,
          star.screenY ?? 0,
          star.screenSize ?? 0,
          0,
          Math.PI * 2
        );
        ctx.fill();

        if ((star.screenSize ?? 0) > 1) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${
            (star.brightness ?? 0) * 0.2
          })`;
          ctx.arc(
            star.screenX ?? 0,
            star.screenY ?? 0,
            (star.screenSize ?? 0) * 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      });

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0"
        style={{ backgroundColor: "#040615" }}
      />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#040615] opacity-50" />
    </>
  );
};

const Portfolio = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <DynamicStarField />

      <main className="relative z-10">
        <section
          id="home"
          className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-6">Dylan M. De La Rosa</h1>
            <p className="text-2xl mb-8">Full Stack Developer</p>
            <ChevronDown
              size={40}
              className="mx-auto animate-bounce cursor-pointer"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
