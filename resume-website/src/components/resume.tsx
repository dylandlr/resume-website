"use client";
// resume html + tailwindcss
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export function Resume() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Dylan M. De La Rosa
          </h1>
          <p className="text-xl mt-2 text-blue-100">
            Computer Scientist / Engineer / Entrepreneur / Researcher
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center text-sm sm:text-base">
              <Mail className="h-5 w-5 mr-2 text-blue-200" />
              <a
                href="mailto:delarosadyl@gmail.com"
                className="hover:underline text-blue-100">
                delarosadyl@gmail.com
              </a>
            </div>
            <div className="flex items-center text-sm sm:text-base">
              <Phone className="h-5 w-5 mr-2 text-blue-200" />
              <a
                href="tel:+15123189924"
                className="hover:underline text-blue-100">
                (512) 318-9924
              </a>
            </div>
            <div className="flex items-center text-sm sm:text-base">
              <MapPin className="h-5 w-5 mr-2 text-blue-200" />
              <span className="text-blue-100">
                8106 Crabtree CV, Austin, TX 78750
              </span>
            </div>
            <div className="flex items-center text-sm sm:text-base">
              <Github className="h-5 w-5 mr-2 text-blue-200" />
              <a
                href="https://www.github.com/dylandlr"
                className="hover:underline text-blue-100">
                Github
              </a>
            </div>
            <div className="flex items-center text-sm sm:text-base">
              <Linkedin className="h-5 w-5 mr-2 text-blue-200" />
              <a
                href="https://www.linkedin.com/in/dylan-de-la-rosa-7617ab158/"
                className="hover:underline text-blue-100">
                LinkedIn
              </a>
            </div>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Education
            </h2>
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-700">
                Texas A&M University, Commerce/College Station, TX
              </h3>
              <p className="text-gray-600 italic">
                Bachelor&apos;s of Science, Computer Science (Expected
                Graduation: December 2024)
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                <li>
                  GPA: Major: 3.36 | Institution: 3.83 | Cumulative: 3.05 | Fall
                  &apos;23: 4.0 | Spring &apos;24: 3.66
                </li>
                <li>
                  President&apos;s List (Fall 2023) | Dean&apos;s List (Spring
                  2024)
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-700">
                Blinn College, Bryan TX
              </h3>
              <p className="text-gray-600 italic">
                Associates of Science, Engineering
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-700">
                L.C Anderson High School, Austin TX
              </h3>
              <p className="text-gray-600 italic">
                High School Diploma: International Baccalaureate Certificate,
                Electronics Endorsement
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                <li>Science Olympiad, Team Captain; Robotics Team, Member</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Experience
            </h2>
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-700">
                University of Missouri-Kansas City, NSF Research Experience for
                Undergraduates Program
              </h3>
              <p className="text-gray-600 italic">
                AI Empowered Cybersecurity Research Fellow
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                <li>
                  Conducted research on generative AI and LLMs for cybersecurity
                  challenges like code vulnerability detection in C code.
                </li>
                <li>
                  Modified the methodology of HaluRUST, a framework for
                  leveraging LLMs to detect vulnerabilities in Rust code.
                </li>
                <li>
                  Presented findings in a final presentation and a comprehensive
                  paper for NSF.
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-700">
                Texas A&M University Cybersecurity Center, SCADA Testbed Lab
              </h3>
              <p className="text-gray-600 italic">
                Operational Technology Engineering Student Technician
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                <li>
                  Executed various Industrial Internet of Things (IIoT) and
                  AI/ML projects within the SCADA Testbed Lab.
                </li>
                <li>
                  Supported projects utilizing AI, Computer Science, and
                  Cybersecurity, including an Intrusion Detection System and
                  Amazon Alexa cybersecurity lab assistant.
                </li>
              </ul>
            </div>
            {/* Add more experience items as needed */}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Projects
            </h2>
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-700">
                Capstone Project - TAMU CCSCI 359 Systems Analysis & Design
              </h3>
              <p className="text-gray-700 italic">
                Led a full stack multi-platform application that utilizes
                generative AI and ML to automate game controls for D&D,
                eliminating the need for a dedicated Dungeon Master with years
                of experience.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-700">
                MQTT Protocol Project - TAMU Cybersecurity Center/SCADA Testbed
              </h3>
              <p className="text-gray-700 italic">
                Developed a small-scale IIoT SCADA/OT system with Raspberry Pi
                4&apos;s and CLICK PLC.
              </p>
            </div>
            {/* Add more project items as needed */}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Skills
            </h2>
            <ul className="flex flex-wrap gap-2">
              {[
                "C++",
                "Python",
                "AI",
                "Machine Learning",
                "Software Development",
                "Cloud Computing",
                "GPT",
                "LLM",
                "Data Structures",
                "Algorithms",
                "JavaScript",
                "React.js",
                "Node.js",
                "Cybersecurity",
                "SCADA",
                "IoT",
              ].map((skill) => (
                <li
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
