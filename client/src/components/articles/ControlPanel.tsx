import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Group, ScrollArea, NavLink } from "@mantine/core";
import classes from "./ControlPanel.module.css";

interface Page {
  id: string;
  title: string;
}

interface BookLayer {
  title: string;
  pages: Page[];
  subsections: BookLayer[];
}

interface ControlPanelProps {
  onPageSelect: (bookName: string, pageId: string) => void;
}

interface LinksGroupProps {
  data: BookLayer;
  shift: number;
  bookName: string;
  onPageSelect: (bookName: string, pageId: string) => void;
  isTopLevel?: boolean;
}

const LinksGroup: React.FC<LinksGroupProps> = ({
  data,
  shift = 0,
  bookName,
  onPageSelect,
  isTopLevel = false,
}) => {
  const [opened, setOpened] = useState(false);

  const pageLinks = data.pages.map((page) => {
    return (
      <NavLink
        key={`${page.title}`}
        label={`${page.title}`}
        className={isTopLevel ? classes.topLevelLink : classes.pageLink}
        onClick={() => onPageSelect(bookName, page.id)}
      />
    );
  });

  const subLinks = data.subsections.map((sub) => {
    return (
      <LinksGroup
        key={`${bookName}`}
        data={sub}
        shift={shift + 1}
        bookName={bookName}
        onPageSelect={onPageSelect}
      />
    );
  });

  if (isTopLevel) {
    return (
      <>
        {pageLinks}
        {subLinks}
      </>
    );
  }

  return (
    <NavLink
      label={`${data.title}`}
      opened={opened}
      onChange={(o) => setOpened(o)}
      fw="bold"
      className={classes.sectionLink}
    >
      {pageLinks}
      {subLinks}
    </NavLink>
  );
};

export function ControlPanel({ onPageSelect }: ControlPanelProps) {
  const { bookName } = useParams<{ bookName: string }>();
  const [book, setBook] = useState<BookLayer | null>(null);

  useEffect(() => {
    if (bookName) {
      fetch(`/api/book/${bookName}`)
        .then((response) => response.json())
        .then((data: BookLayer) => setBook(data))
        .catch((err) => console.error("Some error: ", err));
    }
  }, [bookName]);

  if (!book || !bookName) {
    return <div>Loading...</div>;
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <h1>{bookName}</h1>
        </Group>
      </div>
      <ScrollArea className={classes.links} p="sm">
        <div className={classes.linksInner}>
          <LinksGroup
            data={book}
            shift={0}
            bookName={bookName}
            onPageSelect={onPageSelect}
            isTopLevel={true}
          />
        </div>
      </ScrollArea>
    </nav>
  );
}

export default ControlPanel;
