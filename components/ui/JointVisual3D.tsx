"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { JointVisualFallback } from "./JointVisualFallback";

// Stylized procedural joint model
const StylizedJointModel: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Easing and oscillation state variables
  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // 1. Slow continuous rotation
    groupRef.current.rotation.y = time * 0.15;
    
    // 2. Subtle floating motion (sine oscillation)
    groupRef.current.position.y = Math.sin(time * 0.7) * 0.15;
    
    // 3. Mouse-follow effect
    // state.pointer ranges from -1 to 1 representing normalized mouse coordinates
    const targetX = state.pointer.x * 0.35;
    const targetY = -state.pointer.y * 0.35;
    
    // Lerp rotation for smooth response
    groupRef.current.rotation.z += (targetX - groupRef.current.rotation.z) * 0.05;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Upper Bone shaft (Femur) */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 1.8, 16]} />
        <meshPhysicalMaterial
          color="#E8F7F0"
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Upper Bone Joint Head */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshPhysicalMaterial
          color="#0F8A5F"
          roughness={0.2}
          metalness={0.3}
          clearcoat={0.5}
        />
      </mesh>

      {/* Joint articulation sphere (glowing gap core) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial
          color="#19A974"
        />
      </mesh>

      {/* Lower Bone Joint Head */}
      <mesh position={[0, -0.25, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshPhysicalMaterial
          color="#0F8A5F"
          roughness={0.2}
          metalness={0.3}
          clearcoat={0.5}
        />
      </mesh>

      {/* Lower Bone shaft (Tibia) */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[0.28, 0.20, 1.8, 16]} />
        <meshPhysicalMaterial
          color="#E8F7F0"
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Glowing Ligament Bands (Toruses wrapping around the articulation point) */}
      <mesh position={[0, 0, 0]} rotation={[0.4, 0.2, 0.5]}>
        <torusGeometry args={[0.46, 0.06, 8, 24]} />
        <meshStandardMaterial
          color="#19A974"
          emissive="#19A974"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>
      
      <mesh position={[0, 0, 0]} rotation={[-0.4, -0.2, -0.5]}>
        <torusGeometry args={[0.46, 0.06, 8, 24]} />
        <meshStandardMaterial
          color="#19A974"
          emissive="#0F8A5F"
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Precision Hud Orbits (Abstract rotating tracking rings) */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.015, 4, 32]} />
        <meshBasicMaterial
          color="#076B4A"
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.3, 0.01, 4, 32]} />
        <meshBasicMaterial
          color="#19A974"
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>
    </group>
  );
};

export const JointVisual3D: React.FC = () => {
  const [webGlSupported, setWebGlSupported] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // 1. WebGL support check
    try {
      const canvas = document.createElement("canvas");
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGlSupported(support);
    } catch (e) {
      setWebGlSupported(false);
    }

    // 2. Prefers reduced motion checking
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // WebGL loader stage
  if (webGlSupported === null) {
    return <JointVisualFallback />;
  }

  // Static Fallback rendering on WebGL failure
  if (webGlSupported === false) {
    return <JointVisualFallback />;
  }

  return (
    <div className="w-full aspect-square relative select-none rounded-2xl overflow-hidden bg-gradient-to-br from-primary-light/10 to-transparent dark:from-primary-light/5 dark:to-transparent border border-border-color/30">
      
      {/* Subtle Grid backdrop overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0F8A5F_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <Suspense fallback={<JointVisualFallback />}>
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 50 }}
          dpr={[1, 1.5]} // Restrict device pixel ratio for performance optimization
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          {/* Subtle directional and ambient medical lighting */}
          <ambientLight intensity={0.65} />
          
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-5, -5, -2]} intensity={0.5} color="#E8F7F0" />
          
          {/* Internal joint point glow */}
          <pointLight position={[0, 0, 0]} intensity={1.2} distance={2.5} color="#19A974" />
          
          {/* Stylized Joint Model */}
          <StylizedJointModel reducedMotion={reducedMotion} />

          {/* Floating glowing micro particles (representing precision medicine dots) */}
          <Sparkles
            count={35}
            scale={2.5}
            size={2}
            speed={reducedMotion ? 0 : 0.4}
            color="#19A974"
            opacity={0.6}
          />

          {/* User interactivity controls (no zoom or pan to lock alignment) */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </Suspense>

      {/* Interactive tip badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-bold text-text-secondary/70 tracking-wider uppercase pointer-events-none">
        <span>3D Joint Visualizer</span>
        <span>Drag to rotate</span>
      </div>
    </div>
  );
};

export default JointVisual3D;
