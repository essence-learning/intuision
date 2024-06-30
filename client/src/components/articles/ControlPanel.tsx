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

interface Page {
  id: string;
  title: string;
}

interface BookLayer {
  title: string;
  pages: Page[];
  subsections: BookLayer[];
}

const RecursiveFileSystem = (
  current: BookLayer,
  prefix: string,
  shift: number,
) => {
  let localIndex = 1;

  return (
    <Accordion type="multiple">
      <AccordionItem key={`${prefix}`} value={`Chapter ${prefix}`}>
        <AccordionTrigger>
          <div className={`pl-${shift}`}>
            {`${prefix} ${current.title}`}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {current.pages.map((page) => {
            const currentIndex = localIndex++;
            return (
              <button
                key={`${prefix}${currentIndex}`}
                className={`w-full rounded-sm hover:bg-[#282828] hover:cursor-pointer pl-${shift} text-left`}
                onClick={() => {
                  console.log("test");
                }}
              >
                <Flex align="center">
                  <BookmarkIcon className="mx-1" />
                  {`${prefix}${currentIndex} ${page.title}`}
                </Flex>
              </button>
            );
          })}
          {current.subsections.map((sub) => {
            const currentIndex = localIndex++;
            return (
              <React.Fragment key={`${prefix}${currentIndex}`}>
                {RecursiveFileSystem(sub, `${prefix}${currentIndex}.`, shift + 1)}
              </React.Fragment>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};


const ControlPanel: React.FC = () => {
  const { bookName } = useParams<{ bookName: string }>();
  const [book, setBook] = useState<BookLayer | null>(null);

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
      <Box className="p-4">{RecursiveFileSystem(book, "", 0)}</Box>
    </ScrollArea>
  );
};

export default ControlPanel;
