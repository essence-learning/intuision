import React from "react";
import { Paper, Stack, useMantineTheme } from "@mantine/core";
import Comment from "./Comment";

interface CommentData {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

export interface CommentThreadProps {
  comments: CommentData[];
  top: number;
}

const CommentThread: React.FC<CommentThreadProps> = ({ comments, top }) => {
  const theme = useMantineTheme();

  return (
    <Paper
      shadow="0"
      p="sm"
      radius="md"
      style={{
        backgroundColor: theme.colors.gray[0],
        position: "absolute",
        top: `${top}px`,
        right: 0,
        width: "200px",
        zIndex: 100,
      }}
    >
      <Stack p="0" gap="xs">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            author={comment.author}
            content={comment.content}
            timestamp={comment.timestamp}
            avatar={comment.avatar}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default CommentThread;
