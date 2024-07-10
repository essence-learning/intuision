import React from 'react';
import { Box, Text } from '@mantine/core';
import './ArticleBlock.css';

interface ArticleBlockProps {
  children: React.ReactNode;
  block_id: string;
}

const ArticleBlock: React.FC<ArticleBlockProps> = React.memo(({ children, block_id }) => {
  const selectionRef = useRef({ text: '', coords: { x: 0, y: 0 }, blockId: '' });
  return (
    <Box className="hoverable-box" id={block_id}>
      <Text>{children}</Text>
      <Text>{block_id}</Text>
    </Box>
  );
});

const MemoizedArticleBlock = React.memo(ArticleBlock);

export default MemoizedArticleBlock;