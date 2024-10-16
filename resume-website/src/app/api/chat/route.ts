import {
  CoreSystemMessage,
  CoreUserMessage,
  streamText,
  UserContent,
  TextPart,
} from "ai";
import { openai } from "@ai-sdk/openai";
import queryResume from "@/app/api/chat/queryResume";

/**
 * Handles incoming chat requests from the client.
 *
 * @param req Request object passed from Next.js API route.
 * @returns Response object containing the GPT-4 generated text response.
 */
export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreUserMessage[] } = await req.json();

    // Extract user query
    const userQuery = extractTextContent(
      messages[messages.length - 1]?.content
    );

    if (!userQuery) {
      throw new Error("User query is empty or invalid");
    }

    console.log("User query received:", userQuery);

    // Query the resume vectors from Upstash
    const relevantSections = await queryResume(userQuery);

    // Build context from the resume or fallback if no context is found
    let context = "No relevant sections found in the resume.";
    if (relevantSections && relevantSections.length > 0) {
      context = `Relevant sections of Dylan's resume:\n\n${relevantSections.join(
        "\n\n"
      )}`;
    }

    console.log("Context for GPT-4:", context);

    // Use the relevant resume content and user query to query GPT-4
    const result = await streamText({
      model: openai("gpt-4"), // Use the correct model type
      system:
        "You are a helpful assistant. Provide guidance based on the context of the resume.",
      messages: [
        { role: "system", content: context } as CoreSystemMessage, // Add context
        ...messages.map(
          (message) =>
            ({
              role: "user",
              content: extractTextContent(message.content),
            } as CoreUserMessage)
        ), // Ensure correct message structure
      ],
    });

    return result.toDataStreamResponse();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error processing request: ${err.message}`);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Unknown error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/**
 * Extracts text content from UserContent, handling different content types.
 * @param content The UserContent to extract text from.
 * @returns A string representation of the text content.
 */
function extractTextContent(content: UserContent): string {
  if (typeof content === "string") {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .filter((part) => part.type === "text")
      .map((part) => (part as TextPart).text)
      .join(" ");
  }
  return "";
}
