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
  });

  return (
    <mesh
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      ref={myMesh}
    >
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
}

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <MyRotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </div>
  );
}
