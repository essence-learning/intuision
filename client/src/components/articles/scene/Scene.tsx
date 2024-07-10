import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Stack,
  Loader,
  AspectRatio,
  CloseButton,
  Group,
  Textarea,
  useMantineTheme,
  Button,
} from "@mantine/core";
import DynamicScene from "./DynamicScene";
import { ArrowUp } from "lucide-react";

interface SceneProps {
  in_article: boolean;
  blockId: string;
  selectedText: string;
  onClose: () => void;
}

const Scene: React.FC<SceneProps> = ({
  in_article,
  blockId,
  selectedText,
  onClose,
}) => {
  const [caption, setCaption] = useState("");
  const [sceneCode, setSceneCode] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [orbitControls, setOrbitControls] = useState(true);
  const theme = useMantineTheme();

  const textInput = useRef<HTMLTextAreaElement>(null);

  //focus on mount
  useEffect(() => {
    textInput.current?.focus();
  }, []);

  useEffect(() => {
    fetch(`/api/animation/retrieve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blockId: blockId,
        selectedText: selectedText,
        pageId: "asdf",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) {
          console.log(data.code);
          setCaption(data.caption);
          setSceneCode(data.code);
          setOrbitControls(data.orbit);
        } else {
          console.log("No animation found");
          //make post request to generate animation
          //add some sort of skeleton or loading animation in the component while the request is made
        }
      });
  }, [blockId]);

  const sendEdit = async () => {
    if (!inputMessage.trim()) return;

    setInputMessage("");
    setSceneCode("");

    try {
      const response = await fetch("/api/animation/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          editMessage: inputMessage,
          blockId: blockId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setSceneCode(data.animCode);
    } catch (error) {
      console.error("Error editing animation:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendEdit();
    }
  };

  return (
    <Flex direction="column" justify="start" align="end" h="100%">
      <CloseButton onClick={onClose} />
      <Stack gap="sm" p="5" justify="center" align="center" w="100%" h="100%">
        <AspectRatio w="100%" ratio={16 / 9}>
          {sceneCode ? (
            <DynamicScene code={sceneCode} orbitControls={orbitControls} />
          ) : (
            <Flex justify="center" align="center">
              <Loader />
            </Flex>
          )}
        </AspectRatio>
        <Box maw="60%">
          <p>{caption}</p>
        </Box>
      </Stack>
      <Group
        w="100%"
        gap="sm"
        p="xs"
        pl="sm"
        align="start"
        className="rounded-xl"
        bg={theme.colors.gray[0]}
      >
        <Textarea
          ref={textInput}
          placeholder="Ask for an edit..."
          value={inputMessage}
          variant="unstyled"
          autosize={true}
          minRows={1}
          maxRows={5}
          onKeyDown={handleKeyDown}
          onChange={(event) => setInputMessage(event.currentTarget.value)}
          className="b-none flex-1 wrap"
        />
        <Button onClick={sendEdit} className="rounded-xl" color="blue" p="xs">
          <ArrowUp size={20} />
        </Button>
      </Group>
    </Flex>
  );
};

export default Scene;
