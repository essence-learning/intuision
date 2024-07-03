import React from "react";

import { Flex } from "@mantine/core";

import CommentThread, { CommentThreadProps } from "./CommentThread";

interface CommentSideBarProps {
  threads: threadData[];
}

interface threadData {
  id: string;
  data: CommentThreadProps;
}

const CommentSideBar: React.FC<CommentSideBarProps> = ({ threads }) => {
  return (
    <Flex direction="column">
      {threads.map((thread: threadData) => (
        <CommentThread
          key={thread.id}
          comments={thread.data.comments}
          top={thread.data.top}
        />
      ))}
    </Flex>
  );
};

export default CommentSideBar;
