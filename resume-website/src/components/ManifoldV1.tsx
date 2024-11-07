"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const ManifoldShape = ({ complexity, speed }) => {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.y += 0.01 * speed;
  });

  // Calculate p and q based on complexity
  const p = Math.floor(2 + complexity * 3);
  const q = Math.floor(3 + complexity * 4);

  // Generate a color based on complexity
  const hue = (complexity * 360) % 360;
  const color = `hsl(${hue}, 100%, 50%)`;

  return (
    <Float speed={1.5 * speed} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[2, 0.5, 128, 32, p, q]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
};

const Scene = ({ complexity, speed }) => {
  return (
    <group>
      <ManifoldShape complexity={complexity} speed={speed} />
    </group>
  );
};

export default function Component() {
  const [complexity, setComplexity] = useState(0);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}>
        <color attach="background" args={["#000000"]} />

        {/* Bright lighting setup */}
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={20} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={20} color="#ffffff" />
        <spotLight
          position={[0, 0, 15]}
          angle={0.5}
          penumbra={1}
          intensity={20}
          color="#ffffff"
        />

        <Scene complexity={complexity} speed={speed} />
        <OrbitControls makeDefault />

        {/* Add fog for depth */}
        <fog attach="fog" args={["#000000", 8, 30]} />
      </Canvas>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-4 bg-white/10 backdrop-blur-lg p-4 rounded-lg max-w-md mx-auto">
        <div>
          <label htmlFor="shape-complexity" className="text-white mb-2 block">
            Shape Complexity: {complexity.toFixed(2)}
          </label>
          <Slider
            id="shape-complexity"
            value={[complexity]}
            onValueChange={(value) => setComplexity(value[0])}
            min={0}
            max={1}
            step={0.01}
            className="my-2"
          />
        </div>
        <div>
          <label htmlFor="animation-speed" className="text-white mb-2 block">
            Animation Speed: {speed.toFixed(1)}
          </label>
          <Slider
            id="animation-speed"
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={0.1}
            max={2}
            step={0.1}
            className="my-2"
          />
        </div>
        <Button
          onClick={() => {
            setComplexity(0);
            setSpeed(1);
          }}
          variant="outline"
          className="w-full">
          Reset
        </Button>
      </div>
    </div>
  );
}
