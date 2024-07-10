import React from 'react';
import { Box, Text } from '@mantine/core';
import './ArticleBlock.css';

interface ArticleBlockProps {
  children: React.ReactNode;
  block_id: string;
}

const ArticleBlock: React.FC<ArticleBlockProps> = ({ children, block_id }) => {
  console.log(`Rendering ArticleBlock with id: ${block_id}`);
  return (
    <Box className="hoverable-box">
      <Text>{children}</Text>
    </Box>
  );
};

const MemoizedArticleBlock = React.memo(ArticleBlock);

export default MemoizedArticleBlock;