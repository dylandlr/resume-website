// Chat.tsx

"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Draggable from "react-draggable";
import { Input } from "@/components/ui/input";
import { FiSend } from "react-icons/fi";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

/**
 * A draggable chat window that displays a conversation with an AI model.
 *
 * It uses the `useChat` hook to manage the conversation and displays the
 * conversation history in a scrollable card.
 *
 * The user can type a message in the input field and submit it to the AI
 * model using the send button.
 *
 * The chat window is draggable and can be moved around the screen.
 */
export default function Chat() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Draggable>
      <div className="fixed bottom-10 right-10 w-80 z-50">
        <Card className="bg-white bg-opacity-100 shadow-xl rounded-lg border-gray-200">
          <CardHeader className="p-4 bg-blue-600 text-white flex justify-between rounded-lg">
            <span className="text-lg font-semibold">Chat Assistant</span>
          </CardHeader>

          <CardContent className="h-60 overflow-y-auto p-4" ref={scrollRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}>
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </CardContent>

          <CardFooter className="p-4 bg-gray-100">
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Send a message..."
                disabled={isLoading}
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading || input.trim() === ""}>
                <FiSend />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </Draggable>
  );
}
