import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ArticleContent from "@/components/articles/ArticleContent";
import { Flex, Tabs, Box, Heading } from "@radix-ui/themes";
import ControlPanel from "@/components/articles/ControlPanel";
import NavBar from "@/components/NavBar";

const Article: React.FC = () => {
  return (
    <Flex height="100vh" m="0" p="0" width="100%" direction="column">
      <NavBar />
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full border-t"
      >
        <ResizablePanel defaultSize={20}>
          <Flex direction="column" align="start" justify="end" height="100%">
            {/* <Heading as="h1" size="9" m="4">
              [LOGO]
            </Heading> */}
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
                <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              </Tabs.List>
              <Box width="100%" height="100%">
                <Tabs.Content value="tab1">
                  <ArticleContent />
                </Tabs.Content>
                <Tabs.Content value="tab2">asdfghjkl</Tabs.Content>
              </Box>
            </Tabs.Root>
          </Box>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Flex>
  );
};

export default Article;
