import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Flex, Box } from "@radix-ui/themes";
import { BookmarkIcon } from "@radix-ui/react-icons";
import React from "react";

type Files = { [key: string]: Files | string[] };

const test_toc: Files = {
  Kinematics: {
    "1D": {
      "Ch1.1.1": ["a", "b", "c"],
    },
    "2D": {
      "Ch1.2.1": ["a", "b", "c"],
    },
  },
  Dynamics: {
    "Newton's First Law": {
      "Ch2.1.1": ["a", "b", "c"],
    },
    "Newton's Second Law": {
      "Ch2.2.1": ["a", "b", "c"],
    },
  },
  Dynamics2: {
    "Newton's First Law": {
      "Ch2.1.1": ["a", "b", "c"],
    },
    "Newton's Second Law": {
      "Ch2.2.1": ["a", "b", "c"],
    },
  },
};

const FileList = (files: string[], prefix: string, shift: number) => {
  return (
    <Flex direction="column" justify="start" align="start">
      {files.map((title, index) => (
        <button
          key={`${prefix}${index}`}
          className={`w-full rounded-sm hover:bg-[#282828] hover:cursor-pointer pl-${shift} text-left`}
          onClick={() => {
            console.log("test");
          }}
        >
          <Flex align="center">
            <BookmarkIcon className="mx-1" />
            {`${prefix}${index + 1}. ${title}`}
          </Flex>
        </button>
      ))}
    </Flex>
  );
};

const RecursiveFileSystem = (files: Files, prefix: string, shift: number) => {
  return (
    <Accordion type="multiple">
      {Object.keys(files).map((title, index) => (
        <AccordionItem
          key={`${prefix}${index}`}
          value={`Chapter ${prefix}${index + 1}.`}
        >
          {/* for some reason the left padding below only triggers in some cases */}
          <AccordionTrigger className={`pl-${shift}`}>
            {`${prefix}${index + 1}. ${title}`}
          </AccordionTrigger>
          <AccordionContent>
            {!Array.isArray(files[title])
              ? RecursiveFileSystem(
                  files[title] as Files,
                  `${prefix}${index + 1}.`,
                  shift + 3,
                )
              : FileList(
                  files[title] as string[],
                  `${prefix}${index + 1}.`,
                  shift + 3,
                )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const ControlPanel: React.FC = () => {
  return (
    <ScrollArea className="border-b w-full h-full">
      <Box className="p-4">{RecursiveFileSystem(test_toc, "", 0)}</Box>
    </ScrollArea>
  );
};

export default ControlPanel;
