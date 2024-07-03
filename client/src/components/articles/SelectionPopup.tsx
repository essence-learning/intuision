import { Paper, Button, Group, Tooltip } from "@mantine/core";
import { Highlighter, MessageSquareText } from "lucide-react";
import { BsStars } from "react-icons/bs";

interface SelectionPopupProps {
  x: number;
  y: number;
  onAI: () => void;
  onHighlight: () => void;
  onComment: () => void;
}

const SelectionPopup: React.FC<SelectionPopupProps> = ({
  x,
  y,
  onAI,
  onHighlight,
  onComment,
}) => {
  return (
    <Paper
      shadow="md"
      p="4px"
      radius="sm"
      withBorder={false}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${Math.max(y - 8, 0)}px`,
        transform: "translate(-50%, -100%)",
        zIndex: 1000,
      }}
    >
      <Group gap="0px" dir="horizontal">
        <Tooltip label="Ask AI to explain, animate, or re-word" position="top">
          <Button leftSection={<BsStars />} variant="subtle" onClick={onAI}>
            Ask AI
          </Button>
        </Tooltip>
        <Tooltip label="Highlight selected text" position="top">
          <Button variant="subtle" onClick={onHighlight}>
            <Highlighter size={16} />
          </Button>
        </Tooltip>
        <Tooltip label="Comment / Leave a note" position="top">
          <Button variant="subtle" onClick={onComment}>
            <MessageSquareText size={16} />
          </Button>
        </Tooltip>
      </Group>
    </Paper>
  );
};

export default SelectionPopup;
