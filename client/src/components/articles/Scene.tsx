import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

interface SceneProps {}

const Scene: React.FC<SceneProps> = () => {
  const ref = useRef();
  return (
    <div className="w-1/5 h-1/2">
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
    </div>
  );
};

export default Scene;
