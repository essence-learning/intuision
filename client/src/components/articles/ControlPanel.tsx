import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Subsection {
  id: number;
  title: string;
}

interface Section {
  id: number;
  title: string;
  subsections: Subsection[];
}

interface Book {
  title: string;
  sections: Section[];
}

const ControlPanel: React.FC = () => {
  //maybe change this to native radix scroll because style's slightly different
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
    <ScrollArea className="border-b w-full h-full pr-3 p-2">
      <h1 className="text-xl font-bold mb-4">{book.title}</h1>
      <Accordion type="single" collapsible>
        {book.sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={`item-${section.id}`}
            className="px-4 border-0"
          >
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              {section.subsections.map((subsection) => (
                <div key={subsection.id}>{subsection.title}</div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
};

export default ControlPanel;
