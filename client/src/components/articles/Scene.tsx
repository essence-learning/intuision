import React, { useEffect, useRef, useState } from "react";
import { Flex, Box, Loader } from "@mantine/core";
import R3FRenderer from "./R3FRenderer";

interface SceneProps {
  in_article: boolean;
  blockId: string;
  // onExpand: () => void;
}

const Scene: React.FC<SceneProps> = ({ in_article, blockId }) => {
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
    <Flex w="100%" p="5" direction="column" justify="center" align="center">
      <Box w="33%" className="aspect-video" m="3">
        {sceneCode ? <R3FRenderer code={sceneCode} /> : <Loader />}
      </Box>
      <Box maw="20%">
        <p>{caption}</p>
      </Box>
    </Flex>
  );
};

export default Scene;
