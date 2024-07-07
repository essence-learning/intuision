import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface DynamicSceneProps {
  code: string;
}

const DynamicScene: React.FC<DynamicSceneProps> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    // Initial size update
    updateSize();

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      size.width / size.height,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(size.width, size.height);
    containerRef.current.appendChild(renderer.domElement);

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Execute the dynamic scene code
    const setupScene = new Function("THREE", "scene", "camera", code);
    setupScene(THREE, scene, camera);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      updateSize();
      if (containerRef.current) {
        camera.aspect =
          containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight,
        );
      }
    };

    window.addEventListener("mousemove", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [code, size.width, size.height]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default DynamicScene;
