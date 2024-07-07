import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import ReactDOM from "react-dom/client";

interface R3FRendererProps {
  code: string;
}

const R3FRenderer: React.FC<R3FRendererProps> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!code || !containerRef.current) return;

    // Clear previous content
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // Create a new function from the code string
    const DynamicComponent = new Function(
      "React",
      "THREE",
      `return ${code}`,
    ) as (r: typeof React, t: typeof THREE) => React.ReactNode;

    // Render the dynamic component within the R3F Canvas
    const WrappedComponent = () => {
      const Component = DynamicComponent(React, THREE);
      return Component;
    };

    // Render the dynamic component within the R3F Canvas
    const root = ReactDOM.createRoot(containerRef.current);
    root.render(
      <Canvas>
        <WrappedComponent />
      </Canvas>,
    );

    // Cleanup
    return () => {
      root.unmount();
    };
  }, [code]);

  return <div ref={containerRef} />;
};

export default R3FRenderer;
