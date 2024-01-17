import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, Vector2, DoubleSide } from "three";
import './index.css';

import vertexShader from './shader/vertexShader';
import fragmentShader from './shader/fragmentShader.js';

const Fragment = () => {

  // This reference will give us direct access to the mesh
  const meshRef = useRef();
  
  // Update uTime
  useFrame((state) => {
    let time = state.clock.getElapsedTime();

    meshRef.current.material.uniforms.u_Time.value += time;
  })

  // Define the shader uniforms with memoization to optimize performance
  const uniforms = useMemo(
    () => ({
      u_Time: {
        type: "f",
        value: 1.0,
      },
      u_Resolution: {
        type: "v2",
        // value: new Vector2(window.innerWidth, window.innerHeight),
        value: new Vector2(window.innerWidth, window.innerHeight),
      }
      // ,
      // u_Texture: {
      //   type: "t",
      //   value: noiseTexture,
      // },
    }),
    []
  );
  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.0}>
      <planeGeometry 
      args={[1, 1, 32, 32]} 
      />
      <shaderMaterial
        uniforms={uniforms}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        side={DoubleSide}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0.0, 0.0, 1.0] }}>
      <Fragment />
      <OrbitControls />
    </Canvas>
  );
};


export default Scene;
