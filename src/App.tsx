import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { Mesh } from "three";

function MyRotatingBox() {
  const myMesh = useRef<THREE.Mesh>(new Mesh);
  const [active, setActive] = useState(false);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
    myMesh.current.rotation.y = a;
  });

  return (
    <mesh
      scale={active ? 3 : 1}
      onClick={() => setActive(!active)}
      ref={myMesh}
    >
      <boxGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
}

export default function App() {
  return (
      <Canvas>
        <MyRotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
  );
}
