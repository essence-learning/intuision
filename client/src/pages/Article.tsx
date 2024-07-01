import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ArticleContent from "@/components/articles/ArticleContent";
import { Flex, Box, Heading, Button } from "@radix-ui/themes";
// import { Tabs } from "@radix-ui/themes";
import ControlPanel from "@/components/articles/ControlPanel";
import NavBar from "@/components/NavBar";
import { useRef, useState } from "react";
import Scene from "@/components/articles/Scene";

const Article: React.FC = () => {
  const [mdxContent, setMdxContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // All this stuff here is for dealing with split screening
  const [activeScene, setActiveScene] = useState(null);
  const [splitVert, setSplitVert] = useState(false);
  const [splitHorizontal, setSplitHorizontal] = useState(false);

  const handleExpand = () => {
    console.log(splitHorizontal);
    setSplitHorizontal(true);
    setSplitVert(true);
    //if (splitScreen) setActive
  };

  const handlePageSelect = async (bookName: string, pageId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/article/${bookName}/${pageId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }
      const content = await response.json();
      setMdxContent(JSON.stringify(content));
    } catch (err) {
      setError('Failed to load article');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex height="100vh" m="0" p="0" width="100%" direction="column">
      <NavBar />
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full border-t"
      >
        <ResizablePanel defaultSize={20}>
          <Flex direction="column" align="start" justify="end" height="100%">
            <ControlPanel onPageSelect={handlePageSelect} />
          </Flex>
        </ResizablePanel>
        <ResizableHandle withHandle={false} />
        <ResizablePanel>
          <Box width="100%" height="100%">
            {isLoading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {mdxContent && (
              <ArticleContent content={mdxContent} onExpand={handleExpand} />
            )}
          </Box>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Flex>
  );
};

export default Article;