import React from 'react';
import { Box, Text } from '@mantine/core';
import './ArticleBlock.css';

interface ArticleBlockProps {
  children: React.ReactNode;
  block_id: string;
}

const ArticleBlock: React.FC<ArticleBlockProps> = ({ children, block_id }) => {
  return (
    // <Button
    //   className="hoverable-button"
    //   variant="subtle"
    // >
    <Box className="hoverable-box">
      <Text>{children}</Text>
    </Box>
    // </Button>
  );
};

export default ArticleBlock;