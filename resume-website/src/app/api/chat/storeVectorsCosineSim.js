import { Index } from "@upstash/vector";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";

export default async function handler(req, res) {
  const index = new Index({
    url: process.env.UPSTASH_URL,
    token: process.env.UPSTASH_TOKEN,
  });

  const model = openai.embedding("text-embedding-ada-002", {
    apiKey: process.env.OPENAI_API_KEY,
  });

  await index.create({
    name: "my_index",
    dimension: 1536,
    metric: "cosine",
  });

  const resumeSections = [
    {
      id: "contact-info",
      content:
        "Dylan M. De La Rosa, Email: delarosadyl@gmail.com, Phone: (512) 318-9924, Location: 8106 Crabtree CV, Austin, TX 78750, Github: github.com/dylandlr, LinkedIn: linkedin.com/in/dylan-de-la-rosa-7617ab158",
    },
    {
      id: "education",
      content:
        "Education: Texas A&M University, Commerce | College Station, TX. Bachelor's of Science in Computer Science, GPA: 3.8, Graduation: December 2024. President's List (Fall 2023), Dean's List (Spring 2024)",
    },
    {
      id: "experience1",
      content:
        "AI Empowered Cybersecurity Research Fellow at University of Missouri-Kansas City (May 2024 - Present). Researched generative AI and LLMs for cybersecurity vulnerabilities. Skills: Python, GPT, Cybersecurity, LLM, C, Prompt Engineering, Big Data, Data Science, Research, AI, Google Colab, GCP",
    },
    {
      id: "experience2",
      content:
        "Operational Technology Engineering Student Technician at Texas A&M University, SCADA Testbed Lab (Jan 2023 - Aug 2024). Skills: Python, SCADA Engineering, AWS, Google Colab, Machine Learning, IoT, IIoT, AI, GPT, LLM",
    },
    {
      id: "projects",
      content:
        "Capstone Project - TAMUC CSCI 359: AI-powered D&D automation platform. Skills: Python, JavaScript, LLM, Full-stack Development, Prompt Engineering, UI Design, Systems Development. Post-Quantum Algorithms Development Project: Skills: Post-Quantum Cryptography, Wireshark, Quantum Computing, Linux, Cybersecurity",
    },
    {
      id: "skills",
      content:
        "Skills: C++, Python, Machine Learning, AI, Cloud Computing, Cybersecurity, GPT, LLM, JavaScript, React.js, SCADA, Docker, Linux, SQL, Git",
    },
  ];

  const valuesToEmbed = resumeSections.map((section) => section.content);
  console.log("Content mapped:", valuesToEmbed);

  try {
    const embeddings = await embedMany({
      model: model,
      values: valuesToEmbed,
    });

    console.log("Generated Embeddings:", embeddings);

    for (let i = 0; i < resumeSections.length; i++) {
      console.log(
        `Storing section: ${resumeSections[i].id}, Embedding: ${embeddings[i]}`
      );
      await index.upsert({
        id: resumeSections[i].id,
        vector: embeddings[i], // Store embedding vector
        metadata: resumeSections[i], // Store metadata with each vector
      });
    }

    console.log("Resume sections stored in Upstash Vector DB");
    res.status(200).json({ message: "Resume sections stored successfully" });
  } catch (error) {
    console.error("Error processing embedding request:", error.message);
    res.status(500).json({ error: "Error processing embedding request" });
  }
}
