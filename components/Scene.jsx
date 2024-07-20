"use client";
import { useStateStore } from "@/stores/store";
import { DragControls, Environment, OrbitControls, useProgress, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Ground from "./Ground";
import { Planter } from "./Planter";

function Loader() {
  const { progress } = useProgress();
  return <Html center className="font-bold text-6xl w-screen flex items-center justify-center text-brGreen">{progress.toFixed(0)}% loaded</Html>;
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

const Plants = () => {
  const garden = useStateStore();
  let row = 1;
  return (
    <>
      {garden.garden.map((planter, index) => {
        if (index > garden.maxQuantity) return null;
        const planterIndex = index * 3;
        if (planterIndex >= garden.height * row) {
          row += 1;
        }
        console.log(garden.maxQuantity);
        const xOffset = -row * 4 + garden.width / 2;
        let yOffset = planterIndex - row * garden.height;
        yOffset += garden.height / 2;

        return (
          <>
            {index < garden.maxQuantity && (
              <DragControls axisLock={"y"}>
                <Planter
                  position={[xOffset, 0.6, yOffset]}
                  scale={planter.size * 0.4}
                  color={planter.color}
                  index={index}
                  trolley={planter.trolley}
                />
              </DragControls>
            )}
          </>
        );
      })}
    </>
  );
};

export default Scene;
