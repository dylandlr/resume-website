"use client";
import { Viewport } from "next";
import PortfolioContent from "@/components/PortfolioContent";
import ManifoldBackground from "@/components/manifold-background";
import Chat from "@/components/Chat";
import { useEffect } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function PortfolioPage() {
  useEffect(() => {
    // Set default theme if it doesn't exist
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark"); // or whatever default theme you prefer
      document.documentElement.classList.add("dark"); // Add dark class to html element
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <ManifoldBackground />
      <PortfolioContent />
      <Chat />
    </div>
  );
}
