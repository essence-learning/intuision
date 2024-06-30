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

const getFontWeight = (shift: number) => {
  switch (shift) {
    case 0:
      return 'font-bold';
    case 1:
      return 'font-semibold';
    case 2:
      return 'font-medium';
    default:
      return 'font-normal';
  }
};

const getFontSize = (shift: number) => {
  switch (shift) {
    case 0:
      return 'text-lg';
    case 1:
      return 'text-base';
    case 2:
      return 'text-sm';
    default:
      return 'text-xs';
  }
};

interface ControlPanelProps {
  onPageSelect: (bookName: string, pageId: string) => void;
}

const RecursiveFileSystem = (
  current: BookLayer,
  prefix: string,
  shift: number,
  bookName: string,
  onPageSelect: (bookName: string, pageId: string) => void
) => {
  let localIndex = 1;
  return (
    <Accordion type="multiple" className="mb-2">
      <AccordionItem key={`${prefix}`} value={`Chapter ${prefix}`}>
        <AccordionTrigger className="text-left">
          <div
            className={`pl-${shift * 4} ${getFontWeight(shift)} ${getFontSize(shift)}`}
            style={{ paddingLeft: `${shift * 10}px` }}
          >
            {`${prefix} ${current.title}`}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {current.pages.map((page) => {
            const currentIndex = localIndex++;
            return (
              <button
                key={`${prefix}${currentIndex}`}
                className="w-full rounded-sm hover:bg-[#282828] hover:cursor-pointer text-left mb-1"
                style={{ paddingLeft: `${shift * 20}px` }}
                onClick={() => onPageSelect(bookName, page.id)}
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
                {RecursiveFileSystem(sub, `${prefix}${currentIndex}.`, shift + 1, bookName, onPageSelect)}
              </React.Fragment>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};


const ControlPanel: React.FC<ControlPanelProps> = ({ onPageSelect }) => {
  const { bookName } = useParams<{ bookName: string }>();
  const [book, setBook] = useState<BookLayer | null>(null);

  useEffect(() => {
    fetch(`/api/book/${bookName}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Some error: ", err));
  }, [bookName]);

  if (!book || !bookName) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="border-b w-full h-full">
      <Box className="p-4">
        {RecursiveFileSystem(book, "", 0, bookName, onPageSelect)}
      </Box>
    </ScrollArea>
  );
};

export default ControlPanel;
