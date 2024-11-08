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
        className="fixed bottom-5 right-5 z-50 dark:shadow-white/5 dark:bg-slate-900 bg-white text-gray-900 dark:text-white p-4 rounded-full cursor-pointer shadow-lg flex items-center justify-center dark:border-slate-800 border-gray-200"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 180 : 0,
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
          <Card className="dark:bg-slate-900 bg-white dark:text-white text-gray-900 dark:border-slate-800 border-gray-200">
            <CardHeader className="p-4 dark:bg-slate-900 bg-white dark:text-white text-gray-900 flex justify-between rounded-t-lg dark:border-slate-800 border-gray-200">
              <span className="text-lg font-semibold">Resume Chat</span>
            </CardHeader>

            <CardContent className="h-60 overflow-y-auto p-4" ref={scrollRef}>
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="text-center dark:text-slate-400 text-gray-500 my-4">
                  Hi there 👋
                  <br />
                  Any questions about my resume?
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-2 flex items-start ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}>
                  {message.role === "user" ? (
                    <div className="flex items-start space-x-2">
                      <div className="inline-block p-2 rounded-lg dark:bg-slate-800 bg-gray-100 dark:text-white text-gray-900 max-w-xs break-words">
                        {message.content}
                      </div>
                      <div className="flex-shrink-0">
                        <FaUser className="dark:text-blue-400 text-blue-600 w-6 h-6" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        <FaRobot className="dark:text-blue-400 text-blue-600 w-6 h-6" />
                      </div>
                      <div className="inline-block p-2 rounded-lg dark:bg-slate-800/50 bg-gray-100/50 dark:text-white text-gray-900 max-w-xs break-words">
                        {message.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* AI typing indicator */}
              {isTyping && (
                <div className="dark:text-slate-400 text-gray-500 text-sm italic">
                  AI is typing...
                </div>
              )}
            </CardContent>

            <CardFooter className="p-4 dark:bg-slate-900 bg-white dark:border-slate-800 border-gray-200">
              <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-2 w-full">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Send a message..."
                  disabled={isLoading}
                  className="flex-grow dark:bg-slate-800 bg-gray-100 dark:border-slate-700 border-gray-300 dark:text-white text-gray-900 dark:placeholder:text-slate-400 placeholder:text-gray-500"
                />
                <Button
                  type="submit"
                  disabled={isLoading || input.trim() === ""}
                  className="dark:bg-slate-800 bg-gray-100 dark:hover:bg-slate-700 hover:bg-gray-200 dark:text-white text-gray-900">
                  <FiSend />
                </Button>
              </form>
            </CardFooter>

            <CardFooter className="p-2 dark:bg-slate-900 bg-white dark:border-slate-800 border-gray-200">
              <p className="text-center text-xs dark:text-slate-400 text-gray-500 w-full">
                Demonstration of Retrieval Augmented Generation (RAG) by Dylan
                M. De La Rosa.
                <p className="text-center text-xs dark:text-slate-400 text-gray-500">
                  Powered by GPT-4
                  <a
                    href="https://help.openai.com/en/articles/8868588-retrieval-augmented-generation-rag-and-semantic-search-for-gpts"
                    className="mx-2 dark:text-blue-400 text-blue-600 hover:underline text-xs"
                    target="_blank"
                    rel="noreferrer">
                    Read more
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
