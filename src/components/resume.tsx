import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <header className="bg-gray-800 text-white p-6">
          <h1 className="text-3xl font-bold">Dylan M. De La Rosa</h1>
          <p className="text-xl mt-2">Computer Scientist / Engineer / Entrepreneur / Researcher</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <a href="mailto:delarosadyl@gmail.com" className="hover:underline">delarosadyl@gmail.com</a>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <a href="tel:+15123189924" className="hover:underline">(512) 318-9924</a>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>8106 Crabtree CV, Austin, TX 78750</span>
            </div>
            <div className="flex items-center">
              <Github className="h-5 w-5 mr-2" />
              <a href="https://www.github.com/dylandlr" className="hover:underline">Github</a>
            </div>
            <div className="flex items-center">
              <Linkedin className="h-5 w-5 mr-2" />
              <a href="https://www.linkedin.com/in/dylan-de-la-rosa-7617ab158/" className="hover:underline">LinkedIn</a>
            </div>
          </div>
        </header>

        <main className="p-6">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Education</h2>
            <div className="mb-4">
              <h3 className="text-xl font-medium">Texas A&M University, Commerce/College Station, TX</h3>
              <p className="text-gray-600">Bachelor's of Science, Computer Science (Expected Graduation: December 2024)</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>GPA: Major: 3.36 | Institution: 3.83 | Cumulative: 3.05 | Fall '23: 4.0 | Spring '24: 3.66</li>
                <li>President's List (Fall 2023) | Dean's List (Spring 2024)</li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-medium">Blinn College, Bryan TX</h3>
              <p className="text-gray-600">Associates of Science, Engineering</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">L.C Anderson High School, Austin TX</h3>
              <p className="text-gray-600">High School Diploma: International Baccalaureate Certificate, Electronics Endorsement</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>Science Olympiad, Team Captain; Robotics Team, Member</li>
              </ul>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Experience</h2>
            <div className="mb-4">
              <h3 className="text-xl font-medium">University of Missouri-Kansas City, NSF Research Experience for Undergraduates Program</h3>
              <p className="text-gray-600">AI Empowered Cybersecurity Research Fellow</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>Conducted research on generative AI and LLMs for cybersecurity challenges like code vulnerability detection in C code.</li>
                <li>Modified the methodology of HaluRUST, a framework for leveraging LLMs to detect vulnerabilities in Rust code.</li>
                <li>Presented findings in a final presentation and a comprehensive paper for NSF.</li>
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-medium">Texas A&M University Cybersecurity Center, SCADA Testbed Lab</h3>
              <p className="text-gray-600">Operational Technology Engineering Student Technician</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>Executed various Industrial Internet of Things (IIoT) and AI/ML projects within the SCADA Testbed Lab.</li>
                <li>Supported projects utilizing AI, Computer Science, and Cybersecurity, including an Intrusion Detection System and Amazon Alexa cybersecurity lab assistant.</li>
              </ul>
            </div>
            {/* Add more experience items as needed */}
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Projects</h2>
            <div className="mb-4">
              <h3 className="text-xl font-medium">Capstone Project - TAMU CCSCI 359 Systems Analysis & Design</h3>
              <p className="text-gray-700">Led a full stack multi-platform application that utilizes generative AI and ML to automate game controls for D&D, eliminating the need for a dedicated Dungeon Master with years of experience.</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-medium">MQTT Protocol Project - TAMU Cybersecurity Center/SCADA Testbed</h3>
              <p className="text-gray-700">Developed a small-scale IIoT SCADA/OT system with Raspberry Pi 4's and CLICK PLC.</p>
            </div>
            {/* Add more project items as needed */}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Skills</h2>
            <ul className="flex flex-wrap gap-2">
              {['C++', 'Python', 'AI', 'Machine Learning', 'Software Development', 'Cloud Computing', 'GPT', 'LLM', 'Data Structures', 'Algorithms', 'JavaScript', 'React.js', 'Node.js', 'Cybersecurity', 'SCADA', 'IoT'].map((skill) => (
                <li key={skill} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{skill}</li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}
