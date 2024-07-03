//Rewrite this entire file -- it's only for testing back end stuff.

import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  ScrollArea,
  TextInput,
  Button,
  Group,
  Flex,
  useMantineTheme,
} from "@mantine/core";

import { useNavigate, useParams } from "react-router-dom";

import { ArrowUp } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  propId?: string | null;
  priorText?: string;
}

//TODO: disgusting style -- fix it.

const ChatBot: React.FC<ChatBotProps> = ({ propId, priorText }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  // const { conversationId } = useParams<{ conversationId: string }>();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const theme = useMantineTheme();

  const textInput = useRef<HTMLInputElement>(null);

  //focus on mount
  //TODO: maintain the text selection / highlighting when user is using chat box -- though idk if this is possible in web...
  useEffect(() => {
    textInput.current?.focus();
  }, []);

  const getMessages = async () => {
    try {
      if (!conversationId) return;
      const response = await fetch(
        `/api/assistant/history?conversationId=${encodeURIComponent(conversationId)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error getting messages:", error);
    }
  };

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
        //TODO: add two additional fields: one for priorText (perhaps only send on the first query) and then one for type of query?
        //Though, the type of query could be processed on the back-end (heard of some functional recognition stuff that could be used for this)
        body: JSON.stringify({
          message: conversationId
            ? inputMessage
            : "The following set of questions refer to this text that the user highlighted: " +
              priorText +
              ". Now here is their query:" +
              inputMessage,
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

  //on load get chat history
  useEffect(() => {
    if (conversationId) getMessages();
  }, [conversationId]);

  //initial load
  useEffect(() => {
    if (propId) {
      setConversationId(propId);
    }
  }, []);

  return (
    <Flex
      direction="column"
      align-items="center"
      justify="space-between"
      h="100%"
      style={{ backgroundColor: theme.colors.gray[0] }}
    >
      <ScrollArea style={{ flex: 1, marginBottom: theme.spacing.md }}>
        {messages.map((msg, index) => (
          <Paper
            key={index}
            p="xs"
            mb="xs"
            radius="lg"
            style={{
              float: msg.role === "user" ? "right" : "left",
              clear: "both",
              maxWidth: "80%",
              backgroundColor:
                msg.role === "user"
                  ? theme.colors.blue[5]
                  : theme.colors.gray[2],
              color: msg.role === "user" ? theme.white : theme.black,
            }}
          >
            {msg.content}
          </Paper>
        ))}
      </ScrollArea>
      <Group gap={0}>
        <TextInput
          ref={textInput}
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(event) => setInputMessage(event.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <Button
          onClick={sendMessage}
          color="blue"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          <ArrowUp size={18} />
        </Button>
      </Group>
    </Flex>
  );
};

export default ChatBot;
