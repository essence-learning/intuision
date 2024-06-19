import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ArticleContent from "@/components/articles/ArticleContent";
import { Flex, Box, Heading, Button } from "@radix-ui/themes";
import { Tabs } from "@radix-ui/themes";
import ControlPanel from "@/components/articles/ControlPanel";
import NavBar from "@/components/NavBar";
import { useRef, useState } from "react";
import Scene from "@/components/articles/Scene";

const Article = () => {
  //  const [activeArticle, setActiveArticle] = useState(NULL);

  //All this stuff here is for dealing with split screening
  const [activeScene, setActiveScene] = useState(null);
  const [splitVert, setSplitVert] = useState(false);
  const [splitHorizontal, setSplitHorizontal] = useState(false);

  const handleExpand = () => {
    console.log(splitHorizontal);
    setSplitHorizontal(true);
    setSplitVert(true);
    //if (splitScreen) setActive
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
            {/* <Heading as="h1" size="9" m="4">
              [LOGO]
            </Heading> */}
            <ControlPanel />
            asdf
          </Flex>
        </ResizablePanel>
        <ResizableHandle withHandle={false} />
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel id="top-split" order={1}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel id="top-left-split" order={1}>
                  <Tabs.Root defaultValue="tab1">
                    <Tabs.List>
                      <Tabs.Trigger value="tab1">
                        <div>Tab 1</div>
                      </Tabs.Trigger>
                      <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                    </Tabs.List>
                    <Box width="100%" height="100%">
                      <Tabs.Content value="tab1">
                        <ArticleContent onExpand={handleExpand} />
                      </Tabs.Content>
                      <Tabs.Content value="tab2">
                        <ArticleContent onExpand={handleExpand} />
                      </Tabs.Content>
                    </Box>
                  </Tabs.Root>
                </ResizablePanel>
                {splitHorizontal && (
                  <>
                    <ResizableHandle withHandle={false} />
                    <ResizablePanel
                      id="top-right-split"
                      order={2}
                      defaultSize={50}
                    >
                      <ArticleContent />
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>
            {splitVert && (
              <>
                <ResizableHandle withHandle={false} />
                <ResizablePanel
                  id="bottom-split"
                  order={2}
                  defaultSize={30}
                  className="bg-[#181818]"
                >
                  <Scene
                    caption="asdf"
                    in_article={false}
                    onExpand={handleExpand}
                  />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Flex>
  );
};

export default Article;