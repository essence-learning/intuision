import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, Flex, Box } from "@radix-ui/themes";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";

const ControlPanel = ({ switchTab }) => {
  //maybe change this to native radix scroll because style's slightly different
  const test_toc = {
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
          // <Button
          //   className="w-full rounded-sm hover:bg-[#282828] pl-1"
          //   variant="ghost"
          // >
          //   {`${prefix}${index + 1}. ${title}`}
          // </Button>
          <button
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

  //ULTRA SCUFFED LOL
  const RecursiveFileSystem = (
    files: Object,
    prefix: string,
    shift: number,
  ) => {
    console.log(shift);
    return (
      <Accordion type="multiple">
        {Object.keys(files).map((title, index) => (
          <AccordionItem value={`Chapter ${prefix}${index + 1}.`}>
            <AccordionTrigger
              //shifting it to give the file look
              className={`pl-${shift}`}
            >{`${prefix}${index + 1}. ${title}`}</AccordionTrigger>
            <AccordionContent>
              {!files[title][0]
                ? RecursiveFileSystem(
                    files[title],
                    `${prefix}${index + 1}.`,
                    shift + 3,
                  )
                : FileList(files[title], `${prefix}${index + 1}.`, shift + 3)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  return (
    <ScrollArea className="border-b w-full h-full">
      <Box className="p-4">{RecursiveFileSystem(test_toc, "", 0)}</Box>
      {/* <Accordion type="multiple" className="m-4">
        {test_toc.map((title, index) => (
          <AccordionItem value={`Chapter ${index + 1}`}>
            <AccordionTrigger>{`${index + 1}. ${title}`}</AccordionTrigger>
            <AccordionContent>testing</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion> */}
    </ScrollArea>
  );
};

export default ControlPanel;
