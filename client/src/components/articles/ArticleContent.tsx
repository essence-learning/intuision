import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Flex } from "@radix-ui/themes";
import { getMDXComponent } from 'mdx-bundler/client';
// import Scene from "./Scene";

interface ArticleContentProps {
  content?: string;
  onExpand: () => void;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, onExpand }) => {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    if (content) {
      try {
        const { code, _ } = JSON.parse(content);
        const Component = getMDXComponent(code);
        setComponent(() => Component);
      } catch (error) {
        console.error('Error parsing MDX content:', error);
      }
    }
  }, [content]);

  return (
    <ScrollArea className="w-full h-full bg-[#181818]">
      <Flex justify="center" p="8" py="6">
        <Flex direction="column" align="start" justify="start">
          {content ? (
            Component ? (
              <Component />
            ) : (
              <p>Processing content...</p>
            )
          ) : (
            <p>Select an article to view content.</p>
          )}
          <button onClick={onExpand} className="mt-4">Expand</button>
        </Flex>
      </Flex>
    </ScrollArea>
  );
};

export default ArticleContent;
