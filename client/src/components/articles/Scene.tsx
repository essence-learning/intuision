import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Flex, Box } from "@radix-ui/themes";

interface SceneProps {
  in_article: boolean;
  caption: string;
}

const Scene: React.FC<SceneProps> = ({ in_article, caption }) => {
  const ref = useRef<any>();

  return (
    <Flex width="100%" p="5" direction="column" justify="center" align="center">
      <Box width="33%" className="aspect-video" m="3">
        <Canvas>
          <color attach="background" args={["black"]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <mesh ref={ref}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
          <OrbitControls />
        </Canvas>
      </Box>
      <Box maxWidth="20%">
        <p>{caption}</p>
      </Box>
    </Flex>
  );
};

export default Scene;
