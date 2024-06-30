//Rewrite this entire file -- it's only for testing back end stuff.

import React, { useState, useEffect } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Button } from "@radix-ui/themes";
import * as Label from "@radix-ui/react-label";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    try {
      const response = await fetch("/api/assistant/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationId: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
      if (!conversationId) {
        setConversationId(data.conversationId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error." },
      ]);
    }
  };

  useEffect(() => {
    // Scroll to bottom of message area when new messages are added
    const scrollArea = document.querySelector(".ScrollAreaViewport");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Physics ChatBot</h1>
      <ScrollArea.Root className="flex-grow mb-4 border rounded-md">
        <ScrollArea.Viewport className="h-full p-4 ScrollAreaViewport">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      <div className="flex">
        <Label.Root className="sr-only" htmlFor="chat-input">
          Enter your message
        </Label.Root>
        <input
          id="chat-input"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow border rounded-l-md p-2"
          placeholder="Type your message..."
        />
        <Button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-md"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBot;
