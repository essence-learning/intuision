import React from 'react';

import { getMDXComponent } from 'mdx-bundler/client';
import { ScrollArea, Box, Flex, TypographyStylesProvider } from '@mantine/core';

import ArticleBlock from './ArticleBlock';

// import Scene from "./Scene";

interface ArticleContentProps {
  article_id: string;
  content?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article_id, content }) => {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    if (content) {
      try {
        const { code } = JSON.parse(content);
        const MDXComponent = getMDXComponent(code);
        
        const WrappedComponent = (props) => {
          const paragraphCountRef = React.useRef(0);

          const CustomP = ({ children }) => {
            const block_id = `${article_id}_${paragraphCountRef.current++}`;
            return <ArticleBlock block_id={block_id}>{children}</ArticleBlock>;
          };

          React.useEffect(() => {
            paragraphCountRef.current = 0;
          });

          return (
            <MDXComponent
              components={{
                p: CustomP,
                ul: CustomP,
                ...props.components
              }}
              {...props}
            />
          );
        };

        setComponent(() => WrappedComponent);
      } catch (error) {
        console.error('Error parsing MDX content:', error);
      }
    }
  }, [content]);

  return (
    <ScrollArea>
      <Flex justify="center" align="center" style={{ minHeight: '100%' }}>
        <Box w={'50vw'}>
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
