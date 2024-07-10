import React from "react";
import { Box, Text } from "@mantine/core";
import "./ArticleBlock.css";

interface ArticleBlockProps {
  children: React.ReactNode;
  block_id: string;
}

const ArticleBlock: React.FC<ArticleBlockProps> = React.memo(({ children, block_id }) => {
  return (
    <Box className="hoverable-box" id={block_id}>
      <Text
        size="md" // Adjust the size as needed (e.g., 'sm', 'md', 'lg')
        style={{
          lineHeight: '1.6', // Adjust line height for better readability
          marginBottom: '1.5rem', // Space between paragraphs
          textAlign: 'justify', // Justify text for textbook-like alignment
        }}
      >
        {children}
      </Text>
    </Box>
  );
});

const MemoizedArticleBlock = React.memo(ArticleBlock);

export default MemoizedArticleBlock;
