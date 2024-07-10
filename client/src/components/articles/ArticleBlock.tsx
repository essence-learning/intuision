import React from "react";
import { Box, Text } from "@mantine/core";
import "./ArticleBlock.css";

interface ArticleBlockProps {
  children: React.ReactNode;
  block_id: string;
}

const ArticleBlock: React.FC<ArticleBlockProps> = React.memo(
  ({ children, block_id }) => {
    return (
      <Box className="hoverable-box" id={block_id}>
        <Text>{children}</Text>
        <Text>{block_id}</Text>
      </Box>
    );
  },
);

const MemoizedArticleBlock = React.memo(ArticleBlock);

export default MemoizedArticleBlock;
