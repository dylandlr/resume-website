import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { interest } = await req.json();

  const response = await generateText({
    model: openai("gpt-4-turbo"),
    prompt: `Based on the interest in ${interest}, suggest relevant projects from my portfolio.`,
  });

  return new Response(JSON.stringify({ text: response.text }), {
    headers: { "Content-Type": "application/json" },
  });
}
