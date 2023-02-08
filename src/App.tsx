import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { Mesh } from "three";
import { useSpring, animated, config } from '@react-spring/three'

function MyRotatingBox() {
  const myMesh = useRef<THREE.Mesh>(new Mesh);
  const [active, setActive] = useState(false);
  const [hovered, setHover] = useState(false)
  // const [cubePosition, setCubePosition] = useState<[x:number,y:number,z:number]>([0,0,0])

  // setCubePosition([Math.random()*3,Math.random()*3,Math.random()*3])

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
    myMesh.current.rotation.y = a;
  });

  const springs = useSpring({ 
    scale: hovered ? 3 : 1,
    postion: active ? [0,0,-3] : [0,0,0],
    rotation: hovered ? Math.PI*4 : Math.PI*0.5,
    // color: active ? 'hotpink' : 'orange',
    config: config.wobbly,  
   })


  return (
    <animated.mesh 
      scale={springs.scale} 
      position={springs.postion}
      rotation-z={springs.rotation}
      onClick={() => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      ref={myMesh}
    >
      <boxGeometry />
      <meshPhongMaterial color="royalblue" />
      {/* <meshPhongMaterial color={springs.color} /> */}
    </animated.mesh>
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
