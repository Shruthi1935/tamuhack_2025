"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");

      // Simulating a bot response (You can replace this logic with API calls)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Hey!" },
        ]);
      }, 1000);
    }
  };

  return (
    <section className="bg-[#15072e] min-h-screen flex justify-center items-center">
      <div className="flex flex-col space-y-12">
        <div className="text-purple-200 font-chillax font-medium text-6xl">
          Hey, I'm your companion!
        </div>
        <div className="bg-purple-200 shadow-lg rounded-3xl w-full max-w-3xl p-6 flex flex-col space-y-4">
          {/* Chat History */}
          <div className="flex-1 font-chillax overflow-y-auto space-y-4 p-4 bg-purple-200 rounded-xl">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.sender === "user" ? "bg-purple-300" : "bg-purple-300"
                  } text-[#15072e] font-medium px-4 py-2 rounded-full max-w-xs text-md`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="font-chillax flex items-center space-x-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-[#1d0842] rounded-full focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-purple-300 text-[#15072e] font-medium rounded-full hover:-translate-y-3 duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
