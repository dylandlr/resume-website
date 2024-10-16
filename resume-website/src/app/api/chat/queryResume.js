import { Index } from "@upstash/vector";
import { embed } from "ai"; // Import the embedding function from Vercel's AI SDK
import { openai } from "@ai-sdk/openai"; // Import openai
import { config } from "dotenv";

// Explicitly specify the path to the .env.local file
config({ path: "g:/VSCODE_PROJECTS/resume-website/resume-website/.env.local" });

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

/**
 * Queries the resume index in Upstash using the embedding of the given user query.
 * The user query is first embedded using an embedding model, and then a vector search is performed
 * in the Upstash vector database. Returns an array of resume content that matches the query.
 * @param {string} userQuery - The user query to be embedded and searched in the resume index.
 * @returns {Promise<string[]>} - An array of resume content that matches the query.
 */
async function queryResume(userQuery) {
  try {
    console.log("User query received:", userQuery);

    // Generate an embedding for the user query
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"), // Correct embedding model usage
      value: userQuery, // The actual query entered by the user
    });

    console.log("Generated Embedding for Query:", embedding);

    // Perform vector search in Upstash using the query embedding
    const results = await index.query({
      vector: embedding, // Pass the embedding (vector) for similarity search
      topK: 3, // Return the top 3 most relevant results
      includeMetadata: true, // Include the metadata (resume content)
    });

    console.log("Query Results:", results);

    // Check if results are valid
    if (results && results.length > 0) {
      // Return the matched documents' metadata content
      return results.map((doc) => doc.metadata.content);
    } else {
      console.error("No documents returned from Upstash");
      return [];
    }
  } catch (error) {
    console.error("Error querying resume from Upstash:", error.message);
    return [];
  }
}

export default queryResume;
