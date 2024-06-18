import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ControlPanel = () => {
  //maybe change this to native radix scroll because style's slightly different
  return (
    <ScrollArea className="border-b w-full h-full pr-3 p-2">
      <Accordion
        type="single"
        collapsible
        className="hover:bg-[#555555] rounded-sm"
      >
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-4 border-0">
          <AccordionTrigger>Section</AccordionTrigger>
          <AccordionContent>Subsection</AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollArea>
  );
};

export default ControlPanel;
