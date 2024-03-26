'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Html } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { DoubleSide } from 'three';

export default function App() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Canvas>
        {/* 장면 */}
        <Scene />

        {/* 카메라 컨트롤 */}
        <OrbitControls />

        {/* 환경 */}
        <Environment preset='sunset' background />
      </Canvas>
    </div>
  );
}

const Scene = () => {
  const gltf = useGLTF('assets/models/dunehunter/dunehunter.gltf');

  return (
    <>
      {/* 라이트 */}
      <ambientLight intensity={0.2} />
      <directionalLight />

      {/* 자동차 모델 */}
      <primitive object={gltf.scene} scale={0.5} />

      {/* 오브젝트 */}
      <GreenSquare />
      <BlueSphere />

      {/* 툴팁 */}
      <group>
        <ToolTip1 />
        <ToolTip2 />
        <ToolTip3 />
      </group>
    </>
  );
};

const BlueSphere = () => {
  return (
    <mesh position={[1.5, 0.5, 4]} scale={[0.5, 0.5, 0.5]}>
      <mesh>
        <sphereGeometry args={[1, 100, 100]} />
        <meshBasicMaterial color='blue' />
      </mesh>
    </mesh>
  );
};

const GreenSquare = () => {
  return (
    <mesh
      position={[0, 0, 13]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[5, 30, 5]}
    >
      <planeGeometry />
      <meshBasicMaterial color='green' side={DoubleSide} />
    </mesh>
  );
};

const ToolTip1 = () => {
  return (
    <Html center position={[-1, 1, -1]}>
      <p>툴팁 1</p>
    </Html>
  );
};

const ToolTip2 = () => {
  return (
    <Html center position={[1, -1, -1]}>
      <p>툴팁 2</p>
    </Html>
  );
};

const ToolTip3 = () => {
  return (
    <Html center position={[-1, -1, 1]}>
      <p>툴팁 3</p>
    </Html>
  );
};
