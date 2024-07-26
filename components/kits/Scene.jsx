"use client";
import { useStateStore } from "@/stores/kits/store";
import { Environment, StatsGl, OrbitControls, useProgress, Html, Line } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useMemo } from "react";
import Ground from "@/components/kits/Ground";
import { Instances as BagInstances, Model } from "@/components/kits/BagStand";
import { StackyInstances, Stacky } from "@/components/kits/BasePlanter";
import { Feeder } from "./Feeder";

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
        <StatsGl />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 3} />

        <Plants />
        <Ground />
        <Nutrient />

        <Environment preset="forest" />
      </Suspense>
    </Canvas>
  </div>
);
const Nutrient = () => {
  const { nutrient, COLS, ROWS } = useStateStore();
  return <Feeder position={[1.3 , -1.6, -(COLS*1.2) + 20 ]} full={nutrient !== "organic"} scale={2}/>;
};
const Plants = () => {
  const { garden, ROWS, COLS, baseColor, stacksPerTower, setActive, riserPipe, midTowerRiser } = useStateStore();

  const PAD = 4;
  const MAX_PLANTS = COLS * ROWS;
  const gridLines = [];
  const xOffset = (PAD * ROWS) / 2;
  const yOffset = (PAD * COLS) / 2;

      gridLines.push([
        [ROWS*PAD/2- PAD/2, 0, 0],
        [ROWS*PAD/2 -PAD/2 , 0, -(COLS*1.2 + 12) ],
      ]);

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
        if (((row === 0 || row === 1) && col === 0) || (row === 2 && col === COLS - 1)) {
          gridLines.push([
            [0, 0, col * PAD + PAD / 2 - yOffset],
            [row * PAD - dx, 0, col * PAD + PAD / 2 - yOffset],
          ]);
        }
      }
    }
  }
  const stacksPerTowerArray = useMemo(() => new Array(stacksPerTower).fill(0), [stacksPerTower]);

  const calculatePosition = (index) => {
    const x = Math.floor(index / COLS) * PAD - xOffset + PAD / 2;
    const y = (-index % COLS) * PAD + yOffset - PAD / 2;
    return { x, y };
  };
  const riserPipeOffset = 3;
  return (
    <>
      <StackyInstances>
        <BagInstances>
          {garden.slice(0, MAX_PLANTS).map((planter, gardenIndex) => {
            const { x, y } = calculatePosition(gardenIndex);

            return (
              <group key={`planter-${gardenIndex}`} onClick={() => setActive(gardenIndex)}>
                {stacksPerTowerArray.map((_, stackIndex) => {
                  const height = 2 + Math.floor(stackIndex / (stacksPerTower / (midTowerRiser + 1))) * riserPipe;
                  return (
                    <Stacky
                      key={`stacky-${gardenIndex}-${stackIndex}`}
                      position={[x, stackIndex + height, y]}
                      scale={0.4}
                      rotation={[0, stackIndex % 2 === 0 ? Math.PI / 4 : 0, 0]}
                      color={planter.color}
                    />
                  );
                })}
                {/* pipe */}
                <mesh position={[x, (stacksPerTower + midTowerRiser * riserPipe + riserPipeOffset) / 2, y]}>
                  <cylinderGeometry args={[0.1, 0.1, stacksPerTower + midTowerRiser * riserPipe + riserPipeOffset]} />
                  <meshBasicMaterial color={"black"} />
                </mesh>
                {/* base */}
                {planter.trolley === "bag" ? (
                  <Model position={[x - 3.0, -0.1, y - 2.1]} scale={1.5} key={`base-${gardenIndex}`} />
                ) : (
                  <Stacky position={[x, 0.3, y]} scale={0.4} color={baseColor} key={`base-${gardenIndex}`} />
                )}
              </group>
            );
          })}
        </BagInstances>
      </StackyInstances>
      {gridLines.map((line, index) => (
        <Line
          key={`line-${index}`}
          points={line}
          color="black"
          lineWidth={6}
          position={[0, stacksPerTower + midTowerRiser * riserPipe + riserPipeOffset, 0]}
        />
      ))}
    </>
  );
};
export default Scene;
