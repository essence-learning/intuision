import React from "react";
import {
  Paper,
  Text,
  Avatar,
  Group,
  Stack,
  useMantineTheme,
} from "@mantine/core";

interface CommentProps {
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
  top: number;
}

const Comment: React.FC<CommentProps> = ({
  author,
  content,
  timestamp,
  avatar,
}) => {
  const theme = useMantineTheme();
  return (
    <Stack gap="xs">
      <Group gap="xs">
        <Avatar src={avatar} alt={author} size="sm" radius="xl" />
        <div>
          <Text size="sm" weight={500}>
            {author}
          </Text>
          <Text size="xs" color="dimmed">
            {timestamp}
          </Text>
        </div>
      </Group>
      <Text size="sm">{content}</Text>
    </Stack>
  );
};

export default Comment;
