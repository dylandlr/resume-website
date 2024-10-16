import { Index } from "@upstash/vector";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";

const index = new Index({
  url: process.env.UPSTASH_URL,
  token: process.env.UPSTASH_TOKEN,
});

// Define the embedding model
const model = openai.embedding("text-embedding-ada-002", {
  apiKey: process.env.OPENAI_API_KEY,
});

async function queryResume(userQuery) {
  try {
    // Generate an embedding for the user's query
    const result = await embed({
      model: model,
      value: userQuery,
    });

    const embedding = result.embedding; // Ensure we pass the embedding array

    //console.log("Query Embedding:", embedding);
    console.log("Querying Upstash with vector:", embedding);

    const results = await index.query({
      vector: embedding, // Use 'vector' for querying
      topK: 3, // Try fetching the top 3 results to increase the chances of finding something
      includeMetadata: true, // Include metadata in response
    });

    console.log("Query Results:", results);

    // Check if results are valid before processing
    if (results && results.documents && results.documents.length > 0) {
      // Return the matched documents' metadata content
      return results.documents.map((doc) => doc.metadata.content);
    } else {
      console.error("No documents returned from Upstash");
      return [];
    }
  } catch (error) {
    console.error("Error processing embedding request:", error.message);
    return [];
  }
}

export default queryResume;
