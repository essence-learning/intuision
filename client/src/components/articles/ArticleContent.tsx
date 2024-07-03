import React, { useRef } from "react";

import { getMDXComponent } from "mdx-bundler/client";
import {
  ScrollArea,
  Box,
  Stack,
  Title,
  Flex,
  Group,
  TypographyStylesProvider,
} from "@mantine/core";
import SelectionPopup from "./SelectionPopup";
import CommentSideBar from "./comments/CommentSideBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ChatBot from "../ChatBot";

// import Scene from "./Scene";

interface ArticleContentProps {
  content?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(
    null,
  );

  React.useEffect(() => {
    if (content) {
      try {
        const { code, _ } = JSON.parse(content);
        const Component = getMDXComponent(code);
        setComponent(() => Component);
      } catch (error) {
        console.error("Error parsing MDX content:", error);
      }
    }
  }, [content]);

  //Handling the comment side bar
  const [showComments, setShowComments] = React.useState(false);
  const [showChatBot, setShowChatBot] = React.useState(false);

  /**
   * TODO: un-hard code comment threads (just writing some mongo storage stuff
   * TOODO: figure out a spacing solution (probably can just do on front end -- 
  every coment thread has a minimum top value and just gets pusehd down if necessary)
   */
  const testThreads = [
    {
      id: "1",
      data: {
        comments: [
          {
            id: "1",
            author: "John Doe",
            content: "This is a comment",
            timestamp: "2021-09-01",
          },
          {
            id: "2",
            author: "John Doe",
            content: "This is a comment",
            timestamp: "2021-09-01",
          },
        ],
        top: 30,
      },
    },
    {
      id: "2",
      data: {
        comments: [
          {
            id: "3",
            author: "John Doe",
            content: "This is a comment",
            timestamp: "2021-09-01",
          },
          {
            id: "4",
            author: "John Doe",
            content: "This is a comment",
            timestamp: "2021-09-01",
          },
        ],
        top: 300,
      },
    },
  ];

  //Handling text selection pop-up
  const [selectedText, setSelectedText] = React.useState("");
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectionCoords, setSelectionCoords] = React.useState({ x: 0, y: 0 });
  const textBoxRef = useRef<HTMLDivElement>(null);
  const [chatBotPrior, setChatBotPrior] = React.useState<string>("");

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      setSelectedText(selection.toString());
      setShowPopup(true);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      let x = (rect.right + rect.left) / 2;
      let y = rect.top;
      // Calculate position relative to the viewport
      if (textBoxRef && textBoxRef.current) {
        const textBoxRect = textBoxRef.current.getBoundingClientRect();
        x -= textBoxRect.left;
        y -= textBoxRect.top;
        if (y < 0) {
          y = rect.bottom - textBoxRect.top;
        }
      }

      // Adjust for scroll position

      setSelectedText(selection.toString());
      setSelectionCoords({
        x: x,
        y: y,
      });
    } else {
      setSelectedText("");
    }
  };

  React.useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectedText &&
      !(event.target as HTMLElement).closest(".mantine-Paper-root")
    ) {
      setSelectedText("");
      setShowPopup(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedText]);

  return (
    <ScrollArea>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={80} minSize={60}>
          <Flex
            justify="center"
            align="center"
            style={{ height: "100%", position: "relative" }}
            ref={textBoxRef}
          >
            <Group gap="xs" justify="center">
              <Box w={"50vw"}>
                <TypographyStylesProvider>
                  {content ? (
                    Component ? (
                      <Component />
                    ) : (
                      <p>Processing content...</p>
                    )
                  ) : (
                    <p>Select an article to view content.</p>
                  )}
                </TypographyStylesProvider>
                {showPopup && (
                  <SelectionPopup
                    x={selectionCoords.x}
                    y={selectionCoords.y}
                    onAI={() => {
                      setShowPopup(false);
                      setShowChatBot(true);
                      setChatBotPrior(selectedText);
                      setShowComments(false);
                    }}
                    onHighlight={() => {}}
                    onComment={() => {
                      setShowPopup(false);
                      setShowComments(true);
                    }}
                  />
                )}
              </Box>
              {showComments && <CommentSideBar threads={testThreads} />}
            </Group>
          </Flex>
        </Panel>

        {showChatBot && (
          <>
            <PanelResizeHandle />
            <Panel
              defaultSize={30}
              minSize={30}
              maxSize={40}
              className="border-l"
            >
              <Flex justify="center">
                <Stack
                  gap="md"
                  h="90vh"
                  p="md"
                  className="fixed"
                  style={{ top: "10vh" }}
                >
                  <Title>AI Assistant</Title>
                  <ChatBot propId={null} priorText={chatBotPrior} />
                </Stack>
              </Flex>
            </Panel>
          </>
        )}
      </PanelGroup>
    </ScrollArea>
  );
};

export default ArticleContent;
