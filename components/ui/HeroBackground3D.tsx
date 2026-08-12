"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Suppress internal library deprecation warnings from Three.js Clock and WebGLShadowMap
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = function (...args: any[]) {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      (args[0].indexOf("THREE.Clock") !== -1 || args[0].indexOf("THREE.WebGLShadowMap") !== -1)
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

// Custom shader for liquid wave rendering of the background image
const ImageWaveShader = {
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScroll;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      // Subtly wave the image vertices for 3D liquid texture effect
      float elevation = sin(uv.x * 4.0 + uTime * 0.4) * cos(uv.y * 4.0 + uTime * 0.4) * 0.05;
      
      modelPosition.z += elevation;
      
      // Mouse Parallax
      modelPosition.x += uMouse.x * 0.06;
      modelPosition.y += uMouse.y * 0.06;
      
      // Scroll Parallax
      modelPosition.y -= uScroll * 0.0008;

      vElevation = elevation;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vec4 color = texture2D(uTexture, vUv);
      
      // Apply depth shading to the wave ridges to accentuate 3D effect
      color.rgb += vElevation * 0.12;
      
      gl_FragColor = color;
    }
  `
};

interface ImagePlaneProps {
  reducedMotion: boolean;
}

const ImagePlane: React.FC<ImagePlaneProps> = ({ reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load texture using Drei's useTexture hook
  const texture = useTexture("/images/hero-bg.jpg");
  
  // Configure texture parameters
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  // Viewport cover scaling calculations (simulates background-size: cover inside WebGL canvas)
  const { width: viewportWidth, height: viewportHeight } = useThree().viewport;
  const imageAspect = 16 / 9; // Aspect of the uploaded image
  const viewportAspect = viewportWidth / viewportHeight;

  let scaleX = viewportWidth;
  let scaleY = viewportHeight;

  if (viewportAspect > imageAspect) {
    // Viewport is wider than image
    scaleY = viewportWidth / imageAspect;
  } else {
    // Viewport is narrower than image
    scaleX = viewportHeight * imageAspect;
  }

  // Uniform values reference to pass to shader
  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;

    // Update uniform values
    if (!reducedMotion) {
      uniforms.current.uTime.value = time;
      uniforms.current.uMouse.value.x = THREE.MathUtils.lerp(uniforms.current.uMouse.value.x, state.pointer.x, 0.05);
      uniforms.current.uMouse.value.y = THREE.MathUtils.lerp(uniforms.current.uMouse.value.y, state.pointer.y, 0.05);
    }
    
    uniforms.current.uScroll.value = THREE.MathUtils.lerp(uniforms.current.uScroll.value, scrollY, 0.05);
  });

  return (
    <mesh ref={meshRef} scale={[scaleX, scaleY, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={ImageWaveShader.vertexShader}
        fragmentShader={ImageWaveShader.fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export const HeroBackground3D: React.FC = () => {
  const [webGlSupported, setWebGlSupported] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // 1. WebGL Capabilities Check
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

    // 2. Prefers Reduced Motion Check
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // Static Fallback CSS Layout
  const staticFallback = (
    <div className="absolute inset-0 bg-[#060B1D] pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')"
        }}
      />
      <div className="absolute inset-0 bg-[#142DA6] mix-blend-color opacity-60" />
    </div>
  );

  if (webGlSupported === null) {
    return staticFallback;
  }

  if (webGlSupported === false) {
    return staticFallback;
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-[#060B1D] overflow-hidden pointer-events-none z-0">
      <Suspense fallback={staticFallback}>
        <Canvas
          camera={{ position: [0, 0, 1.5], fov: 60 }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <ImagePlane reducedMotion={reducedMotion} />
        </Canvas>
      </Suspense>

      {/* Brand color-shift wash: pulls the source image's teal cast toward the logo's navy blue */}
      <div className="absolute inset-0 bg-[#142DA6] mix-blend-color opacity-60 pointer-events-none z-[5]" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#04060F_95%)] pointer-events-none z-10" />
    </div>
  );
};

export default HeroBackground3D;
