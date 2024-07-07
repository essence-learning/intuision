import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Stack,
  Loader,
  AspectRatio,
  CloseButton,
} from "@mantine/core";
import R3FRenderer from "./DynamicScene";
import DynamicScene from "./DynamicScene";

interface SceneProps {
  in_article: boolean;
  blockId: string;
  onClose: () => void;
}

const Scene: React.FC<SceneProps> = ({ in_article, blockId, onClose }) => {
  const [caption, setCaption] = useState("");
  const [sceneCode, setSceneCode] = useState("");

  useEffect(() => {
    fetch(`/api/animation/retrieve?blockId=${blockId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) {
          console.log(data.code);
          setCaption(data.caption);
          setSceneCode(data.code);
        } else {
          console.log("No animation found");
          //make post request to generate animation
          //add some sort of skeleton or loading animation in the component while the request is made
        }
      });
  }, [blockId]);

  return (
    <Flex direction="column" justify="start" align="end" h="100%">
      <CloseButton onClick={onClose} />
      <Stack gap="sm" p="5" justify="center" align="center" w="100%" h="100%">
        <AspectRatio w="100%" ratio={16 / 9}>
          {sceneCode ? <DynamicScene code={sceneCode} /> : <Loader />}
        </AspectRatio>
        <Box maw="60%">
          <p>{caption}</p>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Scene;
