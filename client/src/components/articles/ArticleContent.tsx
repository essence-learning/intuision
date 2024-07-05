import React, { useRef, useEffect, useState } from "react";

import { getMDXComponent } from "mdx-bundler/client";
import {
  ScrollArea,
  Box,
  Stack,
  Title,
  Button,
  Flex,
  Group,
  TypographyStylesProvider,
} from "@mantine/core";
import SelectionPopup from "./SelectionPopup";
import CommentSideBar from "./comments/CommentSideBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ChatBot from "../ChatBot";
import { ChevronsLeft, GripVertical, Plus } from "lucide-react";

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

  //handling the chat bot responsive design
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatBotPrior, setChatBotPrior] = React.useState<string>("");
  const [chatPanelWidth, setChatPanelWidth] = React.useState<number>(40);
  const [screenSmall, setScreenSmall] = useState(false);

  //
  React.useEffect(() => {
    const handleResize = () => {
      //TODO: set this break point with some tailwind config constant to be added later?
      setScreenSmall(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <PanelGroup direction={!screenSmall ? `horizontal` : `vertical`}>
      <Panel defaultSize={60} minSize={50}>
        <ScrollArea>
          <Flex
            justify="center"
            align="center"
            style={{ height: "100%", position: "relative" }}
            ref={textBoxRef}
          >
            <Group gap="xs" justify="center" px="lg">
              <Box maw="50vw" pt="lg">
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
        </ScrollArea>
      </Panel>

      {!showChatBot && (
        <Button
          variant="subtle"
          className="rounded-xl fixed top-4 right-4"
          onClick={() => {
            setShowChatBot(true);
            setChatBotPrior("");
          }}
          leftSection={<ChevronsLeft />}
        >
          Open Chat
        </Button>
      )}

      {showChatBot && (
        <>
          <PanelResizeHandle className="relative flex w-px items-center justify-center">
            <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-white fixed top-[50vh]">
              <GripVertical className="h-5 w-5" />
            </div>
          </PanelResizeHandle>
          <Panel
            defaultSize={chatPanelWidth}
            minSize={20}
            maxSize={50}
            className={!screenSmall ? `border-l p-6` : `border-t p-6`}
            onResize={(size) => setChatPanelWidth(size)}
          >
            <Box
              style={
                !screenSmall
                  ? {
                      position: "fixed",
                      top: "24px",
                      height: "94vh",
                      //resizing chat window if it goes to small screen
                      width: ` calc((100vw - 350px) * ${chatPanelWidth / 100})`,
                    }
                  : {
                      position: "relative",
                      width: "100%",
                    }
              }
            >
              <Stack gap="md" mx="sm" my="0" h="94vh">
                <ChatBot
                  propId={null}
                  priorText={chatBotPrior}
                  onClose={() => {
                    setShowChatBot(false);
                    setChatBotPrior("");
                  }}
                />
              </Stack>
            </Box>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
};

export default ArticleContent;
