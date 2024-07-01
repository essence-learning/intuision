import React from 'react';

import { getMDXComponent } from 'mdx-bundler/client';
import { ScrollArea, Box, Flex, TypographyStylesProvider } from '@mantine/core';

// import Scene from "./Scene";

interface ArticleContentProps {
  content?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
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
    <ScrollArea>
      <Flex justify="center" align="center" style={{ minHeight: '100%' }}>
        <Box w={'50%'}>
          <TypographyStylesProvider>
            {content ? (
              Component ? (
                <Component />
              ) : (
                <p>Processing content...</p>
              )
            ) : (
              <p>Select an article to view content.</p>
            )}
          </TypographyStylesProvider>
        </Box>
      </Flex>
    </ScrollArea>
  );
};

export default ArticleContent;
