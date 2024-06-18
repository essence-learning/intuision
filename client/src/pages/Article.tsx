import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ArticleContent from "@/components/articles/ArticleContent";
import { Flex, Tabs, Box, Heading } from "@radix-ui/themes";
import ControlPanel from "@/components/articles/ControlPanel";

const Article = () => {
  return (
    <Flex height="100vh" m="0" p="0" width="100%">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={20}>
          <Flex direction="column" align="start" justify="end" height="100%">
            <Heading as="h1" size="9" m="4">
              [LOGO]
            </Heading>
            <ControlPanel />
            asdf
          </Flex>
        </ResizablePanel>
        <ResizableHandle withHandle={false} />
        <ResizablePanel>
          <Box py="1">
            <Tabs.Root defaultValue="tab1">
              <Tabs.List>
                <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
            <Flex height="100%" width="100%" justify="center" px="8" py="5">
              <ArticleContent />
            </Flex>
          </Box>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Flex>
  );
};

export default Article;
