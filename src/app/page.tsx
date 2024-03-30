'use client';
import Speech from '@/components/speech';
import ThreeWorld from '@/components/threeWorld';
import Image from 'next/image';
import { Suspense, useState } from 'react';

export default function Home() {
  const [command, setCommand] = useState();
  const handleCommand = (command) => {
    setCommand(command);
    console.log('>>', command);
  };
  return (
    <div>
      <Speech onCommandChange={handleCommand} />
      <Suspense fallback={'wating...'}>
        <ThreeWorld command={command} />
      </Suspense>
    </div>
  );
}
