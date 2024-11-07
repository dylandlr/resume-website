"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSend } from "react-icons/fi";
import { FaUser, FaRobot } from "react-icons/fa"; // Correct icons for User and AI
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineMessage } from "react-icons/ai";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
// } from "@/components/ui/navigation-menu";

/**
 * Chat component.
 *
 * This component displays a chat bubble at the bottom right of the screen, and
 * when clicked, opens a chat window with a text input at the bottom. The chat
 * window displays the conversation history. The AI typing indicator is shown
 * while the AI is typing a response.
 */
export default function Chat() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false); // To track whether the chat window is open
  const [isTyping, setIsTyping] = useState(false); // Track AI typing status

  // Animation for chat bubble
  const toggleChat = () => setIsOpen((prev) => !prev);

  // Simulate AI typing before responding
  useEffect(() => {
    if (isLoading) {
      setIsTyping(true); // AI is typing while waiting for the response
    } else {
      setIsTyping(false); // Reset typing indicator when done
    }
  }, [isLoading]);

  // Auto-scroll when messages are updated
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Chat bubble with dynamic animation */}
      <motion.div
        className="fixed bottom-5 right-5 z-50 bg-blue-600 text-white p-4 rounded-full cursor-pointer shadow-lg flex items-center justify-center"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 180 : 0, // Rotate animation for chat-to-X icon
        }}
        transition={{ type: "spring", stiffness: 200 }}>
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMessage size={24} />}
      </motion.div>
      {/* Chat window */}
      {isOpen && (
        <motion.div
          className="fixed bottom-20 right-5 w-80 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}>
          <Card className="bg-white shadow-xl rounded-lg border-gray-200">
            <CardHeader className="p-4 bg-blue-600 text-white flex justify-between rounded-t-lg">
              <span className="text-lg font-semibold">Resume Chat</span>
            </CardHeader>

            <CardContent className="h-60 overflow-y-auto p-4" ref={scrollRef}>
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="text-center text-gray-500 my-4">
                  Hi there 👋
                  <br />
                  Any questions about my resume?
                </div>
              )}

              {/* Render each message */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-2 flex items-start ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}>
                  {/* User's message: icon on the right, message on the left */}
                  {message.role === "user" ? (
                    <div className="flex items-start space-x-2">
                      <div className="inline-block p-2 rounded-lg bg-blue-600 text-white max-w-xs break-words">
                        {message.content}
                      </div>
                      {/* Fix the icon size regardless of text length */}
                      <div className="flex-shrink-0">
                        <FaUser className="text-blue-600 w-6 h-6" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-2">
                      {/* Fix the icon size regardless of text length */}
                      <div className="flex-shrink-0">
                        <FaRobot className="text-gray-500 w-6 h-6" />
                      </div>
                      <div className="inline-block p-2 rounded-lg bg-gray-200 text-black max-w-xs break-words">
                        {message.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* AI is typing indicator */}
              {isTyping && (
                <div className="text-gray-400 text-sm italic">
                  AI is typing...
                </div>
              )}
            </CardContent>

            {/* <p className="text-center text-xs text-gray-800 mb-2">
              Built with Next.js by Dylan De La Rosa
              {" for demonstration of Retrieval Augmented Generation (RAG)."}
            </p> */}

            {/* Chat input */}
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
                <Button
                  type="submit"
                  disabled={isLoading || input.trim() === ""}>
                  <FiSend />
                </Button>
              </form>
            </CardFooter>

            {/* Bottom navbar with Shadcn Navigation Menu */}
            {/* <div className="bg-gray-100 rounded-b-lg">
              <NavigationMenu className="flex justify-around">
                <NavigationMenuItem asChild>
                  <Button variant="ghost" className="focus:bg-gray-200">
                    Chat
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem asChild>
                  <Button variant="ghost" className="focus:bg-gray-200">
                    Contact
                  </Button>
                </NavigationMenuItem>
              </NavigationMenu>
            </div> */}
            <CardFooter className="p-2 bg-gray-100">
              {/* Footer content */}
              <p className="text-center text-xs text-gray-800">
                {
                  "Demonstration of Retrieval Augmented Generation (RAG) by Dylan M. De La Rosa."
                }
                <p className="text-center text-xs text-gray-800">
                  Powered by GPT-4
                  <a
                    href="https://help.openai.com/en/articles/8868588-retrieval-augmented-generation-rag-and-semantic-search-for-gpts"
                    className="mx-2 text-blue-500 hover:underline text-xs"
                    target="_blank"
                    rel="noreferrer">
                    {"Read more"}
                  </a>
                </p>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </>
  );
}
