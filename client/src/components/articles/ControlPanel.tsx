import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

interface Book {
  title: string;
  sections: Section[];
}

// interface Section {
//   id: number;
//   title: string;
// }

interface Section {
  id: number;
  title: string;
  subsections: Section[] | Files[];
}

interface File {
  id: number;
  title: string;
}

// interface Files {
//   [key:]
// }

// const test_toc: toc = {
//   Kinematics: {
//     "1D": {
//       "Ch1.1.1": ["a", "b", "c"],
//     },
//     "2D": {
//       "Ch1.2.1": ["a", "b", "c"],
//     },
//   },
//   Dynamics: {
//     "Newton's First Law": {
//       "Ch2.1.1": ["a", "b", "c"],
//     },
//     "Newton's Second Law": {
//       "Ch2.2.1": ["a", "b", "c"],
//     },
//   },
//   Dynamics2: {
//     "Newton's First Law": {
//       "Ch2.1.1": ["a", "b", "c"],
//     },
//     "Newton's Second Law": {
//       "Ch2.2.1": ["a", "b", "c"],
//     },
//   },
// };

const FileList = (files: File[], prefix: string, shift: number) => {
  return (
    <Flex direction="column" justify="start" align="start">
      {files.map((sec, index) => (
        <button
          key={`${prefix}${index}`}
          className={`w-full rounded-sm hover:bg-[#282828] hover:cursor-pointer pl-${shift} text-left`}
          onClick={() => {
            console.log("test");
          }}
        >
          <Flex align="center">
            <BookmarkIcon className="mx-1" />
            {`${prefix}${index + 1} ${sec.title}`}
          </Flex>
        </button>
      ))}
    </Flex>
  );
};

const RecursiveFileSystem = (
  files: Section[],
  prefix: string,
  shift: number,
) => {
  return (
    <Accordion type="multiple">
      {files.map((sec, index) => (
        <AccordionItem
          key={`${prefix}${index}`}
          value={`Chapter ${prefix}${index + 1}`}
        >
          {/* for some reason the left padding below only triggers in some cases */}
          <AccordionTrigger>
            <div className={`pl-${shift}`}>
              {`${prefix}${index + 1}. ${sec.title}`}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {/* checks if it's last depth to recurse */}
            {files[index].subsections.length > 0 &&
            files[index].subsections[0].subsections
              ? RecursiveFileSystem(
                  files[index].subsections as Section[],
                  `${prefix}${index + 1}.`,
                  shift + 3,
                )
              : FileList(
                  files[index].subsections as File[],
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
  const { bookName } = useParams<{ bookName: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch(`/api/book/${bookName}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Some error: ", err));
  }, [bookName]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="border-b w-full h-full">
      <Box className="p-4">{RecursiveFileSystem(book.sections, "", 0)}</Box>
    </ScrollArea>
  );
};

export default ControlPanel;
