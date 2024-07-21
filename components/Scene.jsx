"use client";
import { useStateStore } from "@/stores/kits/store";
import { DragControls, Environment, OrbitControls, useProgress, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Ground from "@/components/kits/Ground";
import { Planter } from "@/components/kits/Planter";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className="font-bold text-6xl w-screen flex items-center justify-center text-brGreen">
      {progress.toFixed(0)}% loaded
    </Html>
  );
}

const Scene = () => (
  <div className="flex-grow w-4/5 -z-0">
    <Canvas camera={{ position: [100, 10, 0], zoom: 7 }}>
      <Suspense fallback={<Loader />}>
        {/* <Stats /> */}
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 3} />

        <Plants />
        <Ground />

        <Environment preset="forest" />
      </Suspense>
    </Canvas>
  </div>
);
const mod = (n, m) => ((n % m) + m) % m;
const Plants = () => {
  const { garden,  ROWS, COLS } = useStateStore();
  const Y_PAD = 4;//COLS/2;
  const X_PAD = 4;
  const MAX_PLANTS = COLS * ROWS;

  return (
    <>
      {garden.map((planter, index) => {
        if (index >= MAX_PLANTS) return null;
        const y = -mod(index, COLS)*Y_PAD + (COLS*3.5)/2 - 1;
        const x = Math.floor(index / COLS)*X_PAD - (ROWS*3.5)/2 + 1;
        return (
          <Planter key={index} position={[x, 0.6, y]} scale={planter.size * 0.4} color={planter.color} index={index} trolley={planter.trolley} />
        );
      })}
    </>
  );
};
export default Scene;
