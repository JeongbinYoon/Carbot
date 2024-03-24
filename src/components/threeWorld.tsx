'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
const Scene = () => {
  const gltf = useGLTF('assets/models/dunehunter/dunehunter.gltf');

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      {/* <mesh> */}
      {/* Width and height segments for displacementMap */}
      {/* <sphereBufferGeometry args={[1, 100, 100]} /> */}
      {/* </mesh> */}
      <primitive object={gltf.scene} scale={0.5} />
    </>
  );
};

export default function App() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Canvas>
        <Scene />
        <OrbitControls />
        {/* <Environment preset='sunset' background /> */}
      </Canvas>
    </div>
  );
}
