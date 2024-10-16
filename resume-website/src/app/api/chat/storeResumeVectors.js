import { Index } from "@upstash/vector";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai"; // Import openai
import { config } from "dotenv";

// Explicitly specify the path to the .env.local file
config({ path: "g:/VSCODE_PROJECTS/resume-website/resume-website/.env.local" });

// Log environment variables to verify they are loaded
console.log("UPSTASH_VECTOR_REST_URL:", process.env.UPSTASH_VECTOR_REST_URL);
console.log(
  "UPSTASH_VECTOR_REST_TOKEN:",
  process.env.UPSTASH_VECTOR_REST_TOKEN
);

// Initialize Upstash Vector index
const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

/**
 * Stores the resume sections in Upstash Vector DB using the Vercel AI SDK.
 * Generates embeddings for each resume section using the "text-embedding-ada-002" model.
 * Upserts the embeddings into the Upstash Vector DB with the correct 'vector' field.
 */
async function storeResumeVectors() {
  const resumeSections = [
    {
      id: "contact-info",
      content: `Dylan M. De La Rosa, Email: delarosadyl@gmail.com, Phone: (512) 318-9924, Location: 8106 Crabtree CV, Austin, TX 78750, Github: github.com/dylandlr, LinkedIn: linkedin.com/in/dylan-de-la-rosa-7617ab158`,
    },
    {
      id: "education",
      content: `Education: Texas A&M University, Commerce | College Station, TX. Bachelor's of Science in Computer Science, GPA: 3.8, Graduation: December 2024. President's List (Fall 2023), Dean's List (Spring 2024)`,
    },
    {
      id: "experience1",
      content: `AI Empowered Cybersecurity Research Fellow at University of Missouri-Kansas City (May 2024 - Present). Researched generative AI and LLMs for cybersecurity vulnerabilities. Skills: Python, GPT, Cybersecurity, LLM, C, Prompt Engineering, Big Data, Data Science, Research, AI, Google Colab, GCP`,
    },
    {
      id: "experience2",
      content: `Operational Technology Engineering Student Technician at Texas A&M University, SCADA Testbed Lab (Jan 2023 - Aug 2024). Skills: Python, SCADA Engineering, AWS, Google Colab, Machine Learning, IoT, IIoT, AI, GPT, LLM`,
    },
    {
      id: "projects",
      content: `Capstone Project - TAMUC CSCI 359: AI-powered D&D automation platform. Skills: Python, JavaScript, LLM, Full-stack Development, Prompt Engineering, UI Design, Systems Development. Post-Quantum Algorithms Development Project: Skills: Post-Quantum Cryptography, Wireshark, Quantum Computing, Linux, Cybersecurity`,
    },
    {
      id: "skills",
      content: `Skills: C++, Python, Machine Learning, AI, Cloud Computing, Cybersecurity, GPT, LLM, JavaScript, React.js, SCADA, Docker, Linux, SQL, Git`,
    },
  ];

  // Extract the content from each section for embedding
  const valuesToEmbed = resumeSections.map((section) => section.content);

  try {
    // Generate embeddings for the resume sections
    const { embeddings } = await embedMany({
      model: openai.embedding("text-embedding-ada-002"), // Correct embedding model usage
      values: valuesToEmbed, // Content to embed
    });

    // Ensure embeddings array matches the number of resume sections
    if (embeddings.length !== resumeSections.length) {
      throw new Error("Mismatch between embeddings and resume sections");
    }

    // Upsert the embeddings into Upstash using the correct 'vector' field
    for (let i = 0; i < resumeSections.length; i++) {
      await index.upsert({
        id: resumeSections[i].id,
        vector: embeddings[i], // Store the embeddings (vector)
        metadata: { content: resumeSections[i].content }, // Store metadata (resume content)
      });
    }

    console.log("Resume sections stored in Upstash Vector DB");
  } catch (error) {
    console.error("Error processing embedding request:", error.message);
  }
}

// Call the function to store resume vectors
storeResumeVectors();
