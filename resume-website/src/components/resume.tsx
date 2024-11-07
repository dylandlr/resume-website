"use client";
// resume react.js, html + tailwindcss
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

/**
 * The Resume component renders a resume in a Next.js page. It displays education, experience, projects, and skills.
 *
 * The component uses Tailwind CSS for styling. It uses a combination of utility-first and component classes to create a mobile-friendly, responsive layout.
 *
 * The component renders a header with contact information, a main section with education, experience, projects, and skills, and a footer with a link to the GitHub repository.
 *
 * @returns The Resume component.
 */
export function Resume() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 z-0">
      {" "}
      {/* Light background */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 sm:p-6">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Dylan M. De La Rosa
          </h1>
          <p className="text-lg sm:text-xl mt-1 text-blue-100">
            Computer Scientist / Engineer / Researcher
          </p>
          <div className="mt-2 flex flex-wrap gap-2 sm:gap-4">
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

        <main className="p-4 sm:p-6 space-y-6">
          {/* Section Titles: Color & Font Updates */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-blue-800 border-b-2 border-blue-300 pb-2">
              Education
            </h2>
            <div className="mb-2">
              <h3 className="text-xl font-medium text-gray-800">
                Texas A&M University, Commerce | College Station, TX
              </h3>
              <p className="text-gray-600 italic">
                Bachelor&apos;s of Science, Computer Science
              </p>
              <p className="text-gray-600">
                GPA: 3.8 | Graduation: December 2024
              </p>
              <p className="text-gray-700">
                President&apos;s List (Fall 2023) | Dean&apos;s List (Spring
                2024)
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4 text-blue-800 border-b-2 border-blue-300 pb-2">
              Experience
            </h2>

            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800">
                AI Empowered Cybersecurity Research Fellow
              </h3>
              <p className="text-gray-600 italic">
                University of Missouri-Kansas City, NSF Research Experience for
                Undergraduates (May 2024 - Present)
              </p>
              <p className="text-gray-700">
                Researched generative AI and LLMs for cybersecurity
                vulnerabilities, collaborated with graduate students on academic
                publications, and presented findings in a comprehensive report
                and final presentation for the National Science Foundation.
                Modified HaluRUST for detecting Rust code vulnerabilities.
              </p>
              <div className="mt-2">
                <h4 className="text-blue-800 font-semibold">
                  Skills and Technologies:
                </h4>
                <p className="text-gray-600">
                  Python, GPT, Cybersecurity, LLM, C, Prompt Engineering, Big
                  Data, Data Science, Research, AI, Google Colab, GCP
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800">
                Operational Technology Engineering Student Technician
              </h3>
              <p className="text-gray-600 italic">
                Texas A&M University, SCADA Testbed Lab (Jan 2023 - Aug 2024)
              </p>
              <p className="text-gray-700">
                Executed IIoT and AI/ML projects within the SCADA Testbed for
                R&D and cybersecurity. Developed an Intrusion Detection System
                and an Amazon Alexa Cybersecurity assistant, integrating AI/ML
                into real-time operational environments.
              </p>
              <div className="mt-2">
                <h4 className="text-blue-800 font-semibold">
                  Skills and Technologies:
                </h4>
                <p className="text-gray-600">
                  Python, SCADA Engineering, AWS, Google Colab, Machine
                  Learning, IoT, IIoT, AI, GPT, LLM, Intrusion Detection
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800">
                Undergraduate Researcher
              </h3>
              <p className="text-gray-600 italic">
                Texas A&M University, PHATE Research Group (May 2020 - Mar 2021)
              </p>
              <p className="text-gray-700">
                Automated 3ω system using LabVIEW to study thermal properties of
                materials, converting physical systems into digital logic for
                phase transformation research.
              </p>
              <div className="mt-2">
                <h4 className="text-blue-800 font-semibold">
                  Skills and Technologies:
                </h4>
                <p className="text-gray-600">
                  LabVIEW, Digital Systems, Thermal Physics, Research and
                  Design, Material Science, Operational Technology
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4 text-blue-800 border-b-2 border-blue-300 pb-2">
              Projects
            </h2>
            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800">
                Capstone Project - TAMUC CSCI 359
              </h3>
              <p className="text-gray-700 italic">
                AI-powered D&D automation platform
              </p>
              <p className="text-gray-700">
                Led development of full-stack platform that automated game
                master tasks using machine learning and AI, effectively reducing
                manual efforts required for Dungeons & Dragons gameplay.
              </p>
              <div className="mt-2">
                <h4 className="text-blue-800 font-semibold">
                  Skills and Technologies:
                </h4>
                <p className="text-gray-600">
                  Python, JavaScript, LLM, Full-stack Development, Prompt
                  Engineering, UI Design, Systems Development
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800">
                MQTT Protocol Project - TAMU SCADA Testbed
              </h3>
              <p className="text-gray-700 italic">
                IIoT SCADA/OT system with Raspberry Pi
              </p>
              <p className="text-gray-700">
                Created an IIoT SCADA system using Raspberry Pi and PLC to
                monitor and control operational technology networks for
                real-world applications.
              </p>
              <div className="mt-2">
                <h4 className="text-blue-800 font-semibold">
                  Skills and Technologies:
                </h4>
                <p className="text-gray-600">
                  Raspberry Pi, PLC, MQTT, Python, IoT, IIoT, SCADA, Networking,
                  Operational Technology
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-medium text-gray-800">
                Post-Quantum Algorithms Development Project
              </h3>
              <p className="text-gray-700 italic">
                NIST Post-quantum Encryption Demonstration
              </p>
              <p className="text-gray-700">
                Researched post-quantum encryption algorithms and demonstrated
                their application through NIST-approved quantum TLS traffic
                using Wireshark and the Open Quantum Safe Project.
              </p>
              <div className="mt-2">
                <h4 className="text-blue-800 font-semibold">
                  Skills and Technologies:
                </h4>
                <p className="text-gray-600">
                  Post-Quantum Cryptography, Wireshark, Quantum Computing,
                  Linux, Cybersecurity, Docker, Research, Git, NIST
                </p>
              </div>
            </div>
          </section>

          {/* Skills section: Adding color to background */}
          <section className="bg-blue-50 p-3 sm:p-4 rounded-md shadow-inner">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-blue-800 border-b-2 border-blue-300 pb-2">
              Skills
            </h2>
            <ul className="flex flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium">
              {[
                "C++, C",
                "Python",
                "Machine Learning",
                "AI",
                "Cloud Computing",
                "Cybersecurity",
                "GPT",
                "LLM",
                "Data Structures and Algorithms",
                "JavaScript",
                "React.js, Next.js",
                "Typescript",
                "SCADA",
                "IoT, IIoT",
                "Docker",
                "Linux",
                "SQL",
                "Git",
                "Matlab",
                "AWS",
                "Object-Oriented Programming",
                "Databases",
                "Operating Systems",
                "RAG",
                "Full-stack Development",
                "API Development",
                "Prompt Engineering",
                "UI",
                "Systems Development",
              ].map((skill) => (
                <li
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
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
