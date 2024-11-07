"use client";

import React from "react";
import { Github, Linkedin, Mail, FileText, ChevronDown } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { GitHubProjects } from "@/components/GitHubProjects";

const PortfolioContent: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative z-10">
      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">Dylan M. De La Rosa</h1>
          <p className="text-2xl mb-8">AI Researcher</p>
          <div className="flex gap-4 justify-center mb-8">
            <a
              href="https://github.com/dylandlr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile">
              <Github className="w-8 h-8 hover:text-blue-400 transition-colors" />
            </a>
            <a href="mailto:delarosady@gmail.com" aria-label="Email Contact">
              <Mail className="w-8 h-8 hover:text-blue-400 transition-colors" />
            </a>
            <a href="/resume" className="w-8 h-8" aria-label="Resume">
              <FileText className="w-8 h-8 hover:text-blue-400 transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/dylan-de-la-rosa-7617ab158/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer">
              <Linkedin className="w-8 h-8 hover:text-blue-400 transition-colors" />
            </a>
          </div>
          <ChevronDown
            size={40}
            className="mx-auto animate-bounce cursor-pointer"
            onClick={() => scrollToSection("projects")}
            aria-label="Scroll to Projects"
          />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            About Me
          </h2>
          <Card className="bg-slate-900 text-white border-slate-800">
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                <h3 className="text-xl font-semibold">
                  Computer Science, B.S.
                </h3>
                <p className="text-slate-400">Expected December 2024</p>
              </div>
              <ul className="list-disc list-inside">
                <p className="text-lg leading-relaxed">
                  AI & Cybersecurity Researcher with a focus on developing
                  innovative solutions in machine learning and cybersecurity.
                  Currently collaborating with The University of Missouri-Kansas
                  City on advanced research projects while completing my degree.
                </p>
                <p className="text-lg mt-4">
                  Seeking full-time opportunities to leverage my research
                  experience and technical expertise in developing cutting-edge
                  solutions. Committed to continuous learning and contributing
                  to innovative projects that push the boundaries of technology.
                </p>
              </ul>
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2 text-blue-400">
                  Core Competencies:
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {/* AI & Development Column */}
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-300 mb-3">
                      AI & Development
                    </h5>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Artificial Intelligence
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Machine Learning
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Software Engineering
                      </li>
                    </ul>
                  </div>

                  {/* Security & Infrastructure Column */}
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-300 mb-3">
                      Security & Systems
                    </h5>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Cybersecurity
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Network Security
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Computer Architecture
                      </li>
                    </ul>
                  </div>

                  {/* Data & Cloud Column */}
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-300 mb-3">
                      Data & Cloud
                    </h5>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Cloud Computing
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Data Engineering
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Analytics
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Github Projects
          </h2>
          <GitHubProjects />
        </div>
      </section>
    </main>
  );
};

export default PortfolioContent;
