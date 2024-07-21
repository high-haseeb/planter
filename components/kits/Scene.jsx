"use client";
import { useStateStore } from "@/stores/kits/store";
import { Environment, OrbitControls, useProgress, Html, Line } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Ground from "@/components/kits/Ground";
import { Planter } from "@/components/kits/Planter";
import { Instances, Model } from "@/components/kits/BagStand";
import { StackyInstances, Stacky } from "@/components/kits/BasePlanter";

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
  const { garden, ROWS, COLS, base, stacksPerTower } = useStateStore();
  const PAD = 4; //COLS/2;
  const MAX_PLANTS = COLS * ROWS;

  // for (let col = 0; col < COLS; col++) {
  //   if (ROWS === 1) break;
  //   const y = col * PAD - (COLS * 3.5) / 2 + 2;
  //   gridLines.push([
  //     [-((PAD * ROWS) / 2) + 1.6, 0, y], // Start point
  //     [(PAD * ROWS) / 2 - 2.3, 0, y], // End point
  //   ]);
  // }
  //
  // // Generate horizontal grid lines
  // for (let row = 0; row < ROWS; row++) {
  //   const x = row * PAD - (ROWS * 3.5) / 2 + 1;
  //   gridLines.push([
  //     [x, 0, -((PAD * COLS) / 2) + 2],
  //     [x, 0, ((PAD * COLS) / 2) - 2],
  //   ]);
  // }

  const gridLines = [];
  const xOffset = (PAD * ROWS) / 2;
  const yOffset = (PAD * COLS) / 2;

  // index = row
  // const y = -mod(index, COLS) * PAD + (COLS * 3.5) / 2 - 1;
  // const x = Math.floor(index / COLS) * PAD - (ROWS * 3.5) / 2 + 1;
  let dx;
  if (garden.length !== 0) {
    for (let row = 0; row < ROWS; row++) {
      gridLines.push([
        [row * PAD - xOffset + PAD / 2, 0, -yOffset + PAD / 2],
        [row * PAD - xOffset + PAD / 2, 0, COLS * PAD - yOffset - PAD / 2],
      ]);
      for (let col = 0; col < COLS; col++) {
        if (ROWS === 1) break;
        ROWS === 2 ? (dx = PAD / 2) : (dx = PAD);
        gridLines.push([
          [-dx, 0, col * PAD + PAD / 2 - yOffset],
          [row * PAD - dx, 0, col * PAD + PAD / 2 - yOffset],
        ]);
      }
    }
  }

  return (
    <>
      {gridLines.map((line, index) => (
        <Line key={`line-${index}`} points={line} color="black" lineWidth={6} position={[0, stacksPerTower + 2, 0]} />
      ))}
      <Instances>
        <StackyInstances>
          {garden.map((planter, index) => {
            if (index >= MAX_PLANTS) return null;
            const x = Math.floor(index / COLS) * PAD - xOffset + PAD / 2;
            const y = -mod(index, COLS) * PAD + yOffset - PAD / 2; // padding/2 to center
            return (
              <group>
                <Planter
                  key={index}
                  position={[x, 2.0, y]}
                  scale={planter.size * 0.4}
                  color={planter.color}
                  index={index}
                  trolley={planter.trolley}
                />
                {/* pipe */}
                <mesh position={[x, stacksPerTower / 2, y]}>
                  <cylinderGeometry args={[0.1, 0.1, stacksPerTower + 4]} />
                  <meshStandardMaterial color={"black"} />
                </mesh>
                {base === "stacky" ? <Stacky position={[x, 0.3, y]} scale={0.4} /> : <Model position={[x - 3.0, -0.1, y - 2.1]} scale={1.5} />}
              </group>
            );
          })}
        </StackyInstances>
      </Instances>
    </>
  );
};
export default Scene;
