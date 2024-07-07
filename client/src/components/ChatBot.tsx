//Rewrite this entire file -- it's only for testing back end stuff.

import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  ScrollArea,
  Button,
  Group,
  Flex,
  Combobox,
  useMantineTheme,
  Textarea,
  CloseButton,
  Tooltip,
} from "@mantine/core";

import { useNavigate, useParams } from "react-router-dom";

import { ArrowUp, ChevronDown, Plus } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  propId?: string | null;
  priorText?: string;
  onClose: () => void;
}

//TODO: disgusting style -- fix it.

const ChatBot: React.FC<ChatBotProps> = ({ propId, priorText, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const { pageId } = useParams<{ pageId: string }>();
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [conversations, setConversations] = useState<string[]>([]);

  const theme = useMantineTheme();

  const textInput = useRef<HTMLTextAreaElement>(null);

  //focus on mount
  //TODO: maintain the text selection / highlighting when user is using chat box -- though idk if this is possible in web...
  useEffect(() => {
    textInput.current?.focus();
  }, []);

  const resetChat = () => {
    setMessages([]);
    setInputMessage("");
    setConversationId(null);
  };

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
          message: inputMessage,
          conversationId: conversationId,
          selectedText: priorText,
          pageId: pageId,
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
    resetChat();
  }, [priorText]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Flex
      direction="column"
      align-items="stretch"
      justify="center"
      flex="1"
      mah="100%"
      px="0"
    >
      {/* Actual Controls */}
      <Flex justify="space-between" align="center" wrap="nowrap">
        <Group gap="xs">
          <Tooltip label="Fresh context, fresh perspectives!">
            <Button
              variant="subtle"
              className="rounded-xl"
              leftSection={<Plus strokeWidth={1.75} />}
              onClick={resetChat}
            >
              Fresh Chat
            </Button>
          </Tooltip>
          {conversationId && (
            <Button
              variant="subtle"
              className="rounded-xl"
              rightSection={<ChevronDown />}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {conversationId}
            </Button>
          )}
        </Group>

        {/* <Title size={16}>LeSperm</Title> */}
        <CloseButton onClick={onClose} />
      </Flex>

      {/* List of possible chats */}

      {/* Actual Chat */}
      <ScrollArea
        style={{ flex: 1, marginBottom: theme.spacing.md }}
        px="sm"
        pt="md"
      >
        {messages.map((msg, index) => (
          <Paper
            key={index}
            p="sm"
            mb="xs"
            radius="lg"
            shadow={msg.role === "user" ? "0" : "xs"}
            style={{
              float: msg.role === "user" ? "right" : "left",
              clear: "both",
              width: msg.role === "user" ? "80%" : "100%",
              backgroundColor:
                msg.role === "user"
                  ? theme.colors.gray[3]
                  : theme.colors.gray[0],
              color: msg.role === "user" ? theme.black : theme.black,
            }}
          >
            {msg.content}
          </Paper>
        ))}
      </ScrollArea>
      <Group
        gap="sm"
        p="xs"
        pl="sm"
        align="start"
        className="rounded-xl"
        bg={theme.colors.gray[0]}
      >
        <Textarea
          ref={textInput}
          placeholder="Type your message..."
          value={inputMessage}
          variant="unstyled"
          autosize={true}
          minRows={1}
          maxRows={5}
          onKeyDown={handleKeyDown}
          onChange={(event) => setInputMessage(event.currentTarget.value)}
          className="b-none flex-1 wrap"
        />
        <Button
          onClick={sendMessage}
          className="rounded-xl"
          color="blue"
          p="xs"
        >
          <ArrowUp size={20} />
        </Button>
      </Group>
    </Flex>
  );
};

export default ChatBot;
