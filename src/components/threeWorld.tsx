'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  Html,
  PerspectiveCamera,
} from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { DoubleSide } from 'three';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function App({ command }) {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Canvas>
        {/* 장면 */}
        <Scene command={command} />

        {/* 카메라 컨트롤 */}
        <OrbitControls />

        {/* 환경 */}
        <Environment preset='sunset' background />
      </Canvas>
    </div>
  );
}

const Scene = ({ command }) => {
  return (
    <>
      {/* 라이트 */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 0, 1]} />
      {/* 자동차 모델 */}
      <Car command={command} />

      {/* 오브젝트 */}
      <GreenSquare />
      <BlueSphere />
      <RedBox />

      {/* 툴팁 */}
      <group>
        <ToolTip1 />
        <ToolTip2 />
        <ToolTip3 />
      </group>

      {/* <PerspectiveCamera position={[2, 2, 2]} makeDefault /> */}
    </>
  );
};

const Car = ({ command }) => {
  console.log('command>>>', command);
  const direction = {
    forward: 'z',
    left: 'x',
  };
  const gltf = useGLTF('assets/models/dunehunter/dunehunter.gltf');
  const car = useRef();
  const sphere = useRef();
  useFrame((state, delta) => {
    console.log('>>>>>>>>>>>>!', command);
    if (command) {
      const options = { duration: command[1] };
      options[direction[command[0]]] = state.clock.elapsedTime;
      gsap.to(car.current.position, options);
    }
  });
  return <primitive ref={car} object={gltf.scene} scale={0.5} />;
};

const BlueSphere = () => {
  const sphere = useRef();
  useEffect(() => {
    gsap.to(sphere.current.position, {
      duration: 1,
      y: 2,
    });
  }, [sphere]);
  useFrame((state, delta) => {
    gsap.to(sphere.current.position, {
      duration: 5,
      z: state.clock.elapsedTime,
    });
  });

  return (
    <mesh ref={sphere} position={[1.5, 0.5, 4]} scale={[0.5, 0.5, 0.5]}>
      <mesh>
        <sphereGeometry args={[1, 100, 100]} />
        <meshBasicMaterial color='blue' />
      </mesh>
    </mesh>
  );
};

const RedBox = () => {
  const box = useRef();
  useFrame((state, delta) => {
    gsap.to(box.current.rotation, {
      duration: 5,
      z: state.clock.elapsedTime,
      y: state.clock.elapsedTime,
    });
  });

  return (
    <mesh ref={box} position={[1.5, 0.5, 4]} scale={[0.5, 0.5, 0.5]}>
      <boxGeometry args={[4, 4, 4]} />
      <meshBasicMaterial color='red' />
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
